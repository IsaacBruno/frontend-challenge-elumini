import { NetValueCalculatorHandler } from './NetValueCalculatorHandler';

export class UpTo12MonthsNetValueCalculatorHandler extends NetValueCalculatorHandler {
  TAX = 20 / 100;

  getTax(): number {
    return this.TAX;
  }

  calculate(grossAmount: number, deadlineInMonths: number): number {
    if (deadlineInMonths > 6 && deadlineInMonths <= 12) {
      return this.calculateNetValue(grossAmount);
    }
    if (!this.next) throw new Error('end of chain');
    return this.next.calculate(grossAmount, deadlineInMonths);
  }
}
