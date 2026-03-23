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

type CalculatorFormGroup = FormGroup<{
  amount: FormControl<number | null>;
  customerPercent: FormControl<number | null>;
  transactionFee: FormControl<number | null>;
  companyPercent: FormControl<number | null>;
}>;

@Component({
  standalone: false,
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorComponent {
  readonly defaultCompanyPercentage = 1.3;
  readonly defaultTransactionFee = 15;

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

  result: CalculationResult | null = null;

  constructor(private readonly calculationService: CalculationService) {}

  calculateCharges(): void {
    if (this.calculatorForm.invalid) {
      this.calculatorForm.markAllAsTouched();
      return;
    }

    const formValue = this.calculatorForm.getRawValue();
    const payload: CalculatorFormValue = {
      amount: formValue.amount ?? 0,
      customerPercent: formValue.customerPercent ?? 0,
      transactionFee: formValue.transactionFee ?? this.defaultTransactionFee,
      companyPercent: formValue.companyPercent ?? this.defaultCompanyPercentage
    };

    this.result = this.calculationService.calculate(payload);
  }

  resetForm(): void {
    this.calculatorForm.reset({
      amount: null,
      customerPercent: null,
      transactionFee: this.defaultTransactionFee,
      companyPercent: this.defaultCompanyPercentage
    });
    this.calculatorForm.markAsPristine();
    this.calculatorForm.markAsUntouched();
    this.result = null;
  }

  get amountControl(): FormControl<number | null> {
    return this.calculatorForm.controls.amount;
  }

  get customerPercentControl(): FormControl<number | null> {
    return this.calculatorForm.controls.customerPercent;
  }

  get transactionFeeControl(): FormControl<number | null> {
    return this.calculatorForm.controls.transactionFee;
  }

  get companyPercentControl(): FormControl<number | null> {
    return this.calculatorForm.controls.companyPercent;
  }

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
