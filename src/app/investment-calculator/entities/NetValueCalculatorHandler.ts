export abstract class NetValueCalculatorHandler {
  abstract calculate(grossAmount: number, deadlineInMonths: number): number;
  abstract getTax(): number;

  constructor(readonly next?: NetValueCalculatorHandler) {}

  calculateNetValue(grossAmount: number) {
    return grossAmount * (1 - this.getTax());
  }
}
