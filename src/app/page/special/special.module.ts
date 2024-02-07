import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialRoutingModule } from './special-routing.module';
import { SpecialComponent } from './special.component';


@NgModule({
  declarations: [
    SpecialComponent
  ],
  imports: [
    CommonModule,
    SpecialRoutingModule
  ]
})
export class SpecialModule { }
