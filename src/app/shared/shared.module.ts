import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubTitleComponent } from './sub-title/sub-title.component';
import { TitleComponent } from './title/title.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';

let items = [
  SubTitleComponent,
  TitleComponent,

]

@NgModule({
  declarations: [
    ...items
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports:[
    ...items
  ]
})
export class SharedModule { }
