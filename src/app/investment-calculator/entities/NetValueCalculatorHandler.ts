import { Investment } from "./Investment";

export abstract class NetValueCalculatorHandler {
  abstract calculate(investment: Investment, deadlineInMonths: number): number;
  abstract getTax(): number;

  constructor(readonly next?: NetValueCalculatorHandler) {}

  calculateNetValue(grossAmount: number) {
    return grossAmount * (1 - this.getTax());
  }
}
