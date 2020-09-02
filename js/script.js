// 1. Doms and variables define
// 2. All the functions
// 3. Event Listeners and function calls


//////////////////////////////////////////////////////    DOMS / VARIABLES   //////////////////////////////////////////////////////

let fetchInputRadio = document.querySelectorAll("input[type='radio']");
let fetchInputName = document.getElementById('inputName');
fetchInputName.style.margin = 'auto';
fetchInputName.style.width = '60%';
fetchInputName.style.color = 'darkgreen';
fetchInputName.classList.add('text-center');
fetchInputName.style.width = '50%';
fetchInputName.style.borderRadius = '20px';
fetchInputName.style.height = '40px';
fetchInputName.style.fontSize = '30px';


let fetchGameTable = document.getElementById('gridDiv');
let form = document.getElementById('form');
let time = document.getElementById('timer');

let moves = document.getElementById('moves');
let btnStartGame = document.getElementById('button');
// let inputCreate = document.createElement('input');
let btnTable = document.querySelectorAll("button[name='tableButtons']");
let imgArray = [];
let openedCards = 0;
let flippedCards = [];
let flippedCardsId = [];
let countTime = 0;
let countMoves = 0;
let timer = null;
let playerStorageSet = [];

//////////////////////////////////////////////////////    DOMS / VARIABLES   //////////////////////////////////////////////////////




//////////////////////////////////////////////////////    FUNCTIONS   //////////////////////////////////////////////////////

// let startScreenWelcome = () => {
//     let fetchGameTable = document.getElementById('gridDiv');
//     let fetchGrid = document.getElementById('welcome');
//     let fetchP = document.getElementById('welcomeP');
//     let name = localStorage.getItem('currentUser');
//     // fetchGameTable.innerHTML = '';
//     fetchGrid.innerHTML = '';
//     fetchGrid.style.border = '2px solid darkcyan';
//     fetchP.classList.add('text-info')
//     fetchP.innerHTML = `WELCOME <br>`;
//     fetchP.innerHTML += `<span style="color: orangered; filter: opacity(100%);">${name.toUpperCase()}</span>`;
//     fetchP.style.margin = 'auto';
//     fetchP.style.fontSize = '60px';
//     fetchGrid.appendChild(fetchP);
// }

// get existing localstorage array
// function checks for 
let getLocalStorage = (diff) => {
    // if localstorage is empty, print out borders only for visual
    if (!localStorage.getItem(`${diff}`)) {
        let tblBody = document.getElementById('tbody');
        tblBody.innerHTML = '';
        let tblRow = document.createElement("tr");
        tblRow.style.height = '50px';
        let tblData1 = document.createElement("td");
        let tblData2 = document.createElement("td");
        let tblData3 = document.createElement("td");
        let tblData4 = document.createElement("td");

        tblRow.appendChild(tblData1);
        tblRow.appendChild(tblData2);
        tblRow.appendChild(tblData3);
        tblRow.appendChild(tblData4);

        tblBody.appendChild(tblRow);
    } else {
        // else print out table
        let tblBody = document.getElementById('tbody');
        tblBody.innerHTML = '';
        let countRows = 0;
        let difficultyArray = JSON.parse(localStorage.getItem(`${diff}`));
        difficultyArray.sort((a, b) => parseFloat(a.time) - parseFloat(b.time));
        let newArray = difficultyArray.slice(0, 5);

        for (let i = 0; i < newArray.length; i++) {
            countRows++;
            let tblRow = document.createElement("tr");
            let username = newArray[i].username;
            time = Array[i].time;
            let movesCount = newArray[i].moves;
            
            let tblData1 = document.createElement("td");
            let tblData2 = document.createElement("td");
            let tblData3 = document.createElement("td");
            let tblData4 = document.createElement("td");
            let td1 = document.createTextNode(`${countRows}`);
            let td2 = document.createTextNode(`${username.toUpperCase()}`);
            let td3 = document.createTextNode(`${secToMin(time)}`);
            let td4 = document.createTextNode(`${movesCount}`);

            tblData1.appendChild(td1);
            tblData2.appendChild(td2);
            tblData3.appendChild(td3);
            tblData4.appendChild(td4);

            tblRow.appendChild(tblData1);
            tblRow.appendChild(tblData2);
            tblRow.appendChild(tblData3);
            tblRow.appendChild(tblData4);

            tblBody.appendChild(tblRow);
        }
    }
}

// Depending on level, set new array to localstorage with a key corresponding to the id of difficulty button
// function called only when game is finished
let setTableStorage = (diff) => {

    let currentPlayer = localStorage.getItem('currentUser');
    // get all the data inside of an object
    let player = {
        username: currentPlayer,
        time: countTime,
        difficulty: inputChecked(fetchInputRadio),
        moves: countMoves
    }
    // check to see if key already exists
    // if not, set new one with current player settings
    if (!localStorage.getItem(`${diff}`)) {
        playerStorageSet.push(player);
        localStorage.setItem(`${diff}`, JSON.stringify(playerStorageSet));
    } else {
        // if exists,fetch the array
        // let getPlayers = JSON.parse(localStorage.getItem(`${diff}`));
        let getPlayers = JSON.parse(localStorage.getItem(`${diff}`));
        getPlayers.sort((a, b) => parseFloat(a.time) - parseFloat(b.time));

        for (let i = 0; i < getPlayers.length; i++) {
            let highestTime = getPlayers[0].time;
            if (highestTime < getPlayers[i].time) {
                highestTime = getPlayers[i].time;
            }
        }
        if (getPlayers.length > 4) {
            if (player.time < highestTime) {
                getPlayers.pop();
                getPlayers.push(player)
            }
        } else {
            getPlayers.push(player);
        }

        getPlayers.sort((a, b) => parseFloat(a.time) - parseFloat(b.time));

        localStorage.setItem(`${diff}`, JSON.stringify(getPlayers));
    }
}
// check cards for matching
// forbid more than two cards opened at all times
// function does all the work 
// removes css,checks validity, restores previous settings
let checkCards = (card) => {
    // check if only two cards are opened at a time
    if (flippedCards.length < 2) {
        // flip the card if flippedCards array is explicitly less then 2
        card.classList.toggle('flipped');
        // push first card into array
        if (flippedCards.length === 0) {
            // input card
            flippedCards.push(card.dataset.id);
            flippedCardsId.push(card.id);
            // push second card and check if match
        } else if (flippedCards.length === 1) {
            countMoves++;
            // print out how many moves
            startGameMoves();
            flippedCards.push(card.dataset.id);
            flippedCardsId.push(card.id);
            // check if cards match
            if (flippedCards[0] === flippedCards[1]) {
                // push 2 cards for evaluation if game is finished
                openedCards += 2;
                // empty array for storing flipped cards
                flippedCards = [];
                flippedCardsId = [];
                // check if total number of opened cards match the array for storing cards 
                if (openedCards === imgArray.length) {
                    // console.log('goodbye');
                    // after game is finished
                    // clear interval
                    clearInterval(timer);
                    // push player info to local storage
                    setTableStorage(inputChecked(fetchInputRadio));
                    // delay 500 ms and reload if confirmed
                    // else leave the game in state when finished
                    setTimeout(() => {
                        let answer = confirm("Play new game?");
                        if (answer) {
                            // location.reload();
                            resetBoard();
                            setTimeout(() => {
                                getBoard();
                            }, 200);
                        }
                    }, 500);

                }
            } else {
                // if flipped cards do not match
                // close them and reset styles
                function closeCard() {
                    let card1 = document.getElementById(`${flippedCardsId[0]}`);
                    let card2 = document.getElementById(`${flippedCardsId[1]}`);
                    if (card1.classList.contains('flipped')) {
                        card1.classList.toggle('flipped');
                    }
                    if (card2.classList.contains('flipped')) {
                        card2.classList.toggle('flipped');
                    }
                    // empty array for storing flipped cards
                    flippedCards = [];
                    flippedCardsId = [];
                }

                setTimeout(closeCard, 700);
            }
        }
    }
}

// check if name is input
// if() push name to local storage
let saveNameStorage = (name) => {
    let inputName = name.value;
    if (!inputName || inputName === "") {
        alert("Please enter name to continue");
    } else {
        localStorage.setItem('currentUser', inputName);
        return localStorage.getItem('currentUser').toUpperCase();
    }
}
// print out the board
let getBoard = () => {
    // check to see which level 
    // getlevelvalue returns number as value
    getLevelValue(fetchInputRadio);
    // square returned level value
    let count = getLevelValue(fetchInputRadio) ** 2;
    // push as many images as the value of count
    pushImgArray(count);
    // shuffle content in array
    shuffleArray(imgArray);
    // set basic css for background
    // fetchGameTable.style.backgroundImage = "url('/images/background.png')"; 
    fetchGameTable.style.border = '2px solid darkcyan';
    // fetchGameTable.style.padding = '5px';
    fetchGameTable.style.margin = '0px auto';
    fetchGameTable.style.borderRadius = '30px';
    fetchGameTable.classList.add('justify-content-around');

    // loop trough array
    for (let i = 0; i < imgArray.length; i++) {
        // set cards' DOM
        let divCard = document.createElement('div');
        let imgFront = document.createElement('img');
        let imgBack = document.createElement('img');
        // let screenSize = window.matchMedia("(max-width: 960px)");
        // set board size depending on count variable(difficulty level)
        if (count === 16) {
            let mq = window.matchMedia( "(max-width: 960px)" );
            if (mq.matches) {
                fetchGameTable.style.width = '100%';
                divCard.style.width = '20%';
                divCard.style.height = '20%';
            } else {
                fetchGameTable.style.width = '60%';
                divCard.style.width = '20%';
            }
        } else if (count === 36) {
            let ma = window.matchMedia( "(max-width: 960px)" );
            if (ma.matches) {
                fetchGameTable.style.width = '100%';
                divCard.style.width = '14%';
                divCard.style.height = '14%';
            } else {
                fetchGameTable.style.width = '60%';
                divCard.style.width = '15%';
            }

        } else if (count === 64) {
            ms = window.matchMedia( "(max-width: 960px)" );
            if (ms.matches) {
                fetchGameTable.style.width = '100%';
                divCard.style.width = '11%';
                divCard.style.height = '11%';
                divCard.style.padding = '1px';
            } else {
                fetchGameTable.style.width = '70%';
                divCard.style.width = '11%';
            }
        } else {
            ms = window.matchMedia( "(max-width: 960px)" );
            if (ms.matches) {
                fetchGameTable.style.width = '100%';
                divCard.style.width = '9.5%';
                divCard.style.height = '9.5%';
                divCard.style.padding = '1px';
            } else {
                fetchGameTable.style.width = '80%';
                divCard.style.width = '9%';
            }
        }
            

        // set cards css

        divCard.classList.add('divCard');
        // divCard.classList.add('col-2');
        // divCard.classList.add('justify-content-around');

        imgFront.classList.add('imgFront');
        imgFront.setAttribute('src', `images/${imgArray[i]}.png`);

        imgBack.classList.add('imgback');
        imgBack.setAttribute('id', i);
        imgBack.setAttribute('data-id', `data_${imgArray[i]}`);
        imgBack.setAttribute('src', 'images/closedCard.png');

        // append cards to the game table
        divCard.appendChild(imgFront);
        divCard.appendChild(imgBack);
        fetchGameTable.appendChild(divCard);

        // add event listener to each card
        // first click is only click
        // adds game timer
        // sets current name to localstorage
        divCard.addEventListener('click', () => {
            startGameTimer();
            saveNameStorage(fetchInputName);
            // localStorage.setItem('currentUser', inputCreate.value);
        });
        // event lister on foreground image
        // calls function that checks the cards
        imgBack.addEventListener('click', function () {
            checkCards(this);
        });
    }
}
// simple func to print game moves
let startGameMoves = () => {
    moves.innerHTML = `Moves: `;
    moves.style.color = 'cyan';
    moves.innerHTML += countMoves;
}

// Push number of images into array depending on which level ** 2
let pushImgArray = (count) => {
    for (let i = 1; i <= count / 2; i++) {
        for (let j = 1; j <= 2; j++) {
            imgArray.push(i);
        }
    }
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
let shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
// rather than reloading page
// reset all the settings to how they were when game started
let resetBoard = () => {
    fetchGameTable.innerHTML = '';
    fetchGameTable.style = 'none';
    let allDivs = document.querySelectorAll('div');
    for (let i = 0; i < allDivs.length; i++) {
        if(allDivs[i].classList.contains('flipped')) {
            allDivs[i].classList.remove('flipped');
        }
    }
    clearInterval(timer);
    countTime = 0;
    time.style.color = 'cyan';
    time.style.fontSize = '20px';
    time.innerHTML = 'Time: ';
    moves.style.color = 'cyan';
    moves.style.fontSize = '20px';
    moves.innerHTML = 'Moves: '
    imgArray = [];
    openedCards = 0;
    timer = null;
    countMoves = 0;
}
// transform seconds to minutes for score table
let secToMin = (par) => {
    let mins = Math.floor(par / 60);
    let sec = par % 60;
    if (mins === 0) {
        return `${sec} sec`;
    } else {
        return `${mins} min : ${sec} sec`;
    }
}
// checks which radio button is checked
// returns id of the button
// id corrseponds to the difficulty level
// called only when storing player info to localstorage
let inputChecked = (array) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i].checked) {
            return array[i].id;
        }
    }
}
// returns number value of radio button checked
let getLevelValue = (array) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i].checked) {
            return Number(array[i].value);
        }
    }
};
// start the game timer
// called on first click of the game
// print out results
let startGameTimer = () => {
    if (timer === null) {
        timer = setInterval(() => {
            countTime++;
            time.style.color = 'cyan';
            time.style.borderRadius = '20px';
            time.innerHTML = 'Time: ';
            time.innerHTML += countTime;
        }, 1000);
    }
    return countTime;
}

// disable input field on form submit
function disableForm(boolean) {
    fetchInputName.disabled = boolean;
    // btnSubmitName.disabled = boolean;
}
//////////////////////////////////////////////////////    FUNCTIONS   //////////////////////////////////////////////////////




//////////////////////////////////////////////////////    FUNCTION CALLS  //////////////////////////////////////////////////////

// table always printed
getLocalStorage(inputChecked(fetchInputRadio));

let ms = window.matchMedia( "(max-width: 960px)" );
if(ms.matches) {
    let hardFetch = document.getElementById('hard');
    let expertFetch = document.getElementById('expert');
    hardFetch.disabled = true;
    expertFetch.disabled = true;
}
// score buttons css
// applies css only if clicked
// when other button is clicked,previous loses classs and therefore css
for (let i = 0; i < btnTable.length; i++) {
    btnTable[i].addEventListener('click', () => {
        getLocalStorage(btnTable[i].id);
        btnTable[i].classList.toggle('clicked');
        btnTable[i].classList.add('btn-outline-dark');
        if(btnTable[i].classList.contains('clicked')) {
            btnTable[i].classList.remove('btn-outline-dark');
            btnTable[i].classList.toggle('clicked');
        } 
    })
}
// window.onload = getBoard();
//////////////////////////////////////////////////////    FUNCTION CALLS  //////////////////////////////////////////////////////


//////////////////////////////////////////////////////    EVENT LISTENERS   //////////////////////////////////////////////////////

// event listener on enter
// replace original input field with new one
// created by fetching name from localStorage
form.addEventListener('submit', event => {
    event.preventDefault();
    // checks if input field is empty
    // if empty, do nothing and throw alert from previusly called function that stores names
    if (fetchInputName.value === '' || fetchInputName.value === null) {
        return;
    } else {
        disableForm(true);
        resetBoard();
        // startScreenWelcome();
    }

});

// start new game
btnStartGame.addEventListener('click', () => {
    // dont start game if input field is empty
    if (fetchInputName.value === '' || fetchInputName.value === null) {
        alert("Please enter your name to continue");
    } else {
        // if game already finished
        // reset the board
        disableForm(false);
        resetBoard();
        // delay 500 ms after button click
        setTimeout(() => {
            getBoard();
        });
        // move window to give focus on game table
        // usefull for bigger tables
        // wait when clicked 
        setTimeout(() => {
            window.location.href = '#gridDiv';
        },500);
    }
});

//////////////////////////////////////////////////////    EVENT LISTENERS   //////////////////////////////////////////////////////


// Known bugs
// Fixed 1. Fix infinite array.length inside of localstorage
// Fixed 2. Fix input replacing
// Fixed 3. Fix fetchGrid error on name change when game starts
//      - if name changes - reset board
// 4. Add reset button to the table to reset table
// 5. Fix icons size on hard and expert level
