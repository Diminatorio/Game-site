let ticTacPlayer = 0
let enemyTicTac
let ticTacGame
let ticTacCounter
let dictTicTac
const goodResult = 'Ви виграли!'
const badResult = 'Ви програли!'
const tieResult = 'Нічия!'

function checkTicTac(){
    let isEnded = true
    for (const i in dictTicTac) {
        if (((dictTicTac[i][0]+dictTicTac[i][1]+dictTicTac[i][2]) == '111')
        ||
        ((dictTicTac[0][i]+dictTicTac[1][i]+dictTicTac[2][i]) == '111')
        ||
        ((dictTicTac[0][0] + dictTicTac[2][2] + dictTicTac[1][1]) == '111')
        ||
        ((dictTicTac[0][2] + dictTicTac[1][1] + dictTicTac[2][0])== '111')) {
            return 1
        }
        else if (((dictTicTac[i][0]+dictTicTac[i][1]+dictTicTac[i][2]) == '222')
        ||
        ((dictTicTac[0][i]+dictTicTac[1][i]+dictTicTac[2][i]) == '222')
        ||
        ((dictTicTac[0][0] + dictTicTac[2][2] + dictTicTac[1][1]) == '222')
        ||
        ((dictTicTac[0][2] + dictTicTac[1][1] + dictTicTac[2][0]) == '222')) {
            return 2
        }else if (dictTicTac[i].includes(0)) {
            isEnded = false
        }
    }
    if (isEnded) {
        return -1
    }else{
        return 0
    }
}


function clearTicTac(){
    const ticTacPlaceArray = document.querySelectorAll('.place')
    for (let i = 0; i < ticTacPlaceArray.length;i++){
        ticTacPlaceArray[i].style.background = 'url(img/background60x60.jpg)'
    }
}
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function startTicTac(){
    foundDiv = chooseDiv()
    dictTicTac = [[0,0,0],[0,0,0],[0,0,0]]
    enemyTicTac = [1,2,3,4,5,6,7,8,9]
    shuffle(enemyTicTac);
    ticTacGame = true
    ticTacCounter = 0
    clearTicTac()
    const ticTacGoing = document.querySelector('#isTicTacGoing')
    ticTacGoing.innerHTML = 'Іде гра'
    if (ticTacPlayer) {
        ifPlayer()
    }
}

function clickX() {
    ticTacPlayer = 0;
    document.querySelector('#ticTacX').classList.add('choosePlayerBorder')
    document.querySelector('#ticTacO').classList.remove('choosePlayerBorder')
    startTicTac()
}
function clickO() {
    ticTacPlayer = 1;
    document.querySelector('#ticTacO').classList.add('choosePlayerBorder')
    document.querySelector('#ticTacX').classList.remove('choosePlayerBorder')
    startTicTac()
}


function ifPlayer() {
    const placesTicTac = document.querySelectorAll('.place');
    let stringPlaces
    let arrayPlaces
    let placeNumber
    for (let i = 0; i < placesTicTac.length; i++) {
        stringPlaces = placesTicTac[i].classList.value
        arrayPlaces = stringPlaces.split(' ')
        placeNumber = Number(arrayPlaces[3].slice(-1))
        if (placeNumber == enemyTicTac[0]){
            let tempPlace = document.querySelector(`.place${placeNumber}`);
            let classdictTicTac = tempPlace.classList.value.split(' ')
            const rowPlace = classdictTicTac[1].slice(-1)-1;
            const placeInRow = classdictTicTac[2].slice(-1)-1;
            if (!(ticTacPlayer%2)) {
                dictTicTac[rowPlace][placeInRow] = '2';
                tempPlace.style.background='url("img/circle.jpg")';
                enemyTicTac.splice(0,1);
            } else {
                dictTicTac[rowPlace][placeInRow] = '1';
                tempPlace.style.background='url("img/cross.jpg")';
                enemyTicTac.splice(0,1);
            }
            return false
        }
        // console.log(arrayPlaces);
        // if (Number(arrayPlaces[3].slice(-1)) == enemyTicTac[0]){
        //     dictTicTac[arrayPlaces[1].slice(-1)-1][arrayPlaces[2].slice(-1)-1] = '2';
        //     // dictTicTac[placesTicTac[i].classList.value.split(' ')[i][1].slice(-1)-1][placesTicTac[i].classList.value.split(' ')[i][2].slice(-1)-1] = '1';
        //     // console.log(Number(arrayPlaces[3].slice(-1)));
        //     // const indexRemovable = enemyTicTac.indexOf(Number(arrayPlaces[3].slice(-1)))
        //     // console.log(indexRemovable);
        //     enemyTicTac.splice(enemyTicTac[0],1)
        //     return false
            
        // }
    }
}

function ticTacResults(ticTacResult) {
    const ticTacGoing = document.querySelector('#isTicTacGoing')
    if (ticTacPlayer){
        tempGoodResult = badResult;
        tempBadResult = goodResult;
    } else {
        tempGoodResult = goodResult;
        tempBadResult = badResult;
    }
    if (ticTacResult == 1){
        ticTacGoing.innerHTML = tempGoodResult
    } else if (ticTacResult == 2){
        ticTacGoing.innerHTML = tempBadResult
    } else {
        ticTacGoing.innerHTML = tieResult   
    }
    ticTacGame = false
}

function clickedPlace(ev) {
    if (ticTacGame){
        let classdictTicTac = ev.target.classList.value.split(' ')
        const rowPlace = classdictTicTac[1].slice(-1)-1;
        const placeInRow = classdictTicTac[2].slice(-1)-1;
        const justAPlace = classdictTicTac[3].slice(-1)
        if (!(checkTicTac())&&(!dictTicTac[rowPlace][placeInRow])){
            if(!(ticTacPlayer%2)){
                ev.target.style.background='url("img/cross.jpg")';
                dictTicTac[rowPlace][placeInRow] = '1';
                const indexOfTicTac = enemyTicTac.indexOf(Number(justAPlace));
                if (indexOfTicTac>=0){
                    enemyTicTac.splice(indexOfTicTac,1)
                }
            } else{
                ev.target.style.background='url("img/circle.jpg")';
                dictTicTac[rowPlace][placeInRow] = '2';
                const indexOfTicTac = enemyTicTac.indexOf(Number(justAPlace));
                if (indexOfTicTac>=0){
                    enemyTicTac.splice(indexOfTicTac,1)
                }
            }
            if (!checkTicTac()){
                ifPlayer()
            }
        }
        let ticTacChecked = checkTicTac()
        if(ticTacChecked){
            ticTacResults(ticTacChecked)
        }
    }
}