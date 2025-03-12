# Vending Machine Simulation

This script simulates a simple vending machine that allows users to select
drinks, insert money, and make purchases. It provides a command-line interface
for interacting with the vending machine, handles money validation, and ensures
that users are prompted for additional money when they don't have enough funds
to make a purchase.

## Features

- Drink Selection: The user can choose from three available drinks: Coca Cola,
  Pepsi, and Orange.
- Money Insertion: The system prompts users to insert money in predefined
  denominations (5$, 10$, 15$, or 20$).
- Insufficient Funds Handling: If the user doesn’t have enough money to purchase
  a selected drink, they are prompted to either insert more money or end the
  process.
- Change Calculation: After a successful purchase, the system calculates and
  displays the change.
- Purchase History: Users can view the history of their purchases, including the
  drink chosen, the price, and the change.
- Recursive Purchasing: Users can continue to make purchases as long as they
  have enough money or opt to insert more money.

## Demo (Screenshots)

## ![screenshot-1](/demo/1.png)

![screenshot-2](/demo/2.png)

## How to run

Setup

```
git clone
```

```
npm i
```

Compile the code.

```
npx tsc index.ts
```

Run.

```
node index.js
```
