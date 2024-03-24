import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpReportService } from 'src/app/http/http-report.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-engineer-report',
  templateUrl: './engineer-report.component.html',
  styleUrls: ['./engineer-report.component.scss']
})
export class EngineerReportComponent implements OnInit {
  displayedColumns: string[] = ['reportNo', 'province', 'customer', 'machine', 'sn', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  userLogin: any

  reports: any
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
      this.reports = await lastValueFrom(this.$report.get(new HttpParams()))
      console.log("🚀 ~ this.reports:", this.reports)
      this.dataSource = new MatTableDataSource(this.reports.map((item: any) => {
        return {
          reportNo: item.no,
          province: item.customer?.Province,
          customer: item.customer?.Customer,
          machine: item.machine,
          sn: item.customer ? item.customer['S/N'] : null,
          status: item.status,
          action: '',
          _id: item._id
        }
      }))
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
      this.router.navigate(['engineer/report-new'], {
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

}
