import { NetValueCalculatorHandler } from './NetValueCalculatorHandler';

export class Investment {
  TB = 108 / 100;
  CDI = 0.9 / 100;

  constructor(
    readonly initialValue: number,
    readonly netValueCalculatorHandler: NetValueCalculatorHandler
  ) {}

  calculateGrossAmount(deadlineInMonths: number) {
    return this.initialValue * (1 + this.CDI * this.TB * deadlineInMonths);
  }

  calculateNetValue(deadlineInMonths: number) {
    return this.netValueCalculatorHandler.calculate(
      this.calculateGrossAmount(deadlineInMonths),
      deadlineInMonths
    );
  }
}
