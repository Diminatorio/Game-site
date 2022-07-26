let foundDiv
let isFound
let chosenAttempts
const divPlita = {}
const square600 = document.querySelector('.square600')
let startedChosenGame = false 
createDivs()
const divsInFind = document.querySelectorAll('.square100')

function startGame1(){
    document.querySelector('.fullContent').style.display = 'none'
    document.querySelector('.firstGame').style.display = 'block'
    clearDivs()
}

function restartGame1() {
    if (!startedChosenGame){
        document.querySelector('.startPlita').style.background = 'rgb(88, 150, 175)'
        clearDivs()
        document.querySelector('#labelStartInterval').innerHTML = 'Гра іде'
        document.querySelector('#gameGoing').innerHTML = 'Гра іде'
    }
}

function colorizeButtonGameDivsOn () {
    document.querySelector('.startPlita').style.background = 'rgb(88, 150, 175)'
}

function colorizeButtonGameDivsOff () {
    if(!startedChosenGame){
        document.querySelector('.startPlita').style.background = 'rgb(124, 215, 252)';
    }
}

function endGameDivs() {
    document.querySelector('.fullContent').style.display = 'block'
    document.querySelector('.firstGame').style.display = 'none'
    document.querySelector('.startPlita').style.background = 'rgb(88, 150, 175)'
    document.querySelector('#labelStartInterval').innerHTML = 'Гра іде'
    document.querySelector('#gameGoing').innerHTML = 'Гра іде'
}


function randomInt(max) {
    return Math.floor(Math.random() * max);
}

function createDivs() {
    for (let i = 0;i<6;i++){
        divPlita['row'+i]=document.createElement('div');
        divPlita['row'+i].classList.add('row')
        for (let b = 0;b<6;b++) {
            divPlita['div'+i+b]=document.createElement('div');
            divPlita['div'+i+b].classList.add('square100','div'+i+b);
            divPlita['row'+i].appendChild(divPlita['div'+i+b]);
        }
        square600.appendChild(divPlita['row'+i])
    }
}


function clearDivs() {
    for (i = 0; i < divsInFind.length; i++) {
        divsInFind[i].style.background = 'none'
    }
    foundDiv = chooseDiv()
    isFound = false
    chosenAttempts = 10
    startedChosenGame = true
}


function checkColor (number){
    let div = foundDiv.slice(-2);
    if (number[0] == div[0]){
        if (Number(div[1])-Number(number[1])==1 || Number(div[1])-Number(number[1])==-1) {
            return 'yellow'
        } else if (Number(div[1])-Number(number[1])==-2 || Number(div[1])-Number(number[1])==2){
            return 'orange'
        } else {
            return false
        }
    } else if (number[1] == div[1]){
        if (Number(div[0])-Number(number[0])==1 || Number(div[0])-Number(number[0])==-1) {
            return 'yellow'
        } else if (Number(div[0])-Number(number[0])==-2 || Number(div[0])-Number(number[0])==2){
            return 'orange'
        } else {
            return false
        }
    } else if ((Number(div[0])-Number(number[0]) == 1 || Number(div[0])-Number(number[0]) == -1) && (Number(div[1])-Number(number[1]) == 1 || Number(div[1])-Number(number[1]) == -1)){
        return 'orange'
    } else{
        return false
    }
}

function ifChosen(ev){
    if (chosenAttempts && !isFound){
        if (ev.target.classList[1] == foundDiv) {
            
            ev.target.style.backgroundColor = 'green'
            isFound = true
        } else {
            const color = checkColor(ev.target.classList[1].slice(-2))
            if (color){
                ev.target.style.backgroundColor = color
            }else{
                ev.target.style.backgroundColor = 'red'
            }            
            chosenAttempts-=1
        }
    } if (!chosenAttempts || isFound) {
        if(isFound){
            document.querySelector('#gameGoing').innerHTML = 'Ви виграли!'
        } else if (!chosenAttempts){
            document.querySelector('#gameGoing').innerHTML = 'Програли!'
        }
        document.querySelector('.startPlita').style.background = 'rgb(124, 215, 252)'
        document.querySelector('#labelStartInterval').innerHTML = 'Почати спочатку'
        startedChosenGame = false
    }
    
}


function chooseDiv() {
    row = randomInt(6).toString();
    point = randomInt(6).toString();
    return 'div'+row+point
}