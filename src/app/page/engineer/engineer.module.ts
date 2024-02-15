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


@NgModule({
  declarations: [
    EngineerComponent,
    EngineerReportComponent,
    EngineerReportNewComponent
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
