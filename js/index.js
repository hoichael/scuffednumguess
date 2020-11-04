// set title, cause why not
document.querySelector("title").textContent = "Guess the Number!";

// add button event listeners
const buttons = document.querySelectorAll(".init-btn");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function(e) {
        Game(e.target.getAttribute("data-difficulty"));
    });
}

// set reset button event listener
document.querySelector("#reset-btn").addEventListener("click", Init);

Init();

function Init() // create buttons and heading
{
    hideResetButton();
    showButtons();
    setHeading("Select your difficulty");
}

function Game(difficulty)
{
    let rangeStart = 1;
    let rangeEnd;

    switch (difficulty) {
        case "Easy":
            console.log("selected easy");
            rangeEnd = 3;
            break;
        case "Medium":
            console.log("selected medium");
            rangeEnd = 5;
            break;
        case "Hard":
            console.log("selected hard");
            rangeEnd = 10;
            break;
        default:
            console.error("something's fucked or, most likely, clicked on empty space");
    }

    const generatedNum = Math.floor(Math.random() * rangeEnd + rangeStart);

    console.log("game() start");
    setHeading(`You've chosen the ${difficulty} difficulty. Please enter a number between ${rangeStart} and ${rangeEnd}`);

    hideButtons();

    showGuessInput();

    const guessInput = document.querySelector("#guess-input");
    const guessSubmit = document.querySelector("#guess-submit");

    guessSubmit.onclick = function() {
        const actualInput = parseInt(guessInput.value);
        if(!actualInput)
        {
            console.log("INVALID (empty)");
            alert("Invalid Input. Please enter a whole number within the expected range")
        }
        else if(actualInput < rangeStart || actualInput > rangeEnd)
        {
            console.log("INVALID (out of range)");
            alert("Invalid Input. Please enter a whole number within the expected range");
        }
        else
        {
            console.log("init result()");
            CheckResult(actualInput, generatedNum);
        }
    };
}

function CheckResult(guess, generatedNum)
{
    if(generatedNum === guess)
    {
        setHeading(`Impressive! The generated number was indeed ${generatedNum}!`);
    }
    else
    {
        setHeading(`Too bad! The generated number was ${generatedNum}!`);
    }

    hideGuessInput();
    showResetButton();
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

function showGuessInput() {
    document.querySelector("#guess").classList.remove("hide");
}

function hideGuessInput() {
    document.querySelector("#guess").classList.add("hide");
}

function showResetButton() {
    document.querySelector("#reset-btn").classList.remove("hide");
}

function hideResetButton() {
    document.querySelector("#reset-btn").classList.add("hide");
}
