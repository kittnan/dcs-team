import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { HttpTasksService } from 'src/app/http/http-tasks.service';
import { HttpUsersService } from 'src/app/http/http-users.service';
import { DialogSelectPicComponent } from './dialog-select-pic/dialog-select-pic.component';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { HttpPmPlanService } from 'src/app/http/http-pm-plan.service';

@Component({
  selector: 'app-pm-tasks-generate',
  templateUrl: './pm-tasks-generate.component.html',
  styleUrls: ['./pm-tasks-generate.component.scss']
})
export class PmTasksGenerateComponent implements OnInit {

  items: any = []
  displayItems: any = []
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  foo = true

  yearSelect = moment().format('YYYY')
  yearOption: any = []

  engineerSelect:any = null
  engineerOption: any = []

  pmPlan: any
  constructor(
    private $task: HttpTasksService,
    private $user: HttpUsersService,
    private dialog: MatDialog,
    private $pmPlan: HttpPmPlanService
  ) { }

  async ngOnInit(): Promise<void> {
    for (let i = 0; i < 2; i++) {
      this.yearOption.push(Number(moment().format('YYYY')) + i)
    }
    let resUser: any = await lastValueFrom(this.$user.getByCondition(new HttpParams().set('permission', JSON.stringify(['engineer']))))
    this.engineerOption = resUser.map((user: any) => user.name)
    this.onGen()
  }
  async onGen() {
    try {
      this.items = []
      this.displayItems = []
      let params: HttpParams = new HttpParams().set('year', this.yearSelect)
      let resPmPlans = await lastValueFrom(this.$pmPlan.get(params))
      if (resPmPlans && resPmPlans.length > 0) {
        this.pmPlan = resPmPlans[0]
        this.items = resPmPlans[0].plans
        this.displayItems = resPmPlans[0].plans
      } else {
        let plans: any = await lastValueFrom(this.$task.genPM(params))
        this.items = plans
        this.displayItems = plans
      }
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
  onChangeYear() {
    this.onGen()
  }
  showPIC(data: any, month: any) {
    let newMonth = moment(`01-${month}-${this.yearSelect}`, 'DD-MMMM-YYYY').format('MM-YY')
    let items = data.data
    let item = items.find((a: any) => a.pmDate == newMonth)
    if (item) {
      return item.PIC
    }
    return ''

  }

  showProvince(data: any, groupData: any, i_data: any, key: any) {
    if (i_data == 0) {
      return data[key]
    } else {
      let province = data[key]
      let top = groupData[i_data - 1][key]
      if (province != top) {
        return province
      } else {
        return ''
      }
    }
  }

  onClickPIC(data: any, month: any) {
    console.log("🚀 ~ data:", data)
    let newMonth = moment(`01-${month}-${this.yearSelect}`, 'DD-MMMM-YYYY').format('MM-YY')
    let items = data.data
    let item = items.find((a: any) => a.pmDate == newMonth)
    let dialogRef = this.dialog.open(DialogSelectPicComponent, {
      data: item.PIC,
      disableClose: true
    })
    dialogRef.afterClosed().subscribe((dialogData: any) => {
      if (dialogData === false) {
      } else {
        if (dialogData.mode == 'all') {
          items.map((item: any) => {
            if(item.PIC){
              item.PIC = dialogData.data
            }
            return item
          })
        } else {
          item.PIC = dialogData.data
        }
      }
    })
  }

  onSave() {
    try {
      Swal.fire(({
        title: 'Do you want to save ?',
        icon: 'question',
        showCancelButton: true
      })).then(async (v: SweetAlertResult) => {
        if (v.isConfirmed) {
          if (this.pmPlan) {
            await lastValueFrom(this.$pmPlan.update(this.pmPlan))
            Swal.fire({
              title: 'Success',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              location.reload()
            })
          } else {
            let newData = {
              plans: this.items,
              year: this.yearSelect
            }
            await lastValueFrom(this.$pmPlan.create(newData))
            Swal.fire({
              title: 'Success',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              location.reload()
            })
          }


        }
      })
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  onChangeEngineer(){
    console.log(this.engineerSelect);

  }


}
