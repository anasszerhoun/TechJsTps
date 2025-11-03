const express = require("express");
const books = require("./book");
const main = require("./db");
const mongoose = require("mongoose");
const users = require("./user");
const inquirer = require("inquirer").default;
const readline = require("readline");
const { checkUser , addUser } = require("./user");

const app = express();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
function askQuestion(query) {
    return new Promise((resolve) => {
      rl.question(query, (answer) => resolve(answer));
    });
  }
  

main();

app.listen(8080, () => {
  console.log("Server Running On https://localhost:8080");
});

function menu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "Choisisez une option:",
        choices: ["Login", "Register", "Exit"],
      },
    ])
    .then(async (answers) => {
        console.log('\n ==================== ')
      if(answers.choice === "Login"){
        login()
      }else if(answers.choice === "Register"){
        register()
      }else if(answers.choice === "Exit"){
        console.log("Bye Bye")
        process.exit(0)
      }
    });
}
async function login(){
    inquirer.prompt([
        {type:'input' , name:'username',message : 'Entrez votre username : '},
        {type:'input' , name:'password',message : 'Entrez votre password : '}
    ]).then(async (answers)=>{
        if(await checkUser(answers.username,answers.password)){
            console.log("Login valide ")
        }
    })
  

}
async function register(){
 

    const answers = await inquirer.prompt([
        { type: 'input', name: 'username', message: "Entrez votre nom d'utilisateur:" },
        { type: 'password', name: 'password', message: "Entrez votre mot de passe:", mask: '*' }
      ]);
    
      if (await addUser(answers.username, answers.password)) {
        console.log("User added successfully");
        menu()
      } else {
        console.log("User not added");
      }
}
menu() 
app.use(express.json());
app.use("/books", books);
app.use("/users", users.router);
