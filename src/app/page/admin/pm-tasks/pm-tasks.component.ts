import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { HttpTasksService } from 'src/app/http/http-tasks.service';

@Component({
  selector: 'app-pm-tasks',
  templateUrl: './pm-tasks.component.html',
  styleUrls: ['./pm-tasks.component.scss']
})
export class PmTasksComponent implements OnInit {

  displayedColumns: string[] = ['action','customer', 'province', 'district', 'machine', 'model', 'S/N', 'target', 'lastPM', 'PIC'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private $tasks: HttpTasksService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      let params: HttpParams = new HttpParams()
      let resTasks = await lastValueFrom(this.$tasks.get(params))
      this.dataSource = new MatTableDataSource(resTasks.map((task: any, i: number) => {
        return {
          ...task,
          model: task.machine?.Model,
          'S/N':  task.machine? task.machine['S/N'] : null,
          machine: task.machine?.Machine,
          lastPM: task.lastPM ? moment(task.lastPM).format('DD-MMM-YY') : null,
          PIC: task.PIC ? task.PIC.name : null,
        }
      }))
      setTimeout(() => {
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      }, 300);
      console.log("🚀 ~ resTasks:", resTasks)
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

  add() {

  }

}
