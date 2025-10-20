
//1
console.log("Program Started")

//2
const promise = new Promise((res,rej)=>{
    setTimeout(res,3000,"Step 1 complete")
})

//3
console.log(promise)

//4
console.log("Program in progress...")

//5
promise.then((val)=>{
    console.log(val)
    return new Promise((res,rej)=>{
        setTimeout(res,3000,"Step 2 Complete")
    })
}).then((val)=>{
    console.log(val)
})
