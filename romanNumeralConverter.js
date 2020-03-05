// INSTRUCTIONS

// Roman Numeral Converter

// Convert the given number into a roman numeral. 
// All roman numerals answers should be provided in upper-case.


// SOLUTION

function convertToRoman(num) {
    // My code
    let romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM', 'M'];

    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

    let result = [];
    let thou, hund, tens, rem, rem2, rem3;

    if (numbers.indexOf(num) >= 0) {
        return romans[numbers.indexOf(num)]

    } else if (num < 100) {
        tens = Math.trunc(num / 10);
        rem = num % 10;
        result.push(romans[numbers.indexOf(tens * 10)], romans[numbers.indexOf(rem)]);
        return result.join('')

    } else if (num > 100 && num < 1000) {
        hund = Math.trunc(num / 100);
        rem = num % 100;
        tens = Math.trunc(rem / 10);
        rem2 = rem % 10;
        result.push(romans[numbers.indexOf(hund * 100)], romans[numbers.indexOf(tens * 10)], romans[numbers.indexOf(rem2)])
        return result.join('')

    } else {
        thou = Math.trunc(num / 1000);
        rem = num % 1000;
        if (rem > 10) {
            hund = Math.trunc(rem / 100);
            rem2 = rem % 100;
            tens = Math.trunc(rem2 / 10);
            rem3 = rem2 % 10;
        } else if (rem <= 10) {
            tens = Math.trunc(rem / 10);
            rem3 = rem % 10;
        }
        for (let i = 0; i < thou; i++) {
            result.push(romans[numbers.indexOf(1000)])
        }
        result.push(romans[numbers.indexOf(hund * 100)], romans[numbers.indexOf(tens * 10)], romans[numbers.indexOf(rem2)], romans[numbers.indexOf(rem3)])
        return result.join('')
    }
    // My code
}

// Test here
convertToRoman(9) // should return "IX".
convertToRoman(99) // should return "XCIX"
convertToRoman(501) // should return "DI"
convertToRoman(649) // should return "DCXLIX"
convertToRoman(798) // should return "DCCXCVIII"
convertToRoman(1006) // should return "MVI"
convertToRoman(1023) // should return "MXXIII"
convertToRoman(2014) // should return "MMXIV"
convertToRoman(3999) // should return "MMMCMXCIX"