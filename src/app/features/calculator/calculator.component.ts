import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { CalculationService } from '../../core/services/calculation.service';
import {
  CalculationResult,
  CalculatorFormValue
} from '../../shared/models/calculation.model';

/** Type definition for the calculator form group with typed controls */
type CalculatorFormGroup = FormGroup<{
  amount: FormControl<number | null>;
  customerPercent: FormControl<number | null>;
  transactionFee: FormControl<number | null>;
  companyPercent: FormControl<number | null>;
}>;

/**
 * Calculator component for credit card transaction calculations.
 * Provides a form to input transaction parameters and displays
 * both standard charge and exact payout breakdowns.
 */
@Component({
  standalone: false,
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorComponent {
  /** Default company percentage (1.3%) */
  readonly defaultCompanyPercentage = 1.3;

  /** Default transaction fee (15) */
  readonly defaultTransactionFee = 15;

  /** Reactive form for calculator inputs */
  readonly calculatorForm: CalculatorFormGroup = new FormGroup({
    amount: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0)]
    }),
    customerPercent: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0)]
    }),
    transactionFee: new FormControl<number | null>(this.defaultTransactionFee, {
      validators: [Validators.required, Validators.min(0)]
    }),
    companyPercent: new FormControl<number | null>(this.defaultCompanyPercentage, {
      validators: [Validators.required, Validators.min(0)]
    })
  });

  /** Result of standard charge calculation */
  standardChargeResult: CalculationResult | null = null;

  /** Result of exact payout calculation */
  exactPayoutResult: CalculationResult | null = null;

  constructor(private readonly calculationService: CalculationService) {}

  /**
   * Performs both standard charge and exact payout calculations
   * based on the current form values.
   * Marks all form controls as touched if the form is invalid.
   */
  calculateCharges(): void {
    if (this.calculatorForm.invalid) {
      this.calculatorForm.markAllAsTouched();
      return;
    }

    const formValue = this.calculatorForm.getRawValue();
    const calculationInput: CalculatorFormValue = {
      amount: formValue.amount ?? 0,
      customerPercent: formValue.customerPercent ?? 0,
      transactionFee: formValue.transactionFee ?? this.defaultTransactionFee,
      companyPercent: formValue.companyPercent ?? this.defaultCompanyPercentage
    };

    this.standardChargeResult = this.calculationService.calculate(calculationInput);
    this.exactPayoutResult =
      this.calculationService.calculateForExactCustomerAmount(calculationInput);
  }

  /**
   * Resets the form to its initial state with default values
   * and clears all calculation results.
   */
  resetForm(): void {
    this.calculatorForm.reset({
      amount: null,
      customerPercent: null,
      transactionFee: this.defaultTransactionFee,
      companyPercent: this.defaultCompanyPercentage
    });
    this.calculatorForm.markAsPristine();
    this.calculatorForm.markAsUntouched();
    this.standardChargeResult = null;
    this.exactPayoutResult = null;
  }

  /** Gets the amount form control */
  get amountControl(): FormControl<number | null> {
    return this.calculatorForm.controls.amount;
  }

  /** Gets the customer percentage form control */
  get customerPercentControl(): FormControl<number | null> {
    return this.calculatorForm.controls.customerPercent;
  }

  /** Gets the transaction fee form control */
  get transactionFeeControl(): FormControl<number | null> {
    return this.calculatorForm.controls.transactionFee;
  }

  /** Gets the company percentage form control */
  get companyPercentControl(): FormControl<number | null> {
    return this.calculatorForm.controls.companyPercent;
  }

  /**
   * Generates a user-friendly error message for a form control.
   * @param control - The form control to check for errors
   * @param label - The human-readable label for the field
   * @returns A descriptive error message string
   */
  getErrorMessage(
    control: FormControl<number | null>,
    label: string
  ): string {
    if (control.hasError('required')) {
      return `${label} is required.`;
    }

    if (control.hasError('min')) {
      return `${label} cannot be negative.`;
    }

    return `Enter a valid ${label.toLowerCase()}.`;
  }
}
