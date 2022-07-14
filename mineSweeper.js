let bombCount = 100 * 0.2

let isBombGame = false
const divGlander = {}
const dictMineBombs = {}
const glanderField = document.querySelector('.glanderField')

let word
let flags = bombCount
createBombDivs()
appendBombs(bombCount);
checkBombs();
const bombSquare = document.querySelectorAll('.bombSquare');

function appendBombs(bombs){
    let i = 0
    while (i < bombs){
        i++
        let ok = true
        while (ok) {
            number = randomInt(10).toString()+randomInt(10).toString()
            if (dictMineBombs[number][0] != 'bomb'){
                dictMineBombs[number][0] = 'bomb'
                ok = false
            }
        }
        
    }
}

function checkBombWin() {
    let count = 0
    for (let i in dictMineBombs){
        if (dictMineBombs[i][1] == 1) {
            if (dictMineBombs[i][0]=='bomb'){
                return 'lose'
            }
        }
        if (dictMineBombs[i][1] == 0 && dictMineBombs!='bomb'){
            console.log(dictMineBombs[i][1]);
            count++
        }
    }
    if (count == 0){
        return 'win'
    } else{
        return 'In game'
    }
    
}

function winOrLose(){
    const checkedBombWin = checkBombWin()
    if (checkedBombWin == 'lose') {
        isBombGame = false
        document.querySelector('#isGoing').innerHTML = 'Програли!';
    } else if (checkedBombWin == 'win') {
        isBombGame = false;
        document.querySelector('#isGoing').innerHTML = 'Виграли!';
    }
}

function checkBombsNear(number) {
    let checkedNumber
    let count = 0
    const listOfNear = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]
    
    for (let i in listOfNear){
        checkedNumber = (Number(number[0]) + listOfNear[i][0]).toString() + (Number(number[1]) + listOfNear[i][1]).toString()
        if (checkedNumber){
            if (dictMineBombs[checkedNumber]) {
                if (dictMineBombs[checkedNumber][0] == 'bomb') {
                    count++
                }
            }
        }
    }
    return count
}



function checkBombs(){
    let countOfBombs
    for (let i in dictMineBombs){
        if (dictMineBombs[i][0] == 'number'){
            countOfBombs = checkBombsNear(i);
            dictMineBombs[i][0] = countOfBombs;
        }
    }
}

function createBombDivs() {
    for (let i = 0;i<10;i++){
        divGlander['row'+i]=document.createElement('div');
        divGlander['row'+i].classList.add('row')
        for (let b = 0;b<10;b++) {
            word = i.toString()+b.toString()
            dictMineBombs[word] = ['number',0];
            divGlander['div'+i+b]=document.createElement('div');
            divGlander['div'+i+b].classList.add('bombSquare','div'+i+b);
            divGlander['row'+i].appendChild(divGlander['div'+i+b]);
        }
        glanderField.appendChild(divGlander['row'+i])
    }    
}

function openSpaceGlander(ev) {
    console.log('hi');
    if (isBombGame){
        console.log('hi');
        const targetedDiv = ev.target.classList[1]
        const targetedDivNumber = targetedDiv.slice(-2)
        if (dictMineBombs[targetedDivNumber][1] == 1 && dictMineBombs[targetedDivNumber][0] !='bomb'){
            openNumber(targetedDivNumber)
        }
        if (dictMineBombs[targetedDivNumber][1]==0){
            if (dictMineBombs[targetedDivNumber][0] == 'bomb') {
                divGlander['div'+targetedDivNumber].style.background = 'url(img/mini-bomb.jpg)';
            }else if(dictMineBombs[targetedDivNumber][0] == 0) {
                divGlander['div'+targetedDivNumber].style.background = `url(img/bomb${dictMineBombs[targetedDivNumber][0]}.jpg)`
                openOpened(targetedDivNumber)
            }else {
                divGlander['div'+targetedDivNumber].style.background = `url(img/bomb${dictMineBombs[targetedDivNumber][0]}.jpg)`;
            }
            dictMineBombs[targetedDivNumber][1] = 1
        }
        winOrLose()
    }
}

function checkSpaceGlander(ev) {
    ev.preventDefault()
    if (isBombGame){
        const targetedDiv = ev.target.classList[1]
        const targetedDivNumber = targetedDiv.slice(-2)
        if (dictMineBombs[targetedDivNumber][1] != 2 && dictMineBombs[targetedDivNumber][1] != 1) {
            if (flags>0){
                divGlander['div'+targetedDivNumber].style.background = 'url(img/flag.jpg)'
                dictMineBombs[targetedDivNumber][1] = 2
                flags--
            }
            
        } else if (dictMineBombs[targetedDivNumber][1] == 2) {
            divGlander['div'+targetedDivNumber].style.background = 'rgb(226, 226, 226)'
            dictMineBombs[targetedDivNumber][1] = 0
            flags++
        }
        document.querySelector('#countFlags').innerHTML = 'Кількість флагів: '+flags
    }
}

function colorizeButtonGameMineSweeperOn(ev) {
    const targetedDiv = ev.target.classList[1]
    const targetedDivNumber = targetedDiv.slice(-2)
    if (dictMineBombs[targetedDivNumber][1] == 0) {
        divGlander['div'+targetedDivNumber].style.background = 'rgb(207, 205, 205)'
    }
}

function colorizeButtonGameMineSweeperOff(ev) {
    const targetedDiv = ev.target.classList[1]
    const targetedDivNumber = targetedDiv.slice(-2)
    if (dictMineBombs[targetedDivNumber][1] == 0) {
        divGlander['div'+targetedDivNumber].style.background = 'rgb(226, 226, 226)'
    }
}


function startMineSweeper() {
    document.querySelector('.fullContent').style.display = 'none';
    document.querySelector('.forthGame').style.display = 'block';
    if (!isBombGame){
        for (let i in dictMineBombs){
            dictMineBombs[i] = ['number',0]
            divGlander['div'+i].style.background = 'rgb(226, 226, 226)'
        }
        isBombGame = true
        console.log(isBombGame);
        flags = bombCount
        appendBombs(bombCount);
        checkBombs();
        document.querySelector('#countFlags').innerHTML = 'Кількість флагів: '+flags
        document.querySelector('#isGoing').innerHTML = 'Гра іде';
    }
}


function openNumber(num) {
    let checkedNumber
    let count = 0
    const listOfNear = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]
    for (let i in listOfNear){
        checkedNumber = (Number(num[0]) + listOfNear[i][0]).toString() + (Number(num[1]) + listOfNear[i][1]).toString();
        if (dictMineBombs[checkedNumber]){
            if (dictMineBombs[checkedNumber][1]==2){
                count++
            }
        }
        
    }
    if (count == dictMineBombs[num][0]){
        for (let i in listOfNear){
            checkedNumber = (Number(num[0]) + listOfNear[i][0]).toString() + (Number(num[1]) + listOfNear[i][1]).toString()
            if (dictMineBombs[checkedNumber]) {
                if (dictMineBombs[checkedNumber][1] == 0) {
                    
                    dictMineBombs[checkedNumber][1] = 1
                    if (dictMineBombs[checkedNumber][0] == 0) {
                        divGlander['div'+checkedNumber].style.background = `url(img/bomb0.jpg)`;
                        openOpened(checkedNumber)
                    } else if (dictMineBombs[checkedNumber][0] == 'bomb'){
                        divGlander['div'+checkedNumber].style.background = `url(img/mini-bomb.jpg)`;
                        winOrLose()
                    } else {
                        divGlander['div'+checkedNumber].style.background = `url(img/bomb${dictMineBombs[checkedNumber][0]}.jpg)`;
                    }
                }
            } 
        }
    }
}

function openOpened(num) {
    let checkedNumber
    const listOfNear = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]
    for (let i in listOfNear){
        checkedNumber = (Number(num[0]) + listOfNear[i][0]).toString() + (Number(num[1]) + listOfNear[i][1]).toString()
        if (dictMineBombs[checkedNumber]) {
            if (dictMineBombs[checkedNumber][1] == 0) {
                divGlander['div'+checkedNumber].style.background = `url(img/bomb${dictMineBombs[checkedNumber][0]}.jpg)`;
                dictMineBombs[checkedNumber][1] = 1
                if (dictMineBombs[checkedNumber][0] == 0) {
                    openOpened(checkedNumber)
                }
            }
        } 
    }
}

function endGameMineSweeper() {
    document.querySelector('.fullContent').style.display = 'block';
    document.querySelector('.forthGame').style.display = 'none';
    isBombGame = false
}