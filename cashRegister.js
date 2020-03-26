// INSTRUCTIONS

// Cash Register

// Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price),
// payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.
// cid is a 2D array listing available currency.
// The checkCashRegister() function should always return an object with a status key and a change key.
// Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, 
// or if you cannot return the exact change.
// Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is 
// equal to the change due.
// Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, 
// sorted in highest to lowest order, as the value of the change key.

// Currency Unit	Amount
// Penny	$0.01 (PENNY)
// Nickel	$0.05 (NICKEL)
// Dime	$0.1 (DIME)
// Quarter	$0.25 (QUARTER)
// Dollar	$1 (DOLLAR)
// Five Dollars	$5 (FIVE)
// Ten Dollars	$10 (TEN)
// Twenty Dollars	$20 (TWENTY)
// One-hundred Dollars	$100 (ONE HUNDRED)
// See below for an example of a cash-in-drawer array:

/*[
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]*/


// SOLUTION

function checkCashRegister(price, cash, cid) {
    // My code
    // Create an object to meet the requirement:
    // "The checkCashRegister() function should always return an object with a status key and a change key".
    let result = {
        status: '',
        change: ''
    };

    // Find the total amount of cash in drawer.
    let totalCid = 0;
    for (let i = 0; i < cid.length; i++) {
        totalCid += cid[i][1];
    }
    // .toFixed(2) changes the total to 2 decimal places and helps us avoid floating point number issues.
    totalCid = totalCid.toFixed(2);

    let totalChangeDue = cash - price;

    // Create an array showing the value of the currency denomiantions available in the drawer.
    // ["PENNY", "NICKEL", "DIME", "QUARTER", "ONE", "FIVE", "TEN", "TWENTY", "ONE HUNDRED",]
    let denominations = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];


    // Handle obvious insufficient funds.
    if (totalCid < totalChangeDue) {
        result.status = 'INSUFFICIENT_FUNDS';
        result.change = [];
        // Handle exact change.
    } else if (totalChangeDue == totalCid) {
        result.status = 'CLOSED';
        result.change = cid;
    }
    // Handle cases where cash in drawer is more than the change due.
    else if (totalCid > totalChangeDue) {
        // Initialize an empty array to store the amount of change gotten from a particular bill or coin.
        let resultArr = [];
        // Loop through the denominations array.
        for (let i = denominations.length - 1; i >= 0; i--) {
            // While there is still money of this type in the drawer.
            // And while the denomination is lesser than the change remaining.
            while (cid[i][1] > 0 && denominations[i] <= totalChangeDue) {
                // If the amount of this denomination available in the drawer is lesser than the change due,
                // push it to resultArr as the change gotten from that note or coin.
                if (cid[i][1] <= totalChangeDue) {
                    resultArr.push([cid[i][0], cid[i][1]]);
                    // Subtract the current change gotten from total change so as to get the remaining change.
                    totalChangeDue -= cid[i][1];
                    totalChangeDue = totalChangeDue.toFixed(3);
                }
                // If the amount of this denomination available in the drawer is greater than the change due.
                else if (cid[i][1] > totalChangeDue) {
                    // Calculate as much change that can be gotten from one type of bill or coin.
                    let change = Math.floor(totalChangeDue / denominations[i]) * denominations[i];
                    // We push it to resultArr as the change gotten from that note or coin.
                    resultArr.push([cid[i][0], change]);
                    // Subtract the current change gotten from total change so as to get the remaining change.
                    totalChangeDue -= change;
                    totalChangeDue = totalChangeDue.toFixed(3)
                }
                // After getting as much change as possible from a particular we change it's value to zero.
                // This helps to meet a condition in our while loop and also helps to move to the next bill or coin.
                cid[i][1] = 0
            }
        }
        result.status = 'OPEN';
        result.change = resultArr;
    }

    // This checks for the case where there is enough money in the drawer, but the exact change can't be provided
    // because some bills or coins are not available.
    // After the change has been calculated from the above (case where cash in drawer is greater than change due),
    // loop through the change property in our result object and find the total change.
    let total = 0;
    for (let i = 0; i < result.change.length; i++) {
        total += result.change[i][1]
    }
    // If this total change is not the actual total change due, we change the value of result object as required.
    if (total < totalChangeDue) {
        result.status = 'INSUFFICIENT_FUNDS';
        result.change = [];
    }

    // Finally, we return our result object that shows the status of the drawer and the change, if any.
    return result;
    // My code
}


// TEST HERE
checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90],
["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
// should return {status: "OPEN", change: [["QUARTER", 0.5]]}.

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90],
["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
// should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], 
// ["DIME", 0.2], ["PENNY", 0.04]]}.

checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0],
["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
// should return {status: "INSUFFICIENT_FUNDS", change: []}.

checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0],
["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
// should return {status: "INSUFFICIENT_FUNDS", change: []}.

checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0],
["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
// should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0],
// ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.