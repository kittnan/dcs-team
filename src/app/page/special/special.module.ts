import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialRoutingModule } from './special-routing.module';
import { SpecialComponent } from './special.component';
import { SpecialReportComponent } from './special-report/special-report.component';
import { SpecialReportNewComponent } from './special-report-new/special-report-new.component';
import { SpecialReportViewComponent } from './special-report-view/special-report-view.component';
import { SpecialReportPrintComponent } from './special-report-print/special-report-print.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SpecialComponent,
    SpecialReportComponent,
    SpecialReportNewComponent,
    SpecialReportViewComponent,
    SpecialReportPrintComponent
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
