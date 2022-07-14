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
let isChoosing = true
let isChoosed = false;
const poleTop = document.querySelector('.yourPole').offsetTop
const poleBottom = poleTop+600;
const poleLeft = document.querySelector('.yourPole').offsetLeft
const poleRight = poleLeft+600;
const listOfNear = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,0],[0,1],[1,-1],[1,0],[1,1]]


createShips()
addShips()
createEnemy()
appendEnemyShips()
// addEnemyShips()

const squareShips = document.querySelectorAll('.poleShip')


function appendEnemyShips(){
    const listOfEnemyShips = [4,3,3,2,2,2,1,1,1,1]
    for (let i = 0; i < listOfEnemyShips.length; i++){
        let ok = true
        while (ok){
            let number = randomInt(10).toString()+randomInt(10).toString()
            let NUM = enDivShips['enDiv'+number][1]
            console.log(checkEnemy(listOfEnemyShips[i],number));
            if (checkEnemy(listOfEnemyShips[i],number) && !NUM) {
                console.log(i);
                for (let count = 0; count < i; count++) {
                    number = (Number(number[0]) + count) + number[1]
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
    console.log(divList);
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
    return true
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
    const shipNumber = ev.target.classList[2].slice(-2)
    if (!ship.length){
        ev.target.style.position = 'absolute';
        ev.target.style.zIndex = '2'
        isGoToMouse = ev.target.classList[2].slice(-2)
        movingShip = document.querySelector(`.poleShip${isGoToMouse}`)
    } else {
        // console.log(divShips['div'+shipNumber]);
        // console.log(shipNumber);
        // console.log(poleShips[shipNumber]);
        divShips['div'+poleShips[shipNumber][0][0]][0].removeChild(ev.target)
        document.querySelector('.chooseShips').appendChild(ev.target)
        
        
        const shipNum = ev.target.classList[2].slice(-2)
        const shipNumb = shipNum[0]
        
        const block = poleShips[shipNumber][0][0]
        console.log(block);
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
    const curLeft = arrayCurCords[0]
    if ((poleTop <= curTop) && (curTop <= poleBottom) && (poleLeft <= curLeft) && (curLeft <= poleRight)) {
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
    console.log('ok');
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
    if(!isChoosing) {
        isChoosed = true
        document.querySelector('.chooseShips').style.display = 'none'
        enemyPole.style.display = 'block'
    }
    
}

function mouseUp(ev) {
    if (ev.target.classList[0] == 'poleShip') {
        checkedCoords = checkCoords(getCoords(ev),ev)
        if (checkedCoords) {
            deleteFromChoosen(ev,checkedCoords);
        }
        isChoosing = checkChoosing()
    }

}

