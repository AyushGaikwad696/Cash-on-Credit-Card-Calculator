# Cash on Credit Card Calculator

A clean Angular application for calculating charges in a cash-on-credit-card business model.

## Features

- Angular app with routing
- Reactive forms with validation
- Angular Material UI
- Editable inputs for:
  - Transaction Amount
  - Customer Percentage
  - Transaction Fee
  - Company Percentage
- **Two calculation scenarios:**
  - **Standard Charge Breakdown:** Shows how much the customer pays and what the agent receives
  - **Exact Payout Breakdown:** Calculates the exact amount needed to send a specific amount to the customer
- Result summary for each scenario:
  - Amount customer gives
  - Amount customer receives
  - Extra charge paid by customer
  - Company share
  - Transaction fee
  - Agent profit
- Reset button
- Responsive layout with mobile scrolling support
- Accessibility improvements (ARIA labels)

## Business Logic

Given:

- `amount` = transaction amount
- `customerPercent` = percentage charged to customer
- `companyPercent` = percentage charged by company
- `transactionFee` = editable fixed fee

### Standard Charge Calculation

Calculations:

- `extraAmount = (amount * customerPercent) / 100`
- `totalCustomerPays = amount + extraAmount`
- `companyShare = (amount * companyPercent) / 100`
- `amountSentToCustomer = amount - extraAmount`
- `agentProfit = extraAmount - companyShare - transactionFee`

Example:

- Transaction Amount: `50000`
- Customer Percentage: `2`
- Extra Amount: `1000`
- Amount Sent to Customer: `49000`

### Exact Payout Calculation

When you want to send a specific amount to the customer, this calculation determines how much the customer needs to pay:

- `baseAmount = amount / (1 - customerPercent/100)`
- `extraAmount = (baseAmount * customerPercent) / 100`
- `totalCustomerPays = baseAmount + extraAmount`
- `companyShare = (baseAmount * companyPercent) / 100`
- `amountSentToCustomer = amount` (exact amount specified)
- `agentProfit = extraAmount - companyShare - transactionFee`

Example:

- Desired Amount to Customer: `2500`
- Customer Percentage: `4`
- Base Amount: `2604.17`
- Extra Amount: `104.17`
- Total Customer Pays: `2708.33`
- Amount Sent to Customer: `2500`

## Tech Stack

- Angular
- TypeScript
- Angular Material
- Reactive Forms

## Project Structure

```text
src/
  app/
    core/
      services/
        calculation.service.ts
    features/
      calculator/
        calculator.component.ts
        calculator.component.html
        calculator.component.css
    shared/
      models/
        calculation.model.ts
```

## Getting Started

### Prerequisites

Use a modern Node.js version compatible with the current Angular stable release.

Recommended:

- Node.js `20.x` or `22.x`
- npm `10.x` or newer

### Install dependencies

```bash
npm install
```

### Run the project

```bash
npm start
```

or

```bash
npx ng serve
```

Then open:

```text
http://localhost:4200
```

## Validation Rules

- All fields are required
- Negative values are not allowed
- Calculate button stays disabled until the form is valid

## GitHub Setup

If this folder is not already a git repository:

```bash
git init
git add .
git commit -m "Initial commit"
```

Create a new empty GitHub repository, then connect and push:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cash-on-credit-card.git
git push -u origin main
```

If you use GitHub CLI:

```bash
gh repo create cash-on-credit-card --public --source=. --remote=origin --push
```

## Notes

This project was structured to keep business logic inside the calculation service and keep the component focused on UI and form handling. The application now supports two calculation scenarios to help agents understand both standard charges and exact payout requirements.
