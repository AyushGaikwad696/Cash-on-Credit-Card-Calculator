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
        companyPercent: 1.3
      })
    ).toEqual({
      extraAmount: 100,
      totalCustomerPays: 2600,
      companyShare: 32.5,
      agentProfit: 67.5
    });
  });
});
