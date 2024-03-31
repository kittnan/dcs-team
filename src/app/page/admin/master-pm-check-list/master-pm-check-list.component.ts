import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpServiceTypeService } from 'src/app/http/http-serviceType.service';
import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MasterServiceTypeOptionEditorComponent } from '../master-service-type-option-editor/master-service-type-option-editor.component';
import Swal from 'sweetalert2';
import { HttpPMService } from 'src/app/http/http-pm.service';
import { MasterPmCheckListEditorComponent } from '../master-pm-check-list-editor/master-pm-check-list-editor.component';

@Component({
  selector: 'app-master-pm-check-list',
  templateUrl: './master-pm-check-list.component.html',
  styleUrls: ['./master-pm-check-list.component.scss']
})
export class MasterPmCheckListComponent implements OnInit {


  displayedColumns: string[] = ['No', 'name', 'value' ,'action'];
  dataSource: any = new MatTableDataSource
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  data:any


  constructor(
    private $pm: HttpPMService,
    private dialog: MatDialog
  ) { }



  ngOnInit(): void {
    this.getData()
  }

  async getData(){
    this.data = await lastValueFrom(this.$pm.getAll())
    this.data = this.data.map((d:any,i:any)=>{
      return {
        ...d,
        'number' : i + 1
      }
    })
    this.dataSource = new MatTableDataSource(this.data)
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  add(){
    let closeDialog = this.dialog.open(MasterPmCheckListEditorComponent, {
      // width: '300px',
      data: null
    });
    closeDialog.afterClosed().subscribe(close => {
      if (close) {
        Swal.fire({
          title: `Do you want to add data ${close.name} ?`,
          icon: 'question',
          showCancelButton: true,
        }).then(async r => {
          if (r.isConfirmed) {
            //code start
            console.log(close);

            let add = await lastValueFrom(this.$pm.Add(close))
            //code end
            setTimeout(() => {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Success',
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                this.getData()
              })
            }, 200);
          }
        })


      }
    })
  }

  edit(item: any) {
    let closeDialog = this.dialog.open(MasterPmCheckListEditorComponent, {
      // width: '300px',
      data: item
    });
    closeDialog.afterClosed().subscribe(close => {
      if (close) {
        Swal.fire({
          title: `Do you want to update data ${close.name} ?`,
          icon: 'question',
          showCancelButton: true,
        }).then(async r => {
          if (r.isConfirmed) {
            //code start
            delete close.number
            let update = await lastValueFrom(this.$pm.Update(close._id,close))
            //code end
            setTimeout(() => {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Success',
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                this.getData()
              })
            }, 200);
          }
        })
      }
    })
  }


  deleteBySelect(e: any) {
    Swal.fire({
      title: `Do you want to delete data ?<br> ${e.name}`,
      icon: 'question',
      showCancelButton: true,
    }).then(async r => {
      if (r.isConfirmed) {
        //code start

        // let data = this.data.filter((d: any) => d._id != e._id)
        // data = data.filter((d: any) => d._id != e._id)
        // this.dataSource = new MatTableDataSource(data)
        // this.dataSource.paginator = this.paginator;
        let del = await lastValueFrom(this.$pm.DelByCondition({ _id: e._id }))
        //code end
        setTimeout(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Success',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.getData()
          })
        }, 200);
      }
    })
  }

}

