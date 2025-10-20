//1
console.log("Program Started");

//2
const promise = new Promise((res, rej) => {
  setTimeout(res, 3000);
  setTimeout(rej, 2000);
});

//3
console.log(promise);

//4
console.log("Program in progress...");

//5
promise
  .catch(() => {
    console.log("Program Failure");
  })
  .then(() => {
    console.log("Program complete");
  });
