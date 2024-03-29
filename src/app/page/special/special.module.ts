import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialRoutingModule } from './special-routing.module';
import { SpecialComponent } from './special.component';
import { SpecialReportComponent } from './report/special-report/special-report.component';
import { SpecialReportNewComponent } from './report/special-report-new/special-report-new.component';
import { SpecialReportViewComponent } from './report/special-report-view/special-report-view.component';
import { SpecialReportPrintComponent } from './report/special-report-print/special-report-print.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SpecialPmReportComponent } from './pm-report/special-pm-report/special-pm-report.component';
import { SpecialPmReportNewComponent } from './pm-report/special-pm-report-new/special-pm-report-new.component';
import { SpecialPmReportViewComponent } from './pm-report/special-pm-report-view/special-pm-report-view.component';
import { SpecialPmReportPrintComponent } from './pm-report/special-pm-report-print/special-pm-report-print.component';


@NgModule({
  declarations: [
    SpecialComponent,
    SpecialReportComponent,
    SpecialReportNewComponent,
    SpecialReportViewComponent,
    SpecialReportPrintComponent,
    SpecialPmReportComponent,
    SpecialPmReportNewComponent,
    SpecialPmReportViewComponent,
    SpecialPmReportPrintComponent
  ],
  imports: [
    CommonModule,
    SpecialRoutingModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ]
})
export class SpecialModule { }
