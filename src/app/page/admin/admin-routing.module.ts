import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerMasterComponent } from './customer-master/customer-master.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'customer',
    pathMatch:'full'
  },
  {
    path:'customer',
    component:CustomerMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
