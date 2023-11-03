import { Investment } from './Investment';
import { More24MonthsNetValueCalculatorHandler } from './MoreThan24MonthsNetValueCalculatorHandler';
import { UpTo12MonthsNetValueCalculatorHandler } from './UpTo12MonthsNetValueCalculatorHandler';
import { UpTo24MonthsNetValueCalculatorHandler } from './UpTo24MonthsNetValueCalculatorHandler';
import { UpTo6MonthsNetValueCalculatorHandler } from './UpTo6MonthsNetValueCalculatorHandler';

describe('Investment', () => {
  let investment: Investment;
  const deadlineInMonths = 3;

  beforeEach(() => {
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
    investment = new Investment(10, upTo6MonthsNetValueCalculatorHandler);
  });

  describe('calculateGrossAmount()', () => {
    it('should calculate gross amount for 3 months', () => {
      expect(investment.calculateGrossAmount(deadlineInMonths)).toBe(10.2916);
    });
  });

  describe('calculateNetValue()', () => {
    it('should calculate net value for 3 months', () => {
      expect(
        Number(investment.calculateNetValue(deadlineInMonths).toFixed(4))
      ).toBe(7.976);
    });
  });
});
