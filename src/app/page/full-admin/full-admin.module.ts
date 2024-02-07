import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullAdminRoutingModule } from './full-admin-routing.module';
import { FullAdminComponent } from './full-admin.component';


@NgModule({
  declarations: [
    FullAdminComponent
  ],
  imports: [
    CommonModule,
    FullAdminRoutingModule
  ]
})
export class FullAdminModule { }
