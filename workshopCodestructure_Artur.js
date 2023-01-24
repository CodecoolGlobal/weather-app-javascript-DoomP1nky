//Task 1
//write a function called greet, that prints "Hello"
//In the global scope, call the 'greet' func, like this: greet()

//Task 2
//Change the 'greet' function so that is takes one param called: name
//change the func body so that is prints....

function greet(name, printCount) {
  for (let i = 0; i < printCount; i++) {
    console.log(`Hello ${name}`);
  }
  //console.log(`Hello ${name}\n`.repeat(printCount));
}
greet('Beth', 5);


const numbers = [-3, 4, 9, 14];
const result = 3;
function double(number) {
  return number * 2;
}
console.log(double(result));

//const doubles = numbers.map(double); (double értéke egy függvény)
console.log(numbers.map(double));

function addStuff(str, num) {
  return (`${str + str}, ${num + num}`);
}
console.log(addStuff(3, 'hi'));


function doTwice(fn) {
  fn();
  fn();
}
doTwice(() => {
  console.log('It\'s an arrow function');
});
//addeventListener hasonlóképp működik

function repeat(fn, count) {
  for (let i = 0; i < count; i++) {
    fn();
  }
}
let index = 1;
repeat(() => {
  console.log('izgi', index);
  index++;
}, 3); //closer tud kívülről változót használni



