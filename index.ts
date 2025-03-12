import * as readline from 'readline';

// available drinks
enum Drink {
  CocaCola = 'Coca Cola',
  Pepsi = 'Pepsi',
  Orange = 'Orange',
}

// money inserted by the user
interface UserMoney {
  amount: number;
  valid: boolean;
}

// prices for drinks
const drinkPrices: Record<Drink, number> = {
  [Drink.CocaCola]: 3.35,
  [Drink.Pepsi]: 2.1,
  [Drink.Orange]: 2.85,
};

let purchaseHistory: string[] = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// prompt and validate money insertion
function insertMoney(): Promise<UserMoney> {
  const validMoneyOptions = [5, 10, 15, 20];

  return new Promise((resolve) => {
    rl.question(
      'Please insert money: Accepted values are 5$, 10$, 15$, and 20$. ',
      (input) => {
        const insertedMoney = parseFloat(input);

        if (validMoneyOptions.includes(insertedMoney)) {
          resolve({ amount: insertedMoney, valid: true });
        } else {
          console.error(
            'Invalid amount. Please insert a valid value (5$, 10$, 15$, 20$).'
          );
          resolve(insertMoney()); // retry
        }
      }
    );
  });
}

// prompt and validate drink selection
function selectDrink(): Promise<Drink> {
  const availableDrinks = Object.values(Drink);

  return new Promise((resolve) => {
    rl.question(
      `Select a drink:\n${availableDrinks
        .map(
          (drink, index) =>
            `${index + 1}. ${drink} — $${drinkPrices[drink].toFixed(2)}`
        )
        .join('\n')} \n`,
      (selection) => {
        switch (selection) {
          case '1':
            resolve(Drink.CocaCola);
            break;
          case '2':
            resolve(Drink.Pepsi);
            break;
          case '3':
            resolve(Drink.Orange);
            break;
          default:
            console.error(
              'Invalid selection. Please enter a valid number (1, 2, or 3).'
            );
            resolve(selectDrink()); // retry
        }
      }
    );
  });
}

// check if the user has enough money to purchase a drink
function hasEnoughMoney(userMoney: UserMoney, selectedDrink: Drink): boolean {
  const price = drinkPrices[selectedDrink];
  return userMoney.amount >= price;
}

// handle the purchase process and display results
async function purchaseDrink(
  userMoney: UserMoney = { amount: 0, valid: false },
  isSecondPurchase: boolean = false
): Promise<void> {
  let insertedMoney = userMoney.amount;

  // if it's not the second purchase and no money has been inserted, ask for money
  if (!isSecondPurchase || insertedMoney <= 0) {
    const userInsertedMoney = await insertMoney(); // get user money
    insertedMoney = userInsertedMoney.amount;
  }

  const selectedDrink = await selectDrink(); // get selected drink

  if (hasEnoughMoney({ amount: insertedMoney, valid: true }, selectedDrink)) {
    const change = insertedMoney - drinkPrices[selectedDrink];
    console.log(`You have successfully purchased ${selectedDrink}!`);

    if (change > 0) {
      console.log(`Your change is $${change.toFixed(2)}.`);
    }

    purchaseHistory.push(
      `${selectedDrink} - $${
        drinkPrices[selectedDrink]
      } (Change: $${change.toFixed(2)})`
    ); // add to purchase history
    askForAnotherPurchase(change); // ask if user wants another purchase
  } else {
    console.log(
      'You don’t have enough money for this drink. Please insert more money or end the process.'
    );
    const response = await askToInsertMoreMoneyOrEnd();

    if (response === 'i') {
      // prompt for more money and then check again
      const additionalMoney = await insertMoney();
      const totalMoney = insertedMoney + additionalMoney.amount;
      purchaseDrink({ amount: totalMoney, valid: true }, true); // ask for more money and proceed
    } else {
      showPurchaseHistory(); // show purchase history
      rl.close(); // end the process
    }
  }
}

// ask if the user wants to purchase another drink or end the process
async function askForAnotherPurchase(previousChange: number): Promise<void> {
  const cheapestDrink = Math.min(...Object.values(drinkPrices));
  let response: string;

  if (previousChange >= cheapestDrink) {
    console.log(
      `You have $${previousChange.toFixed(
        2
      )} left. You can select another drink.`
    );
    response = await askIfPurchaseAnotherDrink();

    if (response === 'y') {
      purchaseDrink({ amount: previousChange, valid: true }, true); // continue without re-inserting money
    } else {
      showPurchaseHistory(); // show purchase history and end
      rl.close();
    }
  } else {
    console.log(
      `You only have $${previousChange.toFixed(
        2
      )} left, which is not enough for the cheapest drink.`
    );
    response = await askToInsertMoreMoneyOrEnd();

    if (response === 'i') {
      purchaseDrink({ amount: previousChange, valid: true }, true); // ask to insert more money
    } else {
      showPurchaseHistory(); // show purchase history
      rl.close(); // end the process
    }
  }
}

// ask if the user wants to insert more money or end the process
function askToInsertMoreMoneyOrEnd(): Promise<string> {
  return new Promise((resolve) => {
    rl.question(
      'Do you want to insert more money or end the process? (i/e): ',
      (response) => {
        if (response.toLowerCase() === 'i') {
          resolve('i');
        } else if (response.toLowerCase() === 'e') {
          resolve('e');
        } else {
          console.error('Invalid input. Please type "i" or "e".');
          resolve(askToInsertMoreMoneyOrEnd());
        }
      }
    );
  });
}

// ask if the user wants to purchase another drink
function askIfPurchaseAnotherDrink(): Promise<string> {
  return new Promise((resolve) => {
    rl.question(
      'Would you like to purchase another drink? (y/n): ',
      (response) => {
        if (response.toLowerCase() === 'y' || response.toLowerCase() === 'n') {
          resolve(response.toLowerCase());
        } else {
          console.error('Invalid input. Please answer "y" or "n".');
          resolve(askIfPurchaseAnotherDrink());
        }
      }
    );
  });
}

// show the purchase history
function showPurchaseHistory(): void {
  console.log('\n--- Purchase History ---');
  if (purchaseHistory.length > 0) {
    purchaseHistory.forEach((purchase, index) => {
      console.log(`${index + 1}. ${purchase}`);
    });
  } else {
    console.log('No purchases made.');
  }
}

// Start the vending machine process
purchaseDrink();
