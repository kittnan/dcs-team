import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EngineerReportComponent } from './engineer-report/engineer-report.component';
import { EngineerReportNewComponent } from './engineer-report-new/engineer-report-new.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'report',
    pathMatch:'full'
  },
  {
    path:'report',
    component:EngineerReportComponent
  },
  {
    path:'report-new',
    component:EngineerReportNewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EngineerRoutingModule { }
