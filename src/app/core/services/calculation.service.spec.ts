import { TestBed } from '@angular/core/testing';

import { CalculationService } from './calculation.service';

describe('CalculationService', () => {
  let service: CalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculationService);
  });

  it('should calculate all amounts correctly', () => {
    expect(
      service.calculate({
        amount: 2500,
        customerPercent: 4,
        companyPercent: 1.3,
        transactionFee: 15
      })
    ).toEqual({
      baseAmount: 2500,
      extraAmount: 100,
      totalCustomerPays: 2600,
      companyShare: 32.5,
      transactionFee: 15,
      amountSentToCustomer: 2400,
      agentProfit: 52.5
    });
  });

  it('should calculate when the entered amount must be sent exactly to the customer', () => {
    const result = service.calculateForExactCustomerAmount({
      amount: 2500,
      customerPercent: 4,
      companyPercent: 1.3,
      transactionFee: 15
    });

    expect(result.baseAmount).toBeCloseTo(2604.17, 2);
    expect(result.extraAmount).toBeCloseTo(104.17, 2);
    expect(result.totalCustomerPays).toBeCloseTo(2708.33, 2);
    expect(result.companyShare).toBeCloseTo(33.85, 2);
    expect(result.transactionFee).toBe(15);
    expect(result.amountSentToCustomer).toBe(2500);
    expect(result.agentProfit).toBeCloseTo(55.31, 2);
  });
});
