import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

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
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onClickNewReport() {
    try {
      this.router.navigate(['engineer/report-new'])
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

}
