import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerMasterComponent } from './customer-master/customer-master.component';
import { MasterMachineComponent } from './master-machine/master-machine.component';
import { MasterManageComponent } from './master-manage/master-manage.component';
import { MasterServiceTypeOptionComponent } from './master-service-type-option/master-service-type-option.component';
import { MasterPmCheckListComponent } from './master-pm-check-list/master-pm-check-list.component';
import { PmTasksComponent } from './pm-tasks/pm-tasks.component';
import { PmTasksGenerateComponent } from './pm-tasks-generate/pm-tasks-generate.component';
import { PmPlanComponent } from './pm-plan/pm-plan.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'master_manage',
    pathMatch:'full'
  },
  {
    path:'customer',
    component:CustomerMasterComponent
  },
  {
    path:'master_machine',
    component:MasterMachineComponent
  },
  {
    path:'master_manage',
    component:MasterManageComponent
  },
  {
    path:'master_service_type_option',
    component:MasterServiceTypeOptionComponent
  },
  {
    path:'master_pm',
    component:MasterPmCheckListComponent
  },
  {
    path:'pm-tasks',
    component:PmTasksComponent
  },
  {
    path:'pm-tasks-generate',
    component:PmTasksGenerateComponent
  },
  {
    path:'pm-plan-view',
    component:PmPlanComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
