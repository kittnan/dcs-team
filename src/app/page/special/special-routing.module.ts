import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialReportComponent } from './special-report/special-report.component';
import { SpecialReportNewComponent } from './special-report-new/special-report-new.component';
import { SpecialReportViewComponent } from './special-report-view/special-report-view.component';
import { SpecialReportPrintComponent } from './special-report-print/special-report-print.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialRoutingModule { }
