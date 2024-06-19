import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpServiceTypeService } from 'src/app/http/http-serviceType.service';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MasterServiceTypeOptionEditorComponent } from '../master-service-type-option-editor/master-service-type-option-editor.component';
import Swal from 'sweetalert2';
import { HttpPMService } from 'src/app/http/http-pm.service';
import { MasterPmCheckListEditorComponent } from '../master-pm-check-list-editor/master-pm-check-list-editor.component';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-master-pm-check-list',
  templateUrl: './master-pm-check-list.component.html',
  styleUrls: ['./master-pm-check-list.component.scss']
})
export class MasterPmCheckListComponent implements OnInit {


  displayedColumns: string[] = ['form', 'No', 'name', 'action'];
  dataSource: any = new MatTableDataSource
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  data: any
  formOption: any = []
  formSelect: any = null;
  formName: any = null
  constructor(
    private $pm: HttpPMService,
    private dialog: MatDialog
  ) { }



  ngOnInit(): void {
    this.getData()
  }

  async getData() {
    this.data = await lastValueFrom(this.$pm.getByParam(new HttpParams()))
    if (this.data && this.data.length > 0) {
      this.formName = this.data[0].formName ? this.data[0].formName : null
    }
    // this.data = this.data.map((d: any, i: any) => {
    //   return {
    //     ...d,
    //     'number': i + 1
    //   }
    // })
    this.formOption = [...new Set(this.data.map((item: any) => item.form))]
    // this.formSelect = this.formOption[0]
    this.createTable()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  add() {
    let lastData = [...this.dataSource.data].pop()
    let newData = { ...lastData }
    if (newData) {
      newData.no = newData.no + 1
      newData.name = null
    }
    let closeDialog = this.dialog.open(MasterPmCheckListEditorComponent, {
      // width: '300px',
      data: {
        name: newData?.name ? newData?.name : null,
        no: newData?.no ? newData?.no : 1,
        form: this.formSelect,
        formName: this.formName
      }
    });
    closeDialog.afterClosed().subscribe(data => {
      if (data) {
        Swal.fire({
          title: `Do you want to add data ${data.name} ?`,
          icon: 'question',
          showCancelButton: true,
        }).then(async r => {
          if (r.isConfirmed) {
            //code start

            let add = await lastValueFrom(this.$pm.Add(data))
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
            let update = await lastValueFrom(this.$pm.Update(close._id, close))
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

  saveForm() {
    try {
      Swal.fire({
        title: `Do you want to Save ?`,
        icon: 'question',
        showCancelButton: true,
      }).then(async r => {
        if (r.isConfirmed) {
          let updateData = this.dataSource.data.map((item: any) => {
            item.formName = this.formName
            return item
          })
          await lastValueFrom(this.$pm.updateMany(updateData))
          Swal.fire({
            title: "Success",
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            location.reload()
          })
        }
      })
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  deleteForm() {
    try {
      Swal.fire({
        title: `Do you want to Delete ?`,
        icon: 'warning',
        showCancelButton: true,
      }).then(async r => {
        if (r.isConfirmed) {
          await lastValueFrom(this.$pm.deleteByForm(new HttpParams().set('formNum', this.formSelect)))
          Swal.fire({
            title: "Success",
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            location.reload()
          })
        }
      })
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }


  deleteBySelect(e: any) {
    Swal.fire({
      title: `Do you want to delete data ?<br> ${e.name}`,
      icon: 'question',
      showCancelButton: true,
    }).then(async r => {
      if (r.isConfirmed) {

        let del = await lastValueFrom(this.$pm.DelByCondition({ _id: e._id }))

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

  addForm() {
    this.formName = null
    let newForm = [...this.formOption].pop()
    newForm = newForm += 1
    this.formOption.push(newForm)
    this.formSelect = newForm
    this.createTable()
  }

  onSelectForm() {
    this.formName = null
    this.createTable()
  }
  createTable() {
    let newData = this.data.filter((data: any) => data.form == this.formSelect).sort((a: any, b: any) => a.no - b.no)
    if(newData && newData.length>0 && newData[0].formName){
    this.formName = newData[0].formName
    }
    this.dataSource = new MatTableDataSource(newData)
    this.dataSource.paginator = this.paginator;
  }

}

