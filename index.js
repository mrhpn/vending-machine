"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
// available drinks
var Drink;
(function (Drink) {
    Drink["CocaCola"] = "Coca Cola";
    Drink["Pepsi"] = "Pepsi";
    Drink["Orange"] = "Orange";
})(Drink || (Drink = {}));
// prices for drinks
var drinkPrices = (_a = {},
    _a[Drink.CocaCola] = 3.35,
    _a[Drink.Pepsi] = 2.1,
    _a[Drink.Orange] = 2.85,
    _a);
var purchaseHistory = [];
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// prompt and validate money insertion
function insertMoney() {
    var validMoneyOptions = [5, 10, 15, 20];
    return new Promise(function (resolve) {
        rl.question('Please insert money: Accepted values are 5$, 10$, 15$, and 20$. ', function (input) {
            var insertedMoney = parseFloat(input);
            if (validMoneyOptions.includes(insertedMoney)) {
                resolve({ amount: insertedMoney, valid: true });
            }
            else {
                console.error('Invalid amount. Please insert a valid value (5$, 10$, 15$, 20$).');
                resolve(insertMoney()); // retry
            }
        });
    });
}
// prompt and validate drink selection
function selectDrink() {
    var availableDrinks = Object.values(Drink);
    return new Promise(function (resolve) {
        rl.question("Select a drink:\n".concat(availableDrinks
            .map(function (drink, index) {
            return "".concat(index + 1, ". ").concat(drink, " \u2014 $").concat(drinkPrices[drink].toFixed(2));
        })
            .join('\n'), " \n"), function (selection) {
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
                    console.error('Invalid selection. Please enter a valid number (1, 2, or 3).');
                    resolve(selectDrink()); // retry
            }
        });
    });
}
// check if the user has enough money to purchase a drink
function hasEnoughMoney(userMoney, selectedDrink) {
    var price = drinkPrices[selectedDrink];
    return userMoney.amount >= price;
}
// handle the purchase process and display results
function purchaseDrink() {
    return __awaiter(this, arguments, void 0, function (userMoney, isSecondPurchase) {
        var insertedMoney, userInsertedMoney, selectedDrink, change, response, additionalMoney, totalMoney;
        if (userMoney === void 0) { userMoney = { amount: 0, valid: false }; }
        if (isSecondPurchase === void 0) { isSecondPurchase = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    insertedMoney = userMoney.amount;
                    if (!(!isSecondPurchase || insertedMoney <= 0)) return [3 /*break*/, 2];
                    return [4 /*yield*/, insertMoney()];
                case 1:
                    userInsertedMoney = _a.sent();
                    insertedMoney = userInsertedMoney.amount;
                    _a.label = 2;
                case 2: return [4 /*yield*/, selectDrink()];
                case 3:
                    selectedDrink = _a.sent();
                    if (!hasEnoughMoney({ amount: insertedMoney, valid: true }, selectedDrink)) return [3 /*break*/, 4];
                    change = insertedMoney - drinkPrices[selectedDrink];
                    console.log("You have successfully purchased ".concat(selectedDrink, "!"));
                    if (change > 0) {
                        console.log("Your change is $".concat(change.toFixed(2), "."));
                    }
                    purchaseHistory.push("".concat(selectedDrink, " - $").concat(drinkPrices[selectedDrink], " (Change: $").concat(change.toFixed(2), ")")); // add to purchase history
                    askForAnotherPurchase(change); // ask if user wants another purchase
                    return [3 /*break*/, 8];
                case 4:
                    console.log('You don’t have enough money for this drink. Please insert more money or end the process.');
                    return [4 /*yield*/, askToInsertMoreMoneyOrEnd()];
                case 5:
                    response = _a.sent();
                    if (!(response === 'i')) return [3 /*break*/, 7];
                    return [4 /*yield*/, insertMoney()];
                case 6:
                    additionalMoney = _a.sent();
                    totalMoney = insertedMoney + additionalMoney.amount;
                    purchaseDrink({ amount: totalMoney, valid: true }, true); // ask for more money and proceed
                    return [3 /*break*/, 8];
                case 7:
                    showPurchaseHistory(); // show purchase history
                    rl.close(); // end the process
                    _a.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
// ask if the user wants to purchase another drink or end the process
function askForAnotherPurchase(previousChange) {
    return __awaiter(this, void 0, void 0, function () {
        var cheapestDrink, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cheapestDrink = Math.min.apply(Math, Object.values(drinkPrices));
                    if (!(previousChange >= cheapestDrink)) return [3 /*break*/, 2];
                    console.log("You have $".concat(previousChange.toFixed(2), " left. You can select another drink."));
                    return [4 /*yield*/, askIfPurchaseAnotherDrink()];
                case 1:
                    response = _a.sent();
                    if (response === 'y') {
                        purchaseDrink({ amount: previousChange, valid: true }, true); // continue without re-inserting money
                    }
                    else {
                        showPurchaseHistory(); // show purchase history and end
                        rl.close();
                    }
                    return [3 /*break*/, 4];
                case 2:
                    console.log("You only have $".concat(previousChange.toFixed(2), " left, which is not enough for the cheapest drink."));
                    return [4 /*yield*/, askToInsertMoreMoneyOrEnd()];
                case 3:
                    response = _a.sent();
                    if (response === 'i') {
                        purchaseDrink({ amount: previousChange, valid: true }, true); // ask to insert more money
                    }
                    else {
                        showPurchaseHistory(); // show purchase history
                        rl.close(); // end the process
                    }
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
// ask if the user wants to insert more money or end the process
function askToInsertMoreMoneyOrEnd() {
    return new Promise(function (resolve) {
        rl.question('Do you want to insert more money or end the process? (i/e): ', function (response) {
            if (response.toLowerCase() === 'i') {
                resolve('i');
            }
            else if (response.toLowerCase() === 'e') {
                resolve('e');
            }
            else {
                console.error('Invalid input. Please type "i" or "e".');
                resolve(askToInsertMoreMoneyOrEnd());
            }
        });
    });
}
// ask if the user wants to purchase another drink
function askIfPurchaseAnotherDrink() {
    return new Promise(function (resolve) {
        rl.question('Would you like to purchase another drink? (y/n): ', function (response) {
            if (response.toLowerCase() === 'y' || response.toLowerCase() === 'n') {
                resolve(response.toLowerCase());
            }
            else {
                console.error('Invalid input. Please answer "y" or "n".');
                resolve(askIfPurchaseAnotherDrink());
            }
        });
    });
}
// show the purchase history
function showPurchaseHistory() {
    console.log('\n--- Purchase History ---');
    if (purchaseHistory.length > 0) {
        purchaseHistory.forEach(function (purchase, index) {
            console.log("".concat(index + 1, ". ").concat(purchase));
        });
    }
    else {
        console.log('No purchases made.');
    }
}
// Start the vending machine process
purchaseDrink();
