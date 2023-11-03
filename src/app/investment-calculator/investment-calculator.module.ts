import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestmentCalculatorComponent } from './investment-calculator.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [InvestmentCalculatorComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
  ],
  exports: [InvestmentCalculatorComponent],
})
export class InvestmentCalculatorModule {}
