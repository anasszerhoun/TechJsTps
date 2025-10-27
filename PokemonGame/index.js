#!/usr/bin/env node

const readline = require("readline");

const Pv = [
  {
    player: "Player 1",
    hp: 300,
  },
  {
    player: "Player 2",
    hp: 300,
  },
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}



async function Play() {
  const answer = await askQuestion(
    "\nPlayer 1 , Choisisez un pokemon :  "
  );

  const answer2 = await getComputerPokemon()

  console.log(`Player 1 : ${answer}` + `   Player 2 : ${answer2}`);

  var i = 1;


  while (Pv[0].hp > 0 && Pv[1].hp > 0) {


    console.log(`\n\n               ---------------------------- Tour ${i} ------------------------------\n\n`)


  //For player

    console.log("--------- Player Attack ------------\n\n")
    const moves = await getMovesByPokemonName(answer);

    console.log("--------- Moves\n")
    if(moves){
        moves.map(move=>console.log(move))
    }

    const answer3 = await askQuestion("\nPlayer 1 , Choisissez un move : ")

    const moveData = await getDataForMove(answer3);

    if(moveData){
        console.log('Power : '+moveData.power+' , Accuracy : '+moveData.accuracy)
    }

    
    Pv[1].hp -= moveData.power * (moveData.accuracy/100);


    //For Computer

    console.log("\n\n--------- Computer Attack -------------\n\n")
    const computerMoves = await getMovesByPokemonName(answer2)
    const randomNumber = Math.floor(Math.random() * 4) + 1;


    const computerMove = computerMoves[randomNumber]
    console.log("Computer Move : "+computerMove)

    const moveDataComputer = await getDataForMove(computerMove)

    if(moveDataComputer){
        console.log('Power : '+moveDataComputer.power+' , Accuracy : '+moveDataComputer.accuracy)
    }


    Pv[0].hp-=moveDataComputer.power*(moveData.accuracy/100)


    //Tour Result
    console.log(`\nPLAYER HP: ${Pv[0].hp > 0 ? Pv[0].hp : 0}` + ` ,  COMPUTER HP: ${Pv[1].hp > 0 ? Pv[1].hp : 0}`);

    i++

  }
  rl.close();

  if(Pv[0].hp>0){
      console.log('Player 1 wins');
  }else{
      console.log('Player 2 wins');
  }
}

Play();


async function getMovesByPokemonName(pokemonName){
    var moves = [];
    await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`,{method:"GET"})
    .then(async (res)=>{
        const pokemonData = await res.json()
        moves = pokemonData['moves'].slice(0,5).map(move=>move.move.name)
    }).catch((err)=>{
        console.log(`Moves not found for ${pokemonName}`)
    })
    return moves;
}
async function getDataForMove(moveName){
    var moveData = {}
   await fetch(`https://pokeapi.co/api/v2/move/${moveName}`,{method:"GET"})
   .then(async (res)=>{
    moveData = await res.json()
   }).catch((err)=>{
    console.log(`Data for ${moveName} Not found ! `)
   })
   return moveData;
}
async function getComputerPokemon(){
    var pokemon ;
    await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100/`)
    .then(async (res)=>{
        const pokemons = await res.json()
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        pokemon = pokemons.results[randomNumber].name
    })
    return pokemon
} 

