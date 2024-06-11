import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialReportComponent } from './report/special-report/special-report.component';
import { SpecialReportNewComponent } from './report/special-report-new/special-report-new.component';
import { SpecialReportViewComponent } from './report/special-report-view/special-report-view.component';
import { SpecialReportPrintComponent } from './report/special-report-print/special-report-print.component';
import { SpecialPmReportComponent } from './pm-report/special-pm-report/special-pm-report.component';
import { SpecialPmReportNewComponent } from './pm-report/special-pm-report-new/special-pm-report-new.component';
import { SpecialPmReportViewComponent } from './pm-report/special-pm-report-view/special-pm-report-view.component';
import { SpecialPmReportPrintComponent } from './pm-report/special-pm-report-print/special-pm-report-print.component';
import { SpecialLibrarySearchComponent } from './special-library-search/special-library-search.component';
import { SpecialPmPlanViewComponent } from './special-pm-plan-view/special-pm-plan-view.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'report',
    pathMatch:'full'
  },
  {
    path:'report',
    component:SpecialReportComponent
  },
  {
    path:'report-new',
    component:SpecialReportNewComponent
  },
  {
    path:'report-view',
    component:SpecialReportViewComponent
  },
  {
    path:'report-print',
    component:SpecialReportPrintComponent
  },

  {
    path:'pm-report',
    component:SpecialPmReportComponent
  },
  {
    path:'pm-report-new',
    component:SpecialPmReportNewComponent
  },
  {
    path:'pm-report-view',
    component:SpecialPmReportViewComponent
  },
  {
    path:'pm-report-print',
    component:SpecialPmReportPrintComponent
  },
  {
    path:'library-search',
    component:SpecialLibrarySearchComponent
  },
  {
    path:'pm-plan-view',
    component:SpecialPmPlanViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialRoutingModule { }
