import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerMasterComponent } from './customer-master/customer-master.component';
import { MasterMachineComponent } from './master-machine/master-machine.component';
import { MasterManageComponent } from './master-manage/master-manage.component';

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

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
