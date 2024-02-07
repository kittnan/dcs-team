import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CustomerMasterComponent } from './customer-master/customer-master.component';
import { AdminComponent } from './admin.component';


@NgModule({
  declarations: [
    CustomerMasterComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
