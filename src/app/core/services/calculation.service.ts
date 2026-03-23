import { Injectable } from '@angular/core';

import {
  CalculationResult,
  CalculatorFormValue
} from '../../shared/models/calculation.model';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {
  calculate({
    amount,
    customerPercent,
    companyPercent,
    transactionFee
  }: CalculatorFormValue): CalculationResult {
    const extraAmount = (amount * customerPercent) / 100;
    const totalCustomerPays = amount + extraAmount;
    const companyShare = (amount * companyPercent) / 100;
    const amountSentToCustomer = amount - extraAmount;
    const agentProfit = extraAmount - companyShare - transactionFee;

    return {
      extraAmount,
      totalCustomerPays,
      companyShare,
      transactionFee,
      amountSentToCustomer,
      agentProfit
    };
  }
}
