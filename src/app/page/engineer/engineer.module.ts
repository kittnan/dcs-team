import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EngineerRoutingModule } from './engineer-routing.module';
import { EngineerComponent } from './engineer.component';
import { EngineerReportComponent } from './engineer-report/engineer-report.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EngineerReportNewComponent } from './engineer-report-new/engineer-report-new.component';
import { EngineerReportViewComponent } from './engineer-report-view/engineer-report-view.component';
import { EngineerReportPrintComponent } from './engineer-report-print/engineer-report-print.component';
import { EngineerReportMultiPrintComponent } from './engineer-report-multi-print/engineer-report-multi-print.component';
import { EngineerReportMultiPrintViewComponent } from './engineer-report-multi-print-view/engineer-report-multi-print-view.component';


@NgModule({
  declarations: [
    EngineerComponent,
    EngineerReportComponent,
    EngineerReportNewComponent,
    EngineerReportViewComponent,
    EngineerReportPrintComponent,
    EngineerReportMultiPrintComponent,
    EngineerReportMultiPrintViewComponent
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
