import { Investment } from "./Investment";
import { NetValueCalculatorHandler } from "./NetValueCalculatorHandler";

export class UpTo24MonthsNetValueCalculatorHandler extends NetValueCalculatorHandler {
  TAX = 17.5 / 100;

  getTax(): number {
    return this.TAX;
  }

  calculate(investment: Investment, deadlineInMonths: number): number {
    const grossAmount = investment.calculateGrossAmount(deadlineInMonths);
    if (deadlineInMonths > 12 && deadlineInMonths <= 24) {
      return this.calculateNetValue(grossAmount);
    }
    if (!this.next) throw new Error("end of chain");
    return this.next.calculate(investment, grossAmount);
  }
}
