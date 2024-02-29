import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpUsersService } from 'src/app/http/http-serviceType.service';

@Component({
  selector: 'app-master-service-type-option',
  templateUrl: './master-service-type-option.component.html',
  styleUrls: ['./master-service-type-option.component.scss']
})
export class MasterServiceTypeOptionComponent implements OnInit {

  constructor(
    private api: HttpUsersService,
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  async getData(){
    let data = await lastValueFrom(this.api.getAll())
    console.log("🚀 ~ MasterServiceTypeOptionComponent ~ getData ~ data:", data)

  }

}
