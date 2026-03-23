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
- Result summary for:
  - Extra amount customer pays
  - Total amount customer pays
  - Company share
  - Transaction fee
  - Amount agent will send to customer
  - Agent profit after deductions
- Reset button
- Responsive layout

## Business Logic

Given:

- `amount` = transaction amount
- `customerPercent` = percentage charged to customer
- `companyPercent` = percentage charged by company
- `transactionFee` = editable fixed fee

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

This project was structured to keep business logic inside the calculation service and keep the component focused on UI and form handling.
