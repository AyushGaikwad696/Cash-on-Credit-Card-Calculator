import { Injectable } from '@angular/core';

import {
  CalculationResult,
  CalculatorFormValue
} from '../../shared/models/calculation.model';

/**
 * Service responsible for performing financial calculations related to credit card transactions.
 * Handles both standard charge calculations and exact payout scenarios.
 */
@Injectable({
  providedIn: 'root'
})
export class CalculationService {
  /**
   * Calculates the standard charge breakdown based on the provided transaction parameters.
   * @param formValue - The form values containing transaction amount, percentages, and fees
   * @returns CalculationResult containing all calculated financial values
   */
  calculate({
    amount,
    customerPercent,
    companyPercent,
    transactionFee
  }: CalculatorFormValue): CalculationResult {
    return this.buildCalculationResult({
      baseAmount: amount,
      customerPercent,
      companyPercent,
      transactionFee
    });
  }

  /**
   * Calculates the exact payout breakdown where the customer receives a specific amount.
   * When customerPercent is 100% or more, the customer receives the full amount with no extra charge.
   * @param formValue - The form values containing transaction amount, percentages, and fees
   * @returns CalculationResult containing all calculated financial values for exact payout scenario
   */
  calculateForExactCustomerAmount({
    amount,
    customerPercent,
    companyPercent,
    transactionFee
  }: CalculatorFormValue): CalculationResult {
    // Guard clause: When customerPercent is 100% or more, the customer receives the full amount
    // with no extra charge, so baseAmount equals the amount itself
    // This check MUST happen before any division to avoid division by zero
    if (customerPercent >= 100) {
      return this.buildCalculationResult({
        baseAmount: amount,
        customerPercent,
        companyPercent,
        transactionFee,
        exactAmountSentToCustomer: amount
      });
    }

    // Calculate the base amount needed to send the exact amount to customer
    // Formula: baseAmount = amount / (1 - customerPercent/100)
    const customerChargeMultiplier = 1 - customerPercent / 100;
    const baseAmount = amount / customerChargeMultiplier;

    return this.buildCalculationResult({
      baseAmount,
      customerPercent,
      companyPercent,
      transactionFee,
      exactAmountSentToCustomer: amount
    });
  }

  /**
   * Builds the complete calculation result with all financial breakdowns.
   * @param params - Object containing base amount, percentages, fees, and optional exact amount
   * @returns CalculationResult with all calculated values
   */
  private buildCalculationResult({
    baseAmount,
    customerPercent,
    companyPercent,
    transactionFee,
    exactAmountSentToCustomer
  }: {
    baseAmount: number;
    customerPercent: number;
    companyPercent: number;
    transactionFee: number;
    exactAmountSentToCustomer?: number;
  }): CalculationResult {
    const extraAmount = (baseAmount * customerPercent) / 100;
    const totalCustomerPays = baseAmount + extraAmount;
    const companyShare = (baseAmount * companyPercent) / 100;
    const amountSentToCustomer =
      exactAmountSentToCustomer ?? baseAmount - extraAmount;
    const agentProfit = extraAmount - companyShare - transactionFee;

    return {
      baseAmount,
      extraAmount,
      totalCustomerPays,
      companyShare,
      transactionFee,
      amountSentToCustomer,
      agentProfit
    };
  }
}
