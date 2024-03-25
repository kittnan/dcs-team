import { SelectionModel } from '@angular/cdk/collections';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpReportSpecialService } from 'src/app/http/http-report-special.service';
import { HttpReportService } from 'src/app/http/http-report.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-report-multi-print',
  templateUrl: './report-multi-print.component.html',
  styleUrls: ['./report-multi-print.component.scss']
})
export class ReportMultiPrintComponent implements OnInit {

  displayedColumns: string[] = ['select', 'reportNo', 'province', 'customer', 'machine', 'sn', 'status'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource()
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  userLogin: any

  selected: any = null
  typeOption: string[] = ['engineer', 'special']
  constructor(
    private router: Router,
    private $report: HttpReportService,
    private $reportSpecial: HttpReportSpecialService,
    private $local: LocalStorageService
  ) {
    let user: any = this.$local.getProfile()
    this.userLogin = user
  }

  ngOnInit(): void {
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
    console.log(this.selection.selected);
    this.router.navigate(['engineer/report-multi-print-view'], {
      queryParams: {
        _id: this.selection.selected.map((value: any) => value._id)
      }
    })
  }

}
