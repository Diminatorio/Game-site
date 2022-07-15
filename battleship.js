const divShips = {}
const enDivShips = {}
const poleShips = {}
const divsYourShips = {}
const yourPole = document.querySelector('.yourPole');
const enemyPole = document.querySelector('.enemyPole');
let isGoToMouse = 0
let movingShip
let put
let targeted
let afterGame = false
window.wasShot = false
window.shotNumber = 0
let isChoosing = true
window.isChoosed = false;
const poleTop = 100
const poleBottom = poleTop+600;
const poleLeft = 426
const poleRight = poleLeft+600;
console.log(poleLeft);
const listOfNear = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,0],[0,1],[1,-1],[1,0],[1,1]]
let battleShipGame = false
const startButton = document.querySelector('.startButton')

createShips()
addShips()
createEnemy()
appendEnemyShips()
const allShips = document.querySelectorAll('.squareShips')
let squareShips = document.querySelectorAll('.poleShip')
const squareShipsEnemy = document.querySelectorAll('.enemyShips')


function appendEnemyShips(){
    const listOfEnemyShips = [4,3,3,2,2,2,1,1,1,1]
    for (let i = 0; i < listOfEnemyShips.length; i++){
        let ok = true
        while (ok){
            let number = randomInt(10).toString()+randomInt(10).toString()
            let NUM = enDivShips['enDiv'+number][1]
            // console.log(checkEnemy(listOfEnemyShips[i],number));
            const divList = checkEnemy(listOfEnemyShips[i],number);
            if (divList && !NUM) {
                for (let count in divList) {
                    // number = (Number(number[0]) + count) + number[1]
                    number = divList[count]
                    if (number.length == 2) {
                        enDivShips['enDiv'+number][1] = 1
                    } 
                }
                ok = false
            }
            
        }
        
    }
}

function checkEnemy(num,divs) {
    const divList = []
    for (let i = 0; i < num; i++) {
        divList.push((Number(divs[0]) + i) + divs[1])
    }
    for (let div in divList) {
        for (let i in listOfNear) {
            checkedNumber = (Number(divList[div][0]) + listOfNear[i][0]).toString() + (Number(divList[div][1]) + listOfNear[i][1]).toString();
            if (checkedNumber.length == 2) {
                for (let b in enDivShips['enDiv'+checkedNumber]) {
                    if (enDivShips['enDiv'+checkedNumber]) {
                        if (enDivShips['enDiv'+checkedNumber][1] == 1 && !(divList.includes(checkedNumber))) {
                            console.log('Единица уже стояла: ',enDivShips['enDiv'+checkedNumber][1] == 1);
                            console.log('Уже было такое значение ', !(divList.includes(checkedNumber)));
                            return false
                        }
                    }
                    if (divList[div].length != 2) {
                        console.log('Неподходящая длина', divList[div].length != 2);
                        return false
                    }
                }
                
            }
        }
    }
    return divList
}

function createShips() {
    for (let i = 0;i<10;i++){
        divShips['row'+i]=document.createElement('div');
        divShips['row'+i].classList.add('row')
        for (let b = 0;b<10;b++) {
            divShips['div'+i+b]=[document.createElement('div'),0,0];
            divShips['div'+i+b][0].classList.add('squareShips','div'+i+b);
            divShips['row'+i].appendChild(divShips['div'+i+b][0]);
        }
        yourPole.appendChild(divShips['row'+i])
    }    
}


function createEnemy() {
    for (let i = 0;i<10;i++){
        enDivShips['row'+i]=document.createElement('div');
        enDivShips['row'+i].classList.add('row')
        for (let b = 0;b<10;b++) {
            enDivShips['enDiv'+i+b]=[document.createElement('div'),0,0];
            enDivShips['enDiv'+i+b][0].classList.add('enemyShips','enDiv'+i+b);
            enDivShips['row'+i].appendChild(enDivShips['enDiv'+i+b][0]);
        }
        enemyPole.appendChild(enDivShips['row'+i])
    }    
}


function addShips() {
    divsYourShips['1'] = 4
    divsYourShips['2'] = 3
    divsYourShips['3'] = 2
    divsYourShips['4'] = 1
    let shipsCount
    for (let ship in divsYourShips) {
        shipsCount = 0
        for (let i = 1; i <= divsYourShips[ship]; i++){
            shipsCount++
            const divShip = document.createElement('div');
            divShip.classList.add('poleShip',`poleShip${ship}`,`poleShip${ship}${shipsCount}`)
            poleShips[ship.toString()+shipsCount] = [[],0]
            document.querySelector('.chooseShips').appendChild(divShip)
        }
    }
}

function putMouseOnShip(ev) {
    const ship = poleShips[ev.target.classList[2].slice(-2)][0]
    console.log(ship);
    const shipNumber = ev.target.classList[2].slice(-2)
    if (!ship.length){
        ev.target.style.position = 'absolute';
        ev.target.style.zIndex = '2'
        isGoToMouse = ev.target.classList[2].slice(-2)
        movingShip = document.querySelector(`.poleShip${isGoToMouse}`)
    } else {
        divShips['div'+poleShips[shipNumber][0][0]][0].removeChild(ev.target)
        document.querySelector('.chooseShips').appendChild(ev.target)
        
        
        const shipNum = ev.target.classList[2].slice(-2)
        const shipNumb = shipNum[0]
        
        const block = poleShips[shipNumber][0][0]
        for (let i = 0; i < shipNumb; i++) {
            currentShip = Number(block[0])+i+block[1].toString()
            if (divShips['div'+currentShip]) {
                divShips['div'+currentShip][1] = 0
            }
        }
        ship.length = 0
        divShips['div'+block][0].style.zIndex = '0'
        returnBack(ev)
    }
    
}
function move(ev) {
    if (isGoToMouse) {
        movingShip.style.left = ev.pageX - movingShip.offsetWidth / 2 + 'px'
        movingShip.style.top = ev.pageY - movingShip.offsetHeight / 2 + 'px'
    }
}

function checkCoords(arrayCurCords,ev) {
    const curTop = arrayCurCords[1]
    const curLeft = arrayCurCords[0];
    console.log(curLeft <= poleRight);
    if ((poleTop <= curTop) && (curTop <= poleBottom) && (poleLeft <= curLeft) && (curLeft <= poleRight)) {
        console.log('IN');
        for (let i in divShips) {
            if (i.startsWith('div')) {
                const top = divShips[i][0].offsetTop;
                const bottom = top+60;
                const left = divShips[i][0].offsetLeft;
                const right = left+60
                if ((top <= curTop) && (curTop <= bottom) && (left <= curLeft) && (curLeft <= right)) {
                    return [divShips[i],top,left]
                }
            }
        }
    } else {
        returnBack(ev)
        return false
    }
    
}

function returnBack(ev) {
    ev.target.style.position = 'static';
    ev.target.style.margin = '20px auto';
    put = 0;
    document.querySelector('.chooseShips').appendChild(ev.target);
    ev.target.style.zIndex = '0'
    isGoToMouse = 0
}

function getCoords(elem) {
    let xTop = elem.clientX
    let yTop = elem.clientY
    return [xTop, yTop]
}

function putInPoles(ev,div) {
    const ship = ev.target.classList[2].slice(-2)
    const shipNumber = ship[0]
    const block = div[0].classList[1].slice(-2)
    for (let i = 0; i < shipNumber; i++) {
        currentShip = Number(block[0])+i+block[1].toString()
        if (divShips['div'+currentShip]) {
            poleShips[ship][0].push(currentShip)
            divShips['div'+currentShip][1] = 1
        } else {
            returnBack(ev)
            return
        }
        
    }
    if(!checkShipsNear(ev)){
        div[0].style.zIndex = '0'
        poleShips[ship][0].length = 0
        divShips['div'+block][1]= 0;
        divShips['div'+block][0].removeChild(ev.target);
        for (let i = 0; i < shipNumber; i++) {
            currentShip = Number(block[0])+i+block[1].toString()
            divShips['div'+currentShip][1] = 0
        }
        returnBack(ev)
    }
    
}

function checkShipsNear(ev) {
    // const block = div[0].classList[1].slice(-2);
    const ship = ev.target.classList[2].slice(-2).toString()
    let checkedNumber
    const pole = poleShips[ship][0]
    for (let poleship in pole) {
        for (let i in listOfNear) {
            checkedNumber = (Number(pole[poleship][0]) + listOfNear[i][0]).toString() + (Number(pole[poleship][1]) + listOfNear[i][1]).toString();
            if (checkedNumber.length == 2) {
                for (let b in divShips['div'+checkedNumber]) {
                    if (divShips['div'+checkedNumber]) {
                        if (divShips['div'+checkedNumber][1] == 1 && !(pole.includes(checkedNumber))) {
                            return false
                        }
                    }
                    if (pole[poleship].length != 2) {
                        return false
                    }
                }
                
            }
            
        }
        
    }
    return true
}

function deleteFromChoosen(ev, gottenDiv) {
    if(!put && !gottenDiv[0][1]){
        isGoToMouse = 0;
        ev.target.style.margin = '0'
        gottenDiv[0][0].style.zIndex = '1'
        ev.target.style.position = 'static';
        ev.target.clientY = gottenDiv[1];
        ev.target.clientX = gottenDiv[2];
        document.querySelector('.chooseShips').removeChild(ev.target)
        gottenDiv[0][0].appendChild(ev.target)
        putInPoles(ev,gottenDiv[0])
    } else {
        returnBack(ev)
    }
    
}

function checkChoosing() {
    console.log(document.querySelector('.chooseShips').childNodes.length);
    if (document.querySelector('.chooseShips').childNodes.length) {
        return true
    } else {
        return false
    }
}

function startBattle() {
    console.log(isChoosing);
    console.log(window.isChoosed);
    if(!isChoosing && !window.isChoosed) {
        startButton.innerHTML = 'Гра іде'
        window.isChoosed = true
        document.querySelector('.chooseShips').style.display = 'none'
        enemyPole.style.display = 'block'
        battleShipGame = true
    }
    if (afterGame) {
        startButton.innerHTML = 'Вибір'
        afterGame = false;
        isChoosing = true;
        window.isChoosed = false;
        document.querySelector('.chooseShips').style.display = 'block';
        enemyPole.style.display = 'none';
        enDivShips.length = 0
        divShips.length = 0
        for (let i = 0; i < allShips.length; i++) {
            allShips[i].style.background = 'rgba(228, 228, 228,0.6)'
            allShips[i].remove()
        }
        for (let i = 0; i < squareShipsEnemy.length; i++) {
            squareShipsEnemy[i].remove()
        }
        createShips()
        addShips()
        createEnemy()
        appendEnemyShips()
    }
    
}

function mouseUp(ev) {
    if (ev.target.classList[0] == 'poleShip') {
        checkedCoords = checkCoords(getCoords(ev),ev)
        console.log(checkedCoords);
        if (checkedCoords) {
            deleteFromChoosen(ev,checkedCoords);
        }
        isChoosing = checkChoosing()
    }

}

function CheckUpAndDown() {
    let curCount = 0
    let mainCount = 0
    let curNumber
    while (true) {
        curCount++
        curNumber = Number(window.shotNumber[0]) + curCount + window.shotNumber[1];
        if (curNumber && curNumber.length == 2){
            if (!divShips['div'+curNumber][1]) {
                mainCount++
                console.log('Снизу есть',321);
                break
            }
        } else {
            break
        }
    }
    curCount = 0
    while (true) {
        curCount--
        curNumber = Number(window.shotNumber[0]) + curCount + window.shotNumber[1];
        console.log(curNumber);
        if (curNumber && curNumber.length == 2){
            if (!divShips['div'+curNumber][1]) {
                mainCount++
                console.log('Сверху есть');
                break
            }
        } else {
            break
        }
    }
    console.log(mainCount,376);
    return mainCount
}

function divShotCheckUpAndDown() {
    if (CheckUpAndDown().length != 2) {
        console.log(window.shotNumber,382);
        const divArray = []
        let curNumber
        let curCount = 0
        let firstNum
        let secondNum
        curCount = -1
        for (let i = 0; i < 4; i++) {
            if (CheckUpAndDown()) {}
            curNumber = Number(window.shotNumber[0]) + curCount + window.shotNumber[1];
            if (curNumber.length == 2 && curNumber) {
                if (!divShips['div'+curNumber][2]) {
                    firstNum = curNumber
                    divArray.push(firstNum);
                    console.log(divShips['div'+curNumber][2],396);
                    break
                }
            }
            curCount--
        }
        curCount = 1
        for (let i = 0; i < 4; i++) {
            curNumber = Number(window.shotNumber[0]) + curCount + window.shotNumber[1];
            if (curNumber.length == 2 && curNumber) {
                if (!divShips['div'+curNumber][2]) {
                    secondNum = curNumber
                    divArray.push(secondNum);
                    console.log(divShips['div'+curNumber][2]);
                    break
                }
            } else {
                break
            }
            curCount++
        }
        console.log(divArray);
        return divArray
    } else {
        return false
    }
}

function shuffled(array) {
    let number = randomInt(1)
    const ARRAY = []
    if (number == 0) {
        ARRAY.push(array[0])
        ARRAY.push(array[1])
    } else {
        ARRAY.push(array[1])
        ARRAY.push(array[0])
    }
    return ARRAY
}

function enemyShot() {
    console.log('next');
    console.log(window.shotNumber);
    if (!window.wasShot) {
        let divNumber
        let ok = true
        while (ok) {
            divNumber = randomInt(10).toString()+randomInt(10).toString();
            if (!divShips['div'+divNumber][2]) {
                ok = false
            }
        }
        if (divShips['div'+divNumber][1]) {
            divShips['div'+divNumber][0].style.background = 'red'
            
            window.wasShot = true
            divShips['div'+divNumber][2] = 1
            window.shotNumber = divNumber;
            console.log('firstGoal');
            enemyShot()
        } else {
            divShips['div'+divNumber][2] = 1
            divShips['div'+divNumber][0].style.background = 'yellow'
        }
    } else {
        let arrayChecking = divShotCheckUpAndDown();
        console.log('Длина:' +arrayChecking.length,483);
        if (arrayChecking) {
            console.log('TRUE1');
            if (arrayChecking.length != 0) {
                console.log('TRUE2');
                ok = true;
                console.log(arrayChecking,493);
                let letGoUpNum
                if (arrayChecking.length == 1) {
                    letGoUpNum = arrayChecking[0]
                    console.log('ok1');
                } else if (arrayChecking.length == 2) {
                    console.log('ok2');
                    
                    letGoUpNum = shuffled(arrayChecking)[0]
                    console.log(letGoUpNum);
                }
                if (!letGoUpNum) {
                    console.log('1');
                }
                console.log(letGoUpNum,506);
                if (divShips['div'+letGoUpNum][1]) {
                    divShips['div'+letGoUpNum][2] = 1;
                    divShips['div'+letGoUpNum][0].style.background = 'red'
                    window.wasShot = true
                    console.log('goal');
                    enemyShot()
                } else {
                    divShips['div'+letGoUpNum][2] = 1;
                    divShips['div'+letGoUpNum][0].style.background = 'yellow'
                    console.log('bad goal');
                    window.wasShot = true
                }
            } else {
                console.log('okk');
                window.wasShot = false;
                enemyShot()
            }
        }else {
            console.log('okk');
            window.wasShot = false;
            enemyShot()
        }
    }
}

function checkWIN() {
    let playerWin = true
    let enemyWin = true
    let num
    for (let i = 0; i < squareShipsEnemy.length; i++) {
        num = squareShipsEnemy[i].classList[1].slice(-2)
        console.log(num);
        if (enDivShips['enDiv'+num][1] && !enDivShips['enDiv'+num][2]) {
            playerWin = false;
            break
        }
    }
    for (let i = 0; i < allShips.length; i++) {
        console.log(allShips[i].classList);
        num = allShips[i].classList[1].slice(-2)
        console.log(num);
        if (divShips['div'+num][1] && !divShips['div'+num][2]) {
            enemyWin = false;
            break
        }
    }
    if (playerWin) {
        battleShipGame = false
        return 1
    }
    if (enemyWin) {
        battleShipGame = false
        return 2
    }
    return 0
}

function killShip(num) {
    if (!enDivShips['enDiv'+num][2]) {
        if (enDivShips['enDiv'+num][1]) {
            return 'shot'
        } else {
            return 'not shot'
        }
    } else {
        return false
    }
}

function enemyFight(ev) {
    console.log(checkWIN());
    let checkedWin = checkWIN()
    console.log(checkedWin);
    console.log(1);
    console.log(battleShipGame);
    let shipNumber = ev.target.classList[1].slice(-2)
    if (battleShipGame) {
        let isShot = killShip(shipNumber)
        if (isShot) {
            enDivShips['enDiv'+shipNumber][2] = 1
            if (isShot == 'shot') {
                ev.target.style.background = 'red'
                return
            } else {
                ev.target.style.background = 'yellow'
            }
            enemyShot()
            
        }else {
            if (checkedWin) {
                if (checkedWin == 1) {
                    startButton.innerHTML = 'Ви виграли!'
                }else {
                    startButton.innerHTML = 'Ви програли!'
                }
                afterGame = true
            }
    
        }
    }else {
        if (checkedWin) {
            if (checkedWin == 1) {
                startButton.innerHTML = 'Ви виграли!'
            }else {
                startButton.innerHTML = 'Ви програли!'
            }
            afterGame = true
        }

    }
}