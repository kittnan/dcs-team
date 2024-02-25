import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { HttpUsersService } from 'src/app/http/http-api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-master-machine-editor',
  templateUrl: './master-machine-editor.component.html',
  styleUrls: ['./master-machine-editor.component.scss']
})
export class MasterMachineEditorComponent implements OnInit {

  rawData: any = {}
  check: any
  PIC: any = []
  selectedUsers: any


  province: any = []
  customer: any = []
  machine: any = []

  input_readonly :any = true
  constructor(
    private dialog: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: HttpUsersService,
  ) { }

  ngOnInit(): void {

    if (this.data) {
      this.rawData = { ...this.data }
    } else {
      this.rawData['Province'] = ''
      this.rawData['Customer'] = ''
      this.rawData['Machine'] = ''
    }
    this.debug_before()
    setTimeout(() => {
      this.getPiC()
      this.getMachine()
      this.input_readonly = false
    }, 200);


  }

  async getMachine() {
    let data = await lastValueFrom(this.api.Master_getall())
    let province = [...new Set(data.map((item: any) => item.Province))]; // [ 'A', 'B']
    this.province = province.map((d: any) => {
      return {
        list: `${d}`,
      }
    })
    let customer = [...new Set(data.map((item: any) => item.Customer))]; // [ 'A', 'B']
    this.customer = customer.map((d: any) => {
      return {
        list: `${d}`,
      }
    })
    let machine = [...new Set(data.map((item: any) => item.Machine))]; // [ 'A', 'B']
    this.machine = machine.map((d: any) => {
      return {
        list: `${d}`,
      }
    })



  }

  async getPiC() {
    this.PIC = await lastValueFrom(this.api.Master_User_getall())
  }

  debug_before() {
    setTimeout(() => {
      if (
        this.rawData['Province'] &&
        this.rawData['Customer'] &&
        this.rawData['Machine']
      ) {
        this.check = true
      } else {
        this.check = false
      }
    }, 1000);
  }

  submit() {
    Swal.fire({
      title: 'Do you want to add data ?',
      icon: 'question',
      showCancelButton: true,
    }).then(async r => {
      if (r.isConfirmed) {
        //code start
        delete this.rawData.No
        delete this.rawData.updatedAt
        let update = await lastValueFrom(this.api.Master_update(this.rawData._id,this.rawData))
        //code end
        if (update) {
          this.dialog.close('ok')
        }

      }
    })
    // console.log(this.rawData);
  }

  submit_add() {
    Swal.fire({
      title: 'Do you want to add data ?',
      icon: 'question',
      showCancelButton: true,
    }).then(async r => {
      if (r.isConfirmed) {
        //code start
        let add = await lastValueFrom(this.api.Master_add(this.rawData))
        //code end
        if (add) {
          this.dialog.close('ok')

        }
      }
    })
  }


  cancel() {
    this.dialog.close()
  }

  filterOptions(list: string, data: any) {
    const filterValue = list.toLowerCase();
    return data.filter((option: any) => option.list.toLowerCase().includes(filterValue));
  }




}

