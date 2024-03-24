import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EngineerReportComponent } from './engineer-report/engineer-report.component';
import { EngineerReportNewComponent } from './engineer-report-new/engineer-report-new.component';
import { EngineerReportViewComponent } from './engineer-report-view/engineer-report-view.component';

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
  {
    path:'report-view',
    component:EngineerReportViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EngineerRoutingModule { }
