import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EngineerReportComponent } from './engineer-report/engineer-report.component';
import { EngineerReportNewComponent } from './engineer-report-new/engineer-report-new.component';
import { EngineerReportViewComponent } from './engineer-report-view/engineer-report-view.component';
import { EngineerReportPrintComponent } from './engineer-report-print/engineer-report-print.component';
import { EngineerReportMultiPrintComponent } from './engineer-report-multi-print/engineer-report-multi-print.component';
import { EngineerReportMultiPrintViewComponent } from './engineer-report-multi-print-view/engineer-report-multi-print-view.component';

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
  {
    path:'report-print',
    component:EngineerReportPrintComponent
  },
  {
    path:'report-multi-print',
    component:EngineerReportMultiPrintComponent
  },
  {
    path:'report-multi-print-view',
    component:EngineerReportMultiPrintViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EngineerRoutingModule { }
