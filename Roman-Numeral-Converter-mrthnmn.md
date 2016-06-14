# Algorithm Roman Numeral Converter

### Problem Explanation:

- You will create a program that converts an integer to a Roman Numeral.

## Hint: 1

- Creating two arrays, one with the Roman Numerals and one with the decimal equivalent for the new forms will be very helpful.

## Hint: 2

- If you add the numbers to the arrays that go before the new letter is introduced, like values for 4, 9, and 40, it will save you plenty of code.

## Hint: 3

- You can't have more than three consecutive Roman numerals together.

## Spoiler Alert!

![687474703a2f2f7777772e796f75726472756d2e636f6d2f796f75726472756d2f696d616765732f323030372f31302f31302f7265645f7761726e696e675f7369676e5f322e676966.gif](https://files.gitter.im/FreeCodeCamp/Wiki/nlOm/thumb/687474703a2f2f7777772e796f75726472756d2e636f6d2f796f75726472756d2f696d616765732f323030372f31302f31302f7265645f7761726e696e675f7369676e5f322e676966.gif)

**Solution ahead!**

## First Solution:

```javascript
var convertToRoman = function(num) {

  // Create arrays with default conversion with matching indices.
  var decimalValue = [ 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 ];
  var romanNumeral = [ 'M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I' ];

  //empty string variable for the final roman number

  var romanized = '';

  // Loop through the indices of the decimalValue array.
  for (var index = 0; index < decimalValue.length; index++) {
    // Continue to loop while the value at the current index will fit into numCopy
    while (decimalValue[index] <= num) {
      // Add the Roman numeral & decrease numCopy by the decimal equivalent.
      romanized += romanNumeral[index];
      num -= decimalValue[index];
    }
  }

  return romanized;
}

// test here
convertToRoman(36);
```

:rocket: [Run Code](https://repl.it/CLmf/0)

## Code Explanation:

- Read comments on code.

## Second Solution:

```javascript
function convertToRoman(num) {
 var romans = ["I", "V", "X", "L", "C", "D", "M"],
     ints = [],
     romanNumber = [],
     numeral = "";
  while (num) {
    // Make an array of the digits
    ints.push(num % 10);
    num = Math.floor(num/10);
  }
    // Loop through the array of digits
  for (i=0; i<ints.length; i++){
      units(ints[i]);
  }
  function units(){
    // As you loop through the digits array (base 10)
    // the roman numeral (one for each 5) skips every other one.
    numeral = romans[i*2];
    // Push the numerals (backwards) onto the romanNumber array.
    switch(ints[i]) {
      case 1:
        romanNumber.push(numeral);
        break;
        case 2:
        romanNumber.push(numeral.concat(numeral));
        break;
      case 3:
        romanNumber.push(numeral.concat(numeral).concat(numeral));
        break;
      case 4:
        romanNumber.push(numeral.concat(romans[(i*2)+1]));
        break;
      case 5:
        romanNumber.push(romans[(i*2)+1]);
        break;
      case 6:
        romanNumber.push(romans[(i*2)+1].concat(numeral));
        break;
      case 7:
        romanNumber.push(romans[(i*2)+1].concat(numeral).concat(numeral));
        break;
      case 8:
        romanNumber.push(romans[(i*2)+1].concat(numeral).concat(numeral).concat(numeral));
        break;
      case 9:
        romanNumber.push(romans[i*2].concat(romans[(i*2)+2]));
        break;
      }
    }

  // reverse the romanNumber array and turn it into a string.
  return romanNumber.reverse().join("").toString();
}

// test here
convertToRoman(97);
```

:rocket: [Run Code](https://repl.it/C1YV)

## Code Explanation:

- Read comments on code.

## Credits:

If you found this page useful, you can give thanks by copying and pasting this on the main chat: **`Thanks @Rafase282 @SaintPeter @benschac @mrthnmn for your help with Algorithm: Roman Numeral Converter`**

> **NOTE:** Please add your username only if you have added any **relevant main contents** to the wiki page. (Please don't remove any existing usernames.)
