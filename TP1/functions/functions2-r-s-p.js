let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("paper");
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playGame("scissors");
});

addEventListener("keyup", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  } else if (event.key === " ") {
    console.log(score);
  }
});

/*
  Add an event listener
  if the user presses the key r => play rock
  if the user presses the key p => play paper
  if the user presses the key s => play scissors
  */

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";

  if (playerMove === computerMove) {
    result = "tie";
    score.ties += 1;
  } else if (
    (playerMove === "rock" && computerMove === "scissors") ||
    (playerMove === "scissors" && computerMove === "paper") ||
    (playerMove === "paper" && computerMove === "rock")
  ) {
    result = "win";
    score.wins += 1;
  } else {
    result = "loss";
    score.losses += 1;
  }

  document.querySelector(".result").innerHTML = `Result : ${result}`;

  updateScoreElement();
  updateImages(playerMove, computerMove);

  // calculate result
  // update the score and store it using localStorage.setItem
  // show the new score and the updated images using "document.querySelector"
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }

  return computerMove;
}

function updateImages(playerMove, computerMove) {

  const moves = document.querySelector(".js-moves");
  moves.innerHTML = `<img src="images/${playerMove}-emoji.png" class="move-icon"><img src="images/${computerMove}-emoji.png" class="move-icon">`;
  
}
