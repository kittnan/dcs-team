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
import { MasterServiceTypeOptionEditorComponent } from './master-service-type-option-editor/master-service-type-option-editor.component';
import {CdkTableModule} from '@angular/cdk/table';
import { MasterPmCheckListComponent } from './master-pm-check-list/master-pm-check-list.component';
import { MasterPmCheckListEditorComponent } from './master-pm-check-list-editor/master-pm-check-list-editor.component';
import { PmTasksComponent } from './pm-tasks/pm-tasks.component';
import { PmTasksGenerateComponent } from './pm-tasks-generate/pm-tasks-generate.component';
import { DialogPmTaskComponent } from './pm-tasks/dialog-pm-task/dialog-pm-task.component';
import { DialogSelectPicComponent } from './pm-tasks-generate/dialog-select-pic/dialog-select-pic.component';
import { PmPlanComponent } from './pm-plan/pm-plan.component';

@NgModule({
  declarations: [
    CustomerMasterComponent,
    AdminComponent,
    MasterManageEditorComponent,
    MasterMachineEditorComponent,
    MasterServiceTypeOptionComponent,
    MasterServiceTypeOptionEditorComponent,
    MasterPmCheckListComponent,
    MasterPmCheckListEditorComponent,
    PmTasksComponent,
    PmTasksGenerateComponent,
    DialogPmTaskComponent,
    DialogSelectPicComponent,
    PmPlanComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CdkTableModule
  ]
})
export class AdminModule { }
