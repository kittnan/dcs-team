import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { HttpTasksService } from 'src/app/http/http-tasks.service';

@Component({
  selector: 'app-pm-tasks-generate',
  templateUrl: './pm-tasks-generate.component.html',
  styleUrls: ['./pm-tasks-generate.component.scss']
})
export class PmTasksGenerateComponent implements OnInit {

  items: any = []
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  foo = true

  year = 2024
  constructor(
    private $task: HttpTasksService
  ) { }

  ngOnInit(): void {
    this.onGen()
  }
  async onGen() {
    try {
      let plans: any = await lastValueFrom(this.$task.genPM())
      console.log("🚀 ~ plans:", plans)
      this.items = plans
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
  showPIC(data: any, month: any) {
    let newMonth = moment(`01-${month}-${this.year}`, 'DD-MMMM-YYYY').format('MM-YY')
    let items = data.data
    let item = items.find((a: any) => a.pmEst == newMonth)
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
      if (province != top){
        return province
      }else{
        return ''
      }
    }
  }


}
