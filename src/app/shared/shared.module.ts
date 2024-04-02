import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubTitleComponent } from './sub-title/sub-title.component';
import { TitleComponent } from './title/title.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { SignaturePadComponent } from './signature-pad/signature-pad.component';
import { BottomSheetEngComponent } from './bottom-sheet-eng/bottom-sheet-eng.component';
import { ReportEngineerViewComponent } from './engineer/report/report-engineer-view/report-engineer-view.component';
import { ReportEngineerPrintComponent } from './engineer/report/report-engineer-print/report-engineer-print.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { ReportSpecialViewComponent } from './special/report/report-special-view/report-special-view.component';
import { ReportSpecialPrintComponent } from './special/report/report-special-print/report-special-print.component';
import { ReportMultiPrintComponent } from './report-multi-print/report-multi-print.component';
import { ReportMultiPrintViewComponent } from './report-multi-print-view/report-multi-print-view.component';
import { PmReportEngineerViewComponent } from './engineer/pm/pm-report-engineer-view/pm-report-engineer-view.component';
import { PmReportEngineerPrintComponent } from './engineer/pm/pm-report-engineer-print/pm-report-engineer-print.component';
import { PmReportSpecialViewComponent } from './special/pm/pm-report-special-view/pm-report-special-view.component';
import { PmReportSpecialPrintComponent } from './special/pm/pm-report-special-print/pm-report-special-print.component';
import { LibrarySearchComponent } from './library-search/library-search.component';
import { TableReportComponent } from './library-search/table/table-report/table-report.component';
import { TableReportPmComponent } from './library-search/table/table-report-pm/table-report-pm.component';

let items = [
  SubTitleComponent,
  TitleComponent,

]

@NgModule({
  declarations: [
    ...items,
    SignaturePadComponent,
    BottomSheetEngComponent,
    ReportEngineerViewComponent,
    ReportEngineerPrintComponent,
    AutoCompleteComponent,
    ReportSpecialViewComponent,
    ReportSpecialPrintComponent,
    ReportMultiPrintComponent,
    ReportMultiPrintViewComponent,
    PmReportEngineerViewComponent,
    PmReportEngineerPrintComponent,
    PmReportSpecialViewComponent,
    PmReportSpecialPrintComponent,
    LibrarySearchComponent,
    TableReportComponent,
    TableReportPmComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports:[
    ...items,
    SignaturePadComponent,
    BottomSheetEngComponent,
    ReportEngineerViewComponent,
    ReportEngineerPrintComponent,
    AutoCompleteComponent,
    ReportSpecialViewComponent,
    ReportSpecialPrintComponent,
    ReportMultiPrintComponent,
    ReportMultiPrintViewComponent,
    PmReportEngineerViewComponent,
    PmReportEngineerPrintComponent,
    PmReportSpecialViewComponent,
    PmReportSpecialPrintComponent,
    LibrarySearchComponent
  ]
})
export class SharedModule { }
