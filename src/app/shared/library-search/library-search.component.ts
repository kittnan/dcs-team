import { SelectionModel } from '@angular/cdk/collections';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpMastersService } from 'src/app/http/http-masters.service';
import { HttpReportSpecialService } from 'src/app/http/http-report-special.service';
import { HttpReportService } from 'src/app/http/http-report.service';
import { HttpServiceTypeService } from 'src/app/http/http-serviceType.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-library-search',
  templateUrl: './library-search.component.html',
  styleUrls: ['./library-search.component.scss']
})
export class LibrarySearchComponent implements OnInit {


  displayedColumns: string[] = ['select', 'reportNo', 'province', 'customer', 'machine', 'sn', 'status'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource()
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  userLogin: any

  dataFilter: any = {}

  selected: any = null
  typeOption: string[] = ['engineer', 'special']
  reportOption: string[] = ['report', 'pm']
  serviceTypeOption: any = []

  customerOption: any = []
  customerCtrl: FormControl = new FormControl('')
  customerOptionStr: any = []
  machineOption: any = []

  constructor(
    private router: Router,
    private $report: HttpReportService,
    private $reportSpecial: HttpReportSpecialService,
    private $local: LocalStorageService,
    private $serviceType: HttpServiceTypeService,
    private $master: HttpMastersService
  ) {
    let user: any = this.$local.getProfile()
    this.userLogin = user
  }

  async ngOnInit(): Promise<void> {
    try {
      let serviceType = await lastValueFrom(this.$serviceType.getAll())
      this.serviceTypeOption = serviceType

      const machine = await lastValueFrom(this.$master.Master_getall())
      this.customerOption = machine
      const customers = this.customerOption.map((m: any) => m['Customer'])
      this.customerOptionStr = [...new Set(customers)]

      this.machineOption = [...new Map(machine.map((item:any) =>
        [item['Machine'], item])).values()];

    } catch (error) {
      console.log("🚀 ~ error:", error)

    }
  }

  // todo onSelectCustomer
  onSelectCustomer(event: any) {
    this.dataFilter.machine = null
    const customer = this.customerOption.find((cus: any) => cus['Customer'] == event)
    this.dataFilter.customer = customer

    if(this.dataFilter.customer){
      this.machineOption = this.customerOption.filter((item: any) => item['Customer'] == event)
    }else{
      this.machineOption = [...new Map(this.customerOption.map((item:any) =>
        [item['Machine'], item])).values()];
    }
  }

  async onSubmit() {
    try {

      let params: HttpParams = new HttpParams()
      if (this.selected == 'engineer') {
        const res = await lastValueFrom(this.$report.get(params))
        this.dataSource = new MatTableDataSource(res.map((r: any) => {
          return {
            reportNo: r.no,
            province: r.customer ? r.customer['Province'] : '',
            customer: r.customer ? r.customer['Customer'] : "",
            machine: r.customer ? r.customer['Machine'] : '',
            sn: r.customer ? r.customer['S/N'] : "",
            status: r.status,
            _id: r._id
          }
        }))
      }
      if (this.selected == 'special') {

      }
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  onPrint() {
    this.router.navigate(['engineer/report-multi-print-view'], {
      queryParams: {
        _id: this.selection.selected.map((value: any) => value._id)
      }
    })
  }
  public objectComparisonFunction_id = function (option: any, value: any): boolean {
    return option.id === value.id;
  }
  public objectComparisonFunction_machine = function (option: any, value: any): boolean {
    return option.Machine === value.Machine;
  }

}
