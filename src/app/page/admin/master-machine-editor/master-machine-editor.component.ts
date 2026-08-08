import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { HttpMastersService } from 'src/app/http/http-masters.service';
import { HttpTasksService } from 'src/app/http/http-tasks.service';
import { HttpUsersService } from 'src/app/http/http-users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-master-machine-editor',
  templateUrl: './master-machine-editor.component.html',
  styleUrls: ['./master-machine-editor.component.scss'],
})

export class MasterMachineEditorComponent implements OnInit {

  rawData: any = {}
  check: any
  PIC: any = []
  selectedUsers: any


  province: any = []
  customer: any = []
  machine: any = []
  district: any = []

  input_readonly: any = true

  modelOptions: any
  brandOptions: any
  constructor(
    private dialog: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private user: HttpUsersService,
    private $master: HttpMastersService,
    private $pmTask: HttpTasksService,
  ) { }

  ngOnInit(): void {

    if (this.data) {
      this.rawData = { ...this.data }
    } else {
      this.rawData['Province'] = ''
      this.rawData['Customer'] = ''
      this.rawData['Machine'] = ''
      this.rawData['District'] = ''
      this.rawData['Brand'] = ''
      this.rawData['InstallDate'] = ''
    }
    this.debug_before()
    setTimeout(() => {
      this.getPiC()
      this.getMachine()
      this.getModel()
      this.getBrand()
      this.input_readonly = false
    }, 200);


  }

  async getMachine() {
    let data = await lastValueFrom(this.$master.Master_getall())
    let province = [...new Set(data.map((item: any) => item.Province))]; // [ 'A', 'B']
    this.province = province.map((d: any) => {
      return {
        list: `${d}`,
      }
    })
    let district = [...new Set(data.map((item: any) => item.District))]; // [ 'A', 'B']
    this.district = district.map((d: any) => {
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
    this.PIC = await lastValueFrom(this.user.Master_User_getall())
  }

  async getModel() {
    let resData: any = await firstValueFrom(this.$master.getModelOptions())
    this.modelOptions = resData.map((d: any) => d._id)
  }
  async getBrand() {
    let resData: any = await firstValueFrom(this.$master.getBrandOptions())
    this.brandOptions = resData.map((d: any) => d._id)
  }

  debug_before() {
    setTimeout(() => {
      console.log(this.rawData);
      if (
        
        this.rawData['Province'] &&
        this.rawData['Customer'] &&
        this.rawData['Machine'] &&
        this.rawData['Model'] &&
        this.rawData['Brand'] &&
        this.rawData['InstallDate']
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
        delete this.rawData.name
        let update = await lastValueFrom(this.$master.Master_update(this.rawData._id, this.rawData))
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
        let add = await lastValueFrom(this.$master.Master_add(this.rawData))
        await lastValueFrom(this.$pmTask.create(add[0]))
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
    const filterValue = list?.toLowerCase();
    return data.filter((option: any) => option.list?.toLowerCase().includes(filterValue));
  }

  filterModelOptions(list: string) {
    const filterValue = list?.toLowerCase();
    return this.modelOptions?.filter((option: any) => option?.toLowerCase().includes(filterValue)) || [];
  }

  filterBrandOptions(list: string) {
    const filterValue = list?.toLowerCase();
    return this.brandOptions?.filter((option: any) => option?.toLowerCase().includes(filterValue)) || [];
  }

}

