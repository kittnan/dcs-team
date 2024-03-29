import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EngineerReportComponent } from './report/engineer-report/engineer-report.component';
import { EngineerReportNewComponent } from './report/engineer-report-new/engineer-report-new.component';
import { EngineerReportViewComponent } from './report/engineer-report-view/engineer-report-view.component';
import { EngineerReportPrintComponent } from './report/engineer-report-print/engineer-report-print.component';
import { EngineerReportMultiPrintComponent } from './report/engineer-report-multi-print/engineer-report-multi-print.component';
import { EngineerReportMultiPrintViewComponent } from './report/engineer-report-multi-print-view/engineer-report-multi-print-view.component';
import { EngineerPmReportComponent } from './pm-report/engineer-pm-report/engineer-pm-report.component';
import { EngineerPmReportNewComponent } from './pm-report/engineer-pm-report-new/engineer-pm-report-new.component';
import { EngineerPmReportViewComponent } from './pm-report/engineer-pm-report-view/engineer-pm-report-view.component';
import { EngineerPmReportPrintComponent } from './pm-report/engineer-pm-report-print/engineer-pm-report-print.component';

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

  {
    path:'pm-report',
    component:EngineerPmReportComponent
  },
  {
    path:'pm-report-new',
    component:EngineerPmReportNewComponent
  },
  {
    path:'pm-report-view',
    component:EngineerPmReportViewComponent
  },
  {
    path:'pm-report-print',
    component:EngineerPmReportPrintComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EngineerRoutingModule { }
