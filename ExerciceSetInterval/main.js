// function setTime(){
//     setTimeout(() => {
//         console.log("hello")
//         setTime()
//     }, 2000);
// }
// setTime()


function setTime(){
    console.log("hello")
    setTimeout(setTime, 2000);
}
setTime()

