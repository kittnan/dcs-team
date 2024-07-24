import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { HttpTasksService } from 'src/app/http/http-tasks.service';
import { HttpUsersService } from 'src/app/http/http-users.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { HttpPmPlanService } from 'src/app/http/http-pm-plan.service';
@Component({
  selector: 'app-pm-plan-view',
  templateUrl: './pm-plan-view.component.html',
  styleUrls: ['./pm-plan-view.component.scss']
})
export class PmPlanViewComponent implements OnInit {

  items: any = []
  displayItems: any = []
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  yearSelect = moment().format('YYYY')
  yearOption: any = []
  engineerSelect: any = 'all'
  engineerOption: any = []

  pmPlan: any
  current: boolean = false
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
    this.onGen(null)
  }
  async onGen(PIC: any) {
    try {
      this.items = []
      this.displayItems = []
      let params: HttpParams = new HttpParams().set('year', this.yearSelect)
      if (PIC) {
        params = params.set('PIC', this.engineerSelect)
      }
      let resPmPlans = await lastValueFrom(this.$pmPlan.get(params))
      if (resPmPlans && resPmPlans.length > 0) {
        this.pmPlan = resPmPlans[0]
        this.items = resPmPlans[0].plans
        this.displayItems = resPmPlans[0].plans
      }
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
  async onGenNew(PIC: any) {
    try {
      this.items = []
      this.displayItems = []
      let params: HttpParams = new HttpParams().set('year', this.yearSelect)
      let resPmPlans = await lastValueFrom(this.$task.genPM(params))
      if (resPmPlans && resPmPlans.length > 0) {
        if (PIC) {
          let data = resPmPlans.map((item: any) => {
            item.data = item.data.filter((task: any) => {
              if (task.data.some((data: any) => data.PIC == PIC)) return true
              return false
            })
            return item
          }).filter((item: any) => item.data.length > 0)
          this.items = data
          this.displayItems = data
        }else{
          this.items = resPmPlans
          this.displayItems = resPmPlans
        }
      }

    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
  onChangeYear() {
    this.onGen(null)
  }

  async onChangeCurrent() {
    if (this.current) {
      if (this.engineerSelect == 'all') {
        this.onGenNew(null)
      } else {
        this.onGenNew(this.engineerSelect)
      }
    } else {
      if (this.engineerSelect == 'all') {
        this.onGen(null)
      } else {
        this.onGen(this.engineerSelect)
      }
    }
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

  showPIC2(data: any, month: any) {
    let newMonth = moment(`01-${month}-${this.yearSelect}`, 'DD-MMMM-YYYY').format('MM-YY')
    let items = data.data
    let item = items.find((a: any) => a.pmDate == newMonth)
    if (item) {
      if (this.engineerSelect != 'all') {
        if (item.PIC == this.engineerSelect) return item.PIC
      }
      return item.PIC
    }
    return ''

  }


  onChangeEngineer() {
    if (this.current) {
      if (this.engineerSelect == 'all') {
        this.onGenNew(null)
      } else {
        this.onGenNew(this.engineerSelect)
      }
    } else {
      if (this.engineerSelect == 'all') {
        this.onGen(null)
      } else {
        this.onGen(this.engineerSelect)
      }
    }

  }

}
