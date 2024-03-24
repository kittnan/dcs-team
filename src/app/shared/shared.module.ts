import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubTitleComponent } from './sub-title/sub-title.component';
import { TitleComponent } from './title/title.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { SignaturePadComponent } from './signature-pad/signature-pad.component';
import { BottomSheetEngComponent } from './bottom-sheet-eng/bottom-sheet-eng.component';
import { ReportEngineerViewComponent } from './report-engineer-view/report-engineer-view.component';
import { ReportEngineerPrintComponent } from './report-engineer-print/report-engineer-print.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { ReportSpecialViewComponent } from './report-special-view/report-special-view.component';
import { ReportSpecialPrintComponent } from './report-special-print/report-special-print.component';

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
    ReportSpecialPrintComponent
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
    ReportSpecialPrintComponent
  ]
})
export class SharedModule { }
