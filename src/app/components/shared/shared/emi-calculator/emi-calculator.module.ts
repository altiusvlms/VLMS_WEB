/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Custom Module */
import EmiCalculatorRoutingModule from './emi-calculator-routing.module';

/** Custom Material and Form Module */
import { SharedModule } from '../../../shared/shared/shared.module';

/** Custom Components */
import { EmiCalculatorComponent } from './emi-calculator.component';
import { Ng5SliderModule } from 'ng5-slider';






/** EMI Calculator Module */

@NgModule({
  declarations: [EmiCalculatorComponent],
  imports: [
    CommonModule,
    EmiCalculatorRoutingModule,
    SharedModule,
    Ng5SliderModule
  ]
})
export class EmiCalculatorModule { }
