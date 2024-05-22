import { SelectionModel } from '@angular/cdk/collections';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { HttpReportService } from 'src/app/http/http-report.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-engineer-report',
  templateUrl: './engineer-report.component.html',
  styleUrls: ['./engineer-report.component.scss']
})
export class EngineerReportComponent implements OnInit {
  displayedColumns: string[] = ['reportNo', 'createdAt', 'province', 'customer', 'machine', 'serviceType', 'status'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource()
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  userLogin: any

  reports: any

  statusOption: any[] = [
    {
      name: 'Draft',
      value: 'draft'
    },
    {
      name: 'Cancel',
      value: 'cancel'
    },
    {
      name: 'Finished',
      value: 'finish'
    },
    {
      name: 'All',
      value: 'all'
    }
  ]
  filterData: any = {
    status: 'draft',
    start: null,
    end: null
  }

  isDelete: boolean = false
  constructor(
    private router: Router,
    private $report: HttpReportService,
    private $local: LocalStorageService
  ) {
    let user: any = this.$local.getProfile()
    this.userLogin = user
  }

  async ngOnInit(): Promise<void> {
    try {
      let params: HttpParams = new HttpParams()
      params = params.set('status', this.filterData.status)
      this.onGetData(params)
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  async onGetData(params: HttpParams) {
    this.reports = await lastValueFrom(this.$report.get(params))
    this.dataSource = new MatTableDataSource(this.reports.map((item: any) => {
      return {
        reportNo: item.no,
        createdAt: moment(item.createdAt).format('DD-MMM-YY, HH:mm'),
        province: item.customer?.Province,
        customer: item.customer?.Customer,
        machine: item.customer?.Machine,
        serviceType: item.serviceType?.name,
        status: item.status,
        action: '',
        _id: item._id
      }
    }))
    setTimeout(() => {
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    }, 300);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  async onClickNewReport() {
    try {
      const newReport = await lastValueFrom(this.$report.createNewReport({ userActive: this.userLogin }))
      this.router.navigate(['engineer/report-new'], {
        queryParams: {
          _id: newReport[0]._id
        }
      })
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  // todo on change filter status
  onSearch() {
    try {
      let params: HttpParams = new HttpParams()
      if (this.filterData.status != 'all') {
        params = params.set('status', this.filterData.status == 'finished' ? 'finish' : this.filterData.status)
      }
      if (this.filterData.start) {
        params = params.set('start', moment(this.filterData.start).format('DD-MM-YY'))
      }
      if (this.filterData.end) {
        params = params.set('end', moment(this.filterData.end).format('DD-MM-YY'))
      }
      this.onGetData(params)
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
  // onChangeFilterStatus() {
  //   let params: HttpParams = new HttpParams()
  //   if (this.filterData.status != 'all') {
  //     params = params.set('status', this.filterData.status == 'finished' ? 'finish' : this.filterData.status)
  //   }
  //   this.onGetData(params)
  // }

  // // todo filter date
  // onChangeFilterDate() {

  // }

  // todo onClickReport
  onClickReport(row: any) {
    if (row && row.status == 'draft') {
      this.router.navigate(['engineer/report-new'], {
        queryParams: {
          _id: row._id
        }
      })
    }
    if (row && row.status == 'finish') {
      this.router.navigate(['engineer/report-view'], {
        queryParams: {
          _id: row._id
        }
      })
    }
  }

  onClickDelete() {
    this.isDelete = true
    this.displayedColumns = ['select', 'reportNo', 'createdAt', 'province', 'customer', 'machine', 'serviceType', 'status']
  }
  onClickDeleteCancel() {
    this.isDelete = false
    this.displayedColumns = ['reportNo', 'createdAt', 'province', 'customer', 'machine', 'serviceType', 'status']
    this.selection.clear()
  }
  onClickDeleteConfirm() {
    Swal.fire({
      title: 'Delete ?',
      icon: 'warning',
      showCancelButton: true
    }).then((v: SweetAlertResult) => {
      if (v.isConfirmed) {
        this.updateDelete()
      }
    })
  }
  async updateDelete() {
    try {
      let dataUpdate = this.selection.selected.map((item: any) => {
        item.status = 'delete'
        return item
      })
      await lastValueFrom(this.$report.saveMultiple(dataUpdate))
      Swal.fire({
        title: "Success",
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        location.reload()
      })
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}
