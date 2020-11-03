// set title, cause why not
document.querySelector("title").textContent = "Guess the Number!";

// define form for user input
const formParagraph = document.createElement("p");
const formValue = "<form> <input type='text' id='guess-input'> <input type='submit' value='Submit' id='guess-submit'> </form>"

// global variables
let id;
let difficulty;
let rangeStart = 1;
let rangeEnd;

let guessInput;
let guessSubmit;
let form;

let actualInput;

let generatedNum;

// add button event listeners
const buttons = document.querySelectorAll(".init-btn");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function(e) {
        InitGame(e.target.getAttribute("data-difficulty"));
    });
}

Init()

function Init() // create buttons and heading
{
    showButtons();

    setHeading("Select your difficulty");
}

function InitGame(diff)
{
    difficulty = diff;
    switch(diff) {
        case "Easy":
            console.log("selected easy");
            rangeEnd = 3;
            Game();
            break;
        case "Medium":
            console.log("selected medium");
            rangeEnd = 5;
            Game();
            break;
        case "Hard":
            console.log("selected hard");
            rangeEnd = 10;
            Game();
            break;
        default:
            console.log("something's fucked or, most likely, clicked on empty space");
            Init();
    }
}

function Game()
{
    console.log("game() start");
    setHeading(`You've chosen the ${difficulty} difficulty. Please enter a number between ${rangeStart} and ${rangeEnd}`);

    hideButtons();

    // append form
    document.querySelector("body").appendChild(formParagraph);
    document.querySelector("p").innerHTML = formValue;

    guessInput = document.querySelector("#guess-input");
    guessSubmit = document.querySelector("#guess-submit");
    form = document.querySelector("form");

    form.addEventListener("submit", function(e)
    {
        e.preventDefault();         
        actualInput = parseInt(guessInput.value);
        if(!actualInput)
        {
          console.log("INVALID (empty)");
          alert("Invalid Input. Please enter a whole number within the expected range")          
          /* invalid = true;
          Init();
          document.querySelector("p").remove(); */
        }
        else if(isNaN(actualInput))
        {
          console.log("INVALID (NaN)");
          alert("Invalid Input. Please enter a whole number within the expected range");
        }
        else if(actualInput < rangeStart || actualInput > rangeEnd)
        {
          console.log("INVALID (out of range)");
          alert("Invalid Input. Please enter a whole number within the expected range");          
        }
        else
        {
          console.log("init result()");
          document.querySelector("p").remove();
          Result();
        }
    }); 
}

function Result()
{
  generatedNum = Math.floor(Math.random() * rangeEnd + rangeStart);
  console.log(`generated number: ${generatedNum}, DEBUG! No cheeterino >:(`);

  if(generatedNum == actualInput)
  {
    setHeading(`Impressive! The generated number was indeed ${generatedNum}!`);
  }
  else
  {
    setHeading(`Too bad! The generated number was ${generatedNum}!`);
  }

  let buttonReset = document.createElement("button");
  buttonReset.textContent = "Back to difficulty select";
  document.querySelector("body").appendChild(buttonReset);

  buttonReset.addEventListener("click", function()
  {
    buttonReset.remove();
    Init();
  });
}

function setHeading(newHeading) {
    document.querySelector("#heading").innerText = newHeading;
}

function showButtons() {
    document.querySelectorAll(".init-btn")
        .forEach(function(btn) {
            btn.classList.remove("hide");
        });
}

function hideButtons() {
    document.querySelectorAll(".init-btn")
        .forEach(function(btn) {
            btn.classList.add("hide");
        });
}
