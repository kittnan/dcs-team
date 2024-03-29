import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EngineerRoutingModule } from './engineer-routing.module';
import { EngineerComponent } from './engineer.component';
import { EngineerReportComponent } from './report/engineer-report/engineer-report.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EngineerReportNewComponent } from './report/engineer-report-new/engineer-report-new.component';
import { EngineerReportViewComponent } from './report/engineer-report-view/engineer-report-view.component';
import { EngineerReportPrintComponent } from './report/engineer-report-print/engineer-report-print.component';
import { EngineerReportMultiPrintComponent } from './report/engineer-report-multi-print/engineer-report-multi-print.component';
import { EngineerReportMultiPrintViewComponent } from './report/engineer-report-multi-print-view/engineer-report-multi-print-view.component';
import { EngineerPmReportComponent } from './pm-report/engineer-pm-report/engineer-pm-report.component';
import { EngineerPmReportNewComponent } from './pm-report/engineer-pm-report-new/engineer-pm-report-new.component';
import { EngineerPmReportViewComponent } from './pm-report/engineer-pm-report-view/engineer-pm-report-view.component';
import { EngineerPmReportPrintComponent } from './pm-report/engineer-pm-report-print/engineer-pm-report-print.component';


@NgModule({
  declarations: [
    EngineerComponent,
    EngineerReportComponent,
    EngineerReportNewComponent,
    EngineerReportViewComponent,
    EngineerReportPrintComponent,
    EngineerReportMultiPrintComponent,
    EngineerReportMultiPrintViewComponent,
    EngineerPmReportComponent,
    EngineerPmReportNewComponent,
    EngineerPmReportViewComponent,
    EngineerPmReportPrintComponent
  ],
  imports: [
    CommonModule,
    EngineerRoutingModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ]
})
export class EngineerModule { }
