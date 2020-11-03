// set title, cause why not
document.querySelector("title").textContent = "Guess the Number!";

// define heading
const Heading = document.createElement("h1");

// define buttons
const buttonEasy = document.createElement("button");
buttonEasy.textContent = "Easy (1-3)"
buttonEasy.id = "Easy"

const buttonMedium = document.createElement("button");
buttonMedium.textContent = "Medium (1-5)"
buttonMedium.id = "Medium"

const buttonHard = document.createElement("button");
buttonHard.textContent = "Hard (1-10)"
buttonHard.id = "Hard"

// define button div
const buttonDiv = document.createElement("div");
buttonDiv.id = "button-div"

// append heading
document.querySelector("body").appendChild(Heading);

// append button div
document.querySelector("body").appendChild(buttonDiv);

// define form for user input
const formParagraph = document.createElement("p");
let formValue = "<form> <input type='text' id='guess-input'> <input type='submit' value='Submit' id='guess-submit'> </form>"

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

// add button event listener
document.querySelector("#button-div").addEventListener("click", InitGame); 

Init()

function Init() // create buttons and heading
{
    Heading.textContent = "Select your difficulty"

    document.querySelector("#button-div").appendChild(buttonEasy);
    document.querySelector("#button-div").appendChild(buttonMedium);
    document.querySelector("#button-div").appendChild(buttonHard);
}

function InitGame(e)
{
    
      id = e.target.id;
      difficulty = id;
  
      
          switch(id) {
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
    Heading.textContent = `You've chosen the ${difficulty} difficulty. Please enter a number between ${rangeStart} and ${rangeEnd}`;
    
    // remove buttons
    buttonEasy.remove();
    buttonMedium.remove();
    buttonHard.remove();

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
    Heading.textContent = `Impressive! The generated number was indeed ${generatedNum}!`;
  }
  else
  {
    Heading.textContent = `Too bad! The generated number was ${generatedNum}!`;
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
