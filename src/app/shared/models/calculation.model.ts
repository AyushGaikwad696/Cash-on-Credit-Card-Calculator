export interface CalculatorFormValue {
  amount: number;
  customerPercent: number;
  companyPercent: number;
  transactionFee: number;
}

export interface CalculationResult {
  baseAmount: number;
  extraAmount: number;
  totalCustomerPays: number;
  companyShare: number;
  transactionFee: number;
  amountSentToCustomer: number;
  agentProfit: number;
}
