import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EngineerReportComponent } from './report/engineer-report/engineer-report.component';
import { EngineerReportNewComponent } from './report/engineer-report-new/engineer-report-new.component';
import { EngineerReportViewComponent } from './report/engineer-report-view/engineer-report-view.component';
import { EngineerReportPrintComponent } from './report/engineer-report-print/engineer-report-print.component';
import { EngineerPmReportComponent } from './pm-report/engineer-pm-report/engineer-pm-report.component';
import { EngineerPmReportNewComponent } from './pm-report/engineer-pm-report-new/engineer-pm-report-new.component';
import { EngineerPmReportViewComponent } from './pm-report/engineer-pm-report-view/engineer-pm-report-view.component';
import { EngineerPmReportPrintComponent } from './pm-report/engineer-pm-report-print/engineer-pm-report-print.component';
import { EngineerLibrarySearchComponent } from './engineer-library-search/engineer-library-search.component';

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
  {
    path:'library-search',
    component:EngineerLibrarySearchComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EngineerRoutingModule { }
