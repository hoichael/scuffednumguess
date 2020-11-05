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

document.querySelector("#btn-play").addEventListener("click", difficultySelect);

document.querySelector("#btn-history").addEventListener("click", historyPage);

Init();

function Init() // create buttons and heading
{    
    if(!localStorage.getItem("iterations")) {
        localStorage.setItem("iterations", -1);
    }

    showMenuButtons();
    hideDifficultyButtons();
    hideHistory();
    // hideMenuButtons();
    hideResetButton();
    // showButtons();
    setHeading("Main Menu");
    // setHeading("Select your difficulty");
    hideGuessInput();
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
    }

    const generatedNum = Math.floor(Math.random() * rangeEnd + rangeStart);

    console.log("game() start");
    setHeading(`You've chosen the ${difficulty} difficulty. Please enter a number between ${rangeStart} and ${rangeEnd}`);

    hideDifficultyButtons();

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
            conclude(actualInput, generatedNum, difficulty);
        }
    };
}

function currentDate()
{
    let now = new Date();
    let date = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate();
    let time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    let fullDateTime = date+' '+time;
    return fullDateTime;
}

function conclude(guess, generatedNum, difficulty)
{
    hideGuessInput();
    showResetButton();

    let info = {
        Date: currentDate(),
        Difficulty: difficulty,
        YourGuess: guess,
        GeneratedNumber : generatedNum
    }
    
    if(generatedNum === guess)
    {
        setHeading(`Impressive! The generated number was indeed ${generatedNum}!`);
    }
    else
    {
        setHeading(`Too bad! The generated number was ${generatedNum}!`);
    }

    localStorage.setItem("iterations", parseInt(localStorage.getItem("iterations")) +1);
    localStorage.setItem(localStorage.getItem("iterations"), JSON.stringify(info));
    console.log(info);
}


function genTableHead(table, data) {
    
    if(!document.querySelector("th"))
    {
        let tableHead = table.createTHead();
        let tableRow = tableHead.insertRow();
    
        for (let key of data) {
            let th = document.createElement("th");
            let text = document.createTextNode(key);
            th.appendChild(text);
            tableRow.appendChild(th);
        }
    }
}

function popTable(table, data) {

    let tableRows = table.querySelectorAll("tr");
    for (let i = 0; i < tableRows.length; i++) {
        tableRows[i].remove();
    }

    for (let element of data) {

        let row = table.insertRow();
        if (element.YourGuess == element.GeneratedNumber) {
            row.id = "green";
        }
        else {
            row.id = "red";
        }
        
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
      }
    }
  }

function historyPage() {
    setHeading("History");
    showHistory();
    hideMenuButtons();
    showResetButton();

    let localStorageObjects = [];

    for (let i = 0; i < localStorage.length; i++) {
        if(localStorage[i] !== undefined) {
            let temp = JSON.parse(localStorage[i]);
            localStorageObjects.push(temp);
        }      
    }
    
    localStorageObjects.reverse();

    let table = document.querySelector("#history-table");
    popTable(table, localStorageObjects);
    genTableHead(table, Object.keys(localStorageObjects[0]));
}

function difficultySelect() {
    setHeading("Select your Difficulty");
    showDifficultyButtons();
    hideMenuButtons();
    showResetButton();
}

function setHeading(newHeading) {
    document.querySelector("#heading").innerText = newHeading;
}

function showDifficultyButtons() {
    document.querySelectorAll(".init-btn")
        .forEach(function(btn) {
            btn.classList.remove("hide");
        });
}

function hideDifficultyButtons() {
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

function hideHistory() {
    document.querySelector("#history-table").classList.add("hide");
}

function showHistory() {
    document.querySelector("#history-table").classList.remove("hide");
}

function hideMenuButtons() {
    document.querySelector("#main-menu").classList.add("hide");
}

function showMenuButtons() {
    document.querySelector("#main-menu").classList.remove("hide");
}