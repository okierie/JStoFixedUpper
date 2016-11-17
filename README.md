# JStoFixedUpper
Equalize the result of  Number.toFixed() in Javascript to the result of PHP's number_format()

Do you have problem when dealing with number or decimal in the client and server? Well, I do.
Server side validation is mandatory for me (and I'm sure for everyone too). I usually do the math in both side (client and server), and take the server side one to be saved to database.

I found that some functions in Javascript and PHP with similar result format do not generate the same result. For example, the result of javascript's ***Number***.`toFixed()` and the result of PHP's `number_format()` is a bit different.

### The Research
Take a look at this block of code (and try it):

``` PHP
// PHP's number_format()
$number = 123.4750;
$result = number_format($number,2);
echo $result;
// The $result is 123.48
```

and this one

``` Javascript
// Javascript's number.toFixed()
var number = 123.4750;
var result = number.toFixed(2);
echo $result;
// The $result is 123.47
```

You will see that the results are different.

PHP's number_format converts `123.4750` to `123.48`, it's going up. While, javascript's ***Number***`.toFixed()` converts `123.4750` to `123.47`, going down.

The result is affected by the third number-to-right, `50` (because we used `2` as decimal places). If we raise it to `51` or `50000001`, then javascript's ***Number***`.toFixed()` will return the same result with PHP's `number_format()`.

### How does this thing make matter?
This is really matter when you do the math with complex formulas and/or fixed calculation algorithms in your program. Since the javascript is client side and PHP is server side, the users of your program may be confused or not sure which calculation is correct. Users will see that the result in their web form is different with what they see after the form is submitted.

### How this fix works?
Pelase note, that **this fix overrides the** ***Number***`.toFixed()` method/function. The number passed to this function will be converted with traditional way. Take a look at the script:
``` javascript
Number.prototype.toFixed = function (dec){
	var angka	= this;
	var pembagi	= Math.pow(10,dec);
	var hasil	= Math.round(angka*pembagi)/pembagi;
	return hasil;
}
```
`angka` is the passed number, will be a dividend
`dec` is the number of decimal places
`pembagi` is a divisor of `angka`. It is generated by 10 pow `dec`. We nee it to determine the decimal places.

* The `angka` is multiplied by `pembagi`
* And, the result of that operation will be rounded, so the number is going up.
* Then the rounded result is going to devided by `pembagi`. It makes decimal places.
* Finally, we get the same result with PHP's `number_format()`.

### Conclusion
The fix overrides the original function. If you don't want the original function gone, back it up by assigning it into the other function, or do not name this fix function as the original name, make it something else. That will make the original function still exists and usable.

**Any critics, suggesstion, pulls, and issues are welcome!**

Thank  you! :)

okierie

