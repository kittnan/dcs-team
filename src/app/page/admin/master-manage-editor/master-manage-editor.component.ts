import { filter } from 'rxjs/operators';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpUsersService } from 'src/app/http/http-users.service';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-master-manage-editor',
  templateUrl: './master-manage-editor.component.html',
  styleUrls: ['./master-manage-editor.component.scss']
})
export class MasterManageEditorComponent implements OnInit {

  rawData: any = {}
  permission: any
  check :any

  constructor(
    private dialog: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: HttpUsersService,
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.rawData = {...this.data}
      this.permission = {
        admin: this.rawData.permission.filter((d: any) => d == 'admin').length != 0 ? true : false,
        engineer: this.rawData.permission.filter((d: any) => d == 'engineer').length != 0 ? true : false,
        special: this.rawData.permission.filter((d: any) => d == 'special').length != 0 ? true : false,
        store: this.rawData.permission.filter((d: any) => d == 'store').length != 0 ? true : false,
        fullAdmin: this.rawData.permission.filter((d: any) => d == 'fullAdmin').length != 0 ? true : false
      }
      this.debug_before()
    }else{
      this.permission = {
        admin: false,
        engineer: false,
        special: false,
        store: false,
        fullAdmin: false,
      }
    }

  }


  debug_before(){
    if (this.rawData.name && this.rawData.username && this.rawData.password  &&  (this.permission.admin || this.permission.engineer)) {
      this.check = true
    }else{
      this.check = false
    }
  }


  async submit() {
    this.rawData.permission = []
    if (this.permission.admin) {
      this.rawData.permission.push('admin')
    }
    if (this.permission.engineer) {
      this.rawData.permission.push('engineer')
    }
    if (this.permission.special) {
      this.rawData.permission.push('special')
    }
    if (this.permission.store) {
      this.rawData.permission.push('store')
    }
    if (this.permission.fullAdmin) {
      this.rawData.permission.push('fullAdmin')
    }
    Swal.fire({
      title: 'Do you want to update data ?',
      icon: 'question',
      showCancelButton: true,
    }).then(async r => {
      if (r.isConfirmed) {
        //code start
        delete this.rawData['no']
        this.rawData.telephone = this.rawData.telephone.replaceAll('-', '')
        let update = await lastValueFrom(this.api.Master_User_update(this.rawData._id, this.rawData))
        if (update) {
            this.dialog.close("ok")
        }
        //code end
      }
    })

  }


  async submit_add(){
    this.rawData.permission = []
    if (this.permission.admin) {
      this.rawData.permission.push('admin')
    }
    if (this.permission.engineer) {
      this.rawData.permission.push('engineer')
    }
    if (this.permission.special) {
      this.rawData.permission.push('special')
    }
    if (this.permission.store) {
      this.rawData.permission.push('store')
    }
    if (this.permission.fullAdmin) {
      this.rawData.permission.push('fullAdmin')
    }
    Swal.fire({
      title: 'Do you want to add data ?',
      icon: 'question',
      showCancelButton: true,
    }).then(async r => {
      if (r.isConfirmed) {
        //code start
        delete this.rawData['no']
        let update = await lastValueFrom(this.api.Master_User_add(this.rawData))
        if (update) {
            this.dialog.close("ok")
        }
        //code end
      }
    })
  }


  cancel() {
    this.dialog.close()
  }


  get formattedTelephone(): string {
    let tel = this.rawData['telephone'];
    // Format the telephone number for Thailand (assuming 10 digits)
    if (tel && tel.length === 10) {
      return tel.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    return tel; // Return as is if not 10 characters
  }
}
