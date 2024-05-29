import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { HttpTasksService } from 'src/app/http/http-tasks.service';
import { DialogPmTaskComponent } from './dialog-pm-task/dialog-pm-task.component';

@Component({
  selector: 'app-pm-tasks',
  templateUrl: './pm-tasks.component.html',
  styleUrls: ['./pm-tasks.component.scss']
})
export class PmTasksComponent implements OnInit {

  resTasks: any = []
  displayedColumns: string[] = ['action', 'no', 'customer', 'province', 'district', 'machine', 'model', 'S/N', 'target', 'lastPM', 'PIC'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  groupOption: any = []
  groupSelected: any = 0
  constructor(
    private $tasks: HttpTasksService,
    private dialog: MatDialog
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      let params: HttpParams = new HttpParams()
      this.resTasks = await lastValueFrom(this.$tasks.get(params))
      this.groupOption = [...new Set(this.resTasks.map((item: any) => item.group))].sort((a:any,b:any)=>a-b)
      this.onChangeGroup()
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
  onChangeGroup() {
    let newData = [...this.resTasks]
    if (this.groupSelected == 0) {
      newData = this.resTasks
      this.dataSource = new MatTableDataSource(newData.map((task: any, i: number) => {
        return {
          ...task,
          model: task.machine?.Model,
          'S/N': task.machine ? task.machine['S/N'] : null,
          machine: task.machine?.Machine,
          lastPM: task.lastPM ? moment(task.lastPM).format('DD-MMM-YY') : null,
          PIC: task.PIC ? task.PIC.name : null,
        }
      }))
      setTimeout(() => {
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      }, 300);
    } else {
      newData = newData.filter((item: any) => item.group == this.groupSelected)
      this.dataSource = new MatTableDataSource(newData.map((task: any, i: number) => {
        return {
          ...task,
          model: task.machine?.Model,
          'S/N': task.machine ? task.machine['S/N'] : null,
          machine: task.machine?.Machine,
          lastPM: task.lastPM ? moment(task.lastPM).format('DD-MMM-YY') : null,
          PIC: task.PIC ? task.PIC.name : null,
        }
      }).sort((a: any, b: any) => a.no - b.no))
      setTimeout(() => {
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      }, 300);
    }

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // add() {

  // }

  onEdit(item: any) {
    let dialog = this.dialog.open(DialogPmTaskComponent, {
      data: item
    })
    dialog.afterClosed().subscribe((data: any) => {
      if (data) {
        this.onChangeGroup()
      }
    })
  }
  async onChangeActive(row:any){
    await lastValueFrom(this.$tasks.updateData(row))
  }

  async onUp(item: any) {
    if (item.no != 1) {
      let newNo = item.no - 1
      let prevItem = this.resTasks.find((data: any) => data.no == newNo && data.group == this.groupSelected)
      let currentItem = this.resTasks.find((data: any) => data.no == item.no && data.group == this.groupSelected)
      if (prevItem && currentItem) {
        prevItem.no = newNo + 1
        currentItem.no = newNo
        await lastValueFrom(this.$tasks.updateDataMany([prevItem,currentItem]))
        this.onChangeGroup()
      }
    }
  }
  async onDown(item: any) {
    if (item.no != this.dataSource.filteredData[this.dataSource.filteredData.length - 1].no) {
      let newNo = item.no + 1
      let prevItem = this.resTasks.find((data: any) => data.no == newNo && data.group == this.groupSelected)
      let currentItem = this.resTasks.find((data: any) => data.no == item.no && data.group == this.groupSelected)
      if (prevItem && currentItem) {
        prevItem.no = newNo - 1
        currentItem.no = newNo
        await lastValueFrom(this.$tasks.updateDataMany([prevItem,currentItem]))
        this.onChangeGroup()
      }

    }
  }

}
