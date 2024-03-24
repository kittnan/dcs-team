import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpReportSpecialService } from 'src/app/http/http-report-special.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-special-report',
  templateUrl: './special-report.component.html',
  styleUrls: ['./special-report.component.scss']
})
export class SpecialReportComponent implements OnInit {

  displayedColumns: string[] = ['reportNo', 'province', 'customer', 'machine', 'sn', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  userLogin: any

  reports: any
  constructor(
    private router: Router,
    private $report: HttpReportSpecialService,
    private $local: LocalStorageService
  ) {
    let user: any = this.$local.getProfile()
    this.userLogin = user
  }

  async ngOnInit(): Promise<void> {
    try {
      let params:HttpParams = new HttpParams()
      this.reports = await lastValueFrom(this.$report.get(params))
      this.dataSource = new MatTableDataSource(this.reports.map((item: any) => {
        return {
          reportNo: item.no,
          province: item.customer?.Province,
          customer: item.customer?.Customer,
          machine: item.customer?.Machine,
          sn: item.customer ? item.customer['S/N'] : null,
          status: item.status,
          action: '',
          _id: item._id
        }
      }))
      setTimeout(() => {
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      }, 300);
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
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
      this.router.navigate(['special/report-new'], {
        queryParams: {
          _id: newReport[0]._id
        }
      })
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  // todo onClickReport
  onClickReport(row: any) {
    if (row && row.status == 'draft') {
      this.router.navigate(['special/report-new'], {
        queryParams: {
          _id: row._id
        }
      })
    }
    if (row && row.status == 'finish') {
      this.router.navigate(['special/report-view'], {
        queryParams: {
          _id: row._id
        }
      })
    }
  }

}
