import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { More24MonthsNetValueCalculatorHandler } from './entities/MoreThan24MonthsNetValueCalculatorHandler';
import { UpTo24MonthsNetValueCalculatorHandler } from './entities/UpTo24MonthsNetValueCalculatorHandler';
import { UpTo12MonthsNetValueCalculatorHandler } from './entities/UpTo12MonthsNetValueCalculatorHandler';
import { UpTo6MonthsNetValueCalculatorHandler } from './entities/UpTo6MonthsNetValueCalculatorHandler';
import { Investment } from './entities/Investment';

@Component({
  selector: 'investment-calculator',
  templateUrl: './investment-calculator.component.html',
  styleUrls: ['./investment-calculator.component.scss'],
})
export class InvestmentCalculatorComponent {
  calculatorForm: FormGroup;
  showResult = false;
  _grossAmount = 0;
  _netValue = 0;

  constructor(private _formBuilder: FormBuilder) {
    this.calculatorForm = this._formBuilder.group({
      monetaryValue: ['', Validators.required],
      deadlineInMonths: ['', Validators.required],
    });
  }

  get calculateFormControl() {
    return this.calculatorForm.controls;
  }

  onSubmit() {
    const { monetaryValue, deadlineInMonths } = this.calculatorForm.value;

    const moreThan24MonthsNetValueCalculatorHandler =
      new More24MonthsNetValueCalculatorHandler();
    const upTo24MonthsNetValueCalculatorHandler =
      new UpTo24MonthsNetValueCalculatorHandler(
        moreThan24MonthsNetValueCalculatorHandler
      );
    const upTo12MonthsNetValueCalculatorHandler =
      new UpTo12MonthsNetValueCalculatorHandler(
        upTo24MonthsNetValueCalculatorHandler
      );
    const upTo6MonthsNetValueCalculatorHandler =
      new UpTo6MonthsNetValueCalculatorHandler(
        upTo12MonthsNetValueCalculatorHandler
      );
    const investment = new Investment(
      monetaryValue,
      upTo6MonthsNetValueCalculatorHandler
    );
    this._grossAmount = investment.calculateGrossAmount(deadlineInMonths);
    this._netValue = investment.calculateNetValue(deadlineInMonths);
    this.showResult = true;
  }

  get grossAmount() {
    return Number(this._grossAmount).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  get netValue() {
    return Number(this._netValue).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
