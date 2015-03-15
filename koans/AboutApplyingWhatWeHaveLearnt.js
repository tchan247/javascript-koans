var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = products.filter(function(x) {
                        return !x.containsNuts
                                && x.ingredients.every(
                                        function(y) {return y !== "mushrooms";}
                                );
                        }
                )

      expect(productsICanEat.length).toBe(1);

  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = _.chain(_.range(3,1000))
		.reduce(function(a, b) {if(b % 3 === 0 || b % 5 === 0) return a + b
				else return a;
			}, 0)
		.value();

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
	
	_.chain(products)
		.map(function(x) {return x.ingredients})
		.flatten()
		.reduce(function(a, b) {ingredientCount[b] = (ingredientCount[b] || 0) + 1}, 0);

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {

  	var findLargestPrimeFactor = function(n) {
		if(n === 3) return 2; // special case

		// search for prime counting down
		for(var i = n-1; i > 2; i--) {
			isPrime = true;
			for(var j = i-1; j > 2 && isPrime; j--) {
				if(i % j === 0) {
					isPrime = false;
				}
			}
			if(isPrime) return i;
		}

		return -1; // prime not found
	};

	expect(findLargestPrimeFactor(53)).toBe(47);	
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

	var largestThreeDigitProductPalindrome = function() {
		var palindromes = [];

		// test all numbers from 100-999
		for(var i=999; i > 99; i--) {
			for(var j=999; j > 99; j--) {
				var str = String(i * j);

				// push number to array if product is palindrome
				if(str === str.split('').reverse().join('')) palindromes.push(str - 0);
			}
		}

		return Math.max.apply(this, palindromes); // get largest number in palindromes array
	}

	expect(largestThreeDigitProductPalindrome()).toBe(906609);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      
	var smallestNumberDivisibleConsecutive = function(a, b) {
		var i = b;
		while(i++) {	// increment i "forever"
			var divisible = true;

			// check i with each number in range
			for(var j=b; j >= a && divisible; j--) {
				if(i % j !== 0) divisible = false;
			}

			if(divisible) return i;
		}
	}

	expect(smallestNumberDivisibleConsecutive(1, 20)).toBe(232792560); // be careful - keep the number range small
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {

	var sumSquareDifference = function(x, y) {
		return Math.abs((x * x + y * y) - Math.pow(x + y, 2));
	}

	expect(sumSquareDifference(9, 10)).toBe(180);    
  });

  it("should find the 10001st prime", function () {

	var findNthPrime = function(n) {

		if(n === 1) return 2;	// special case
		if(n < 1) return -1;

		var count = 1, i=3;
		
		// check for primes
		do {
			var isPrime = true;
                        for(var j=3; j<i/2 && isPrime; j+=2) {
                                if(i % j === 0) isPrime = false;
                        }

                        if(isPrime) count++;
                        if(count ===  n) return i;
		} while(i+=2);	// check odd numbers
		
	}

	expect(findNthPrime(10001)).toBe(104743);
  });
  
});
