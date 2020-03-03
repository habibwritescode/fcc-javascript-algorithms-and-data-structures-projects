// INSTRUCTIONS

// Palindrome Checker

// Return true if the given string is a palindrome. Otherwise, return false.
// A palindrome is a word or sentence that's spelled the same way both forward and backward, ignoring punctuation, 
// case, and spacing.

// Note
//You'll need to remove all non-alphanumeric characters (punctuation, spaces and symbols) and turn everything into 
// the same case (lower or upper case) in order to check for palindromes.
// We'll pass strings with varying formats, such as "racecar", "RaceCar", and "race CAR" among others.
// We'll also pass strings with special symbols, such as "2A3*3a2", "2A3 3a2", and "2_A3*3#A2".


// SOLUTION

function palindrome(str) {
    // Good luck!
    // My code
    // Write a regex for all non-alphanumeric characters (punctuation, spaces and symbols).
    let removeRegex = /[\W|_]+/g;
    // Use the above regex in a replace() method to target all non-alphanumeric characters and remove them by 
    // replacing them with an empty string.
    let newStr = str.replace(removeRegex, '');
    // Change the string, now free of non-alphanumeric characters, to lowercase.
    newStr = newStr.toLowerCase();
    // Use a for loop to reverse the string.
    let reverseStr = '';
    for (let i = newStr.length - 1; i >= 0; i--) {
        reverseStr += newStr[i];
    }
    // Check if the string is spelled the same way both forward (newStr) and backward (reverseStr).
    if (newStr == reverseStr) {
        return true;
    }
    return false;
    // My code
}

// Test here
palindrome("eye"); // should return true
palindrome("A man, a plan, a canal. Panama") // should return true
palindrome("0_0 (: /-\ :) 0-0") // should return true
palindrome("My age is 0, 0 si ega ym.") // should return true
palindrome("five|\_/|four") // should return false