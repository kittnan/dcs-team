import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CustomerMasterComponent } from './customer-master/customer-master.component';
import { AdminComponent } from './admin.component';
import { MasterManageEditorComponent } from './master-manage-editor/master-manage-editor.component';
import { MaterialModule } from 'src/app/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MasterMachineEditorComponent } from './master-machine-editor/master-machine-editor.component';
import { MasterServiceTypeOptionComponent } from './master-service-type-option/master-service-type-option.component';


@NgModule({
  declarations: [
    CustomerMasterComponent,
    AdminComponent,
    MasterManageEditorComponent,
    MasterMachineEditorComponent,
    MasterServiceTypeOptionComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class AdminModule { }
