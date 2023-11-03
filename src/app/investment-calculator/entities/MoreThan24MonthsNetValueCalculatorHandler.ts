import { Investment } from "./Investment";
import { NetValueCalculatorHandler } from "./NetValueCalculatorHandler";

export class More24MonthsNetValueCalculatorHandler extends NetValueCalculatorHandler {
  TAX = 15 / 100;

  getTax(): number {
    return this.TAX;
  }

  calculate(investment: Investment, deadlineInMonths: number): number {
    const grossAmount = investment.calculateGrossAmount(deadlineInMonths);
    if (deadlineInMonths > 24) {
      return this.calculateNetValue(grossAmount);
    }
    if (!this.next) throw new Error("end of chain");
    return this.next.calculate(investment, grossAmount);
  }
}
