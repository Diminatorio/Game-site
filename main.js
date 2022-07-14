document.querySelector('.game1').addEventListener('click',startGame1)

document.querySelector('#endGame1').addEventListener('click',endGameDivs)

document.querySelector('.startPlita').addEventListener('click',restartGame1)

document.querySelector('.startPlita').addEventListener('mouseover',colorizeButtonGameDivsOn)

document.querySelector('.startPlita').addEventListener('mouseout',colorizeButtonGameDivsOff)

for (i = 0; i < divsInFind.length; i++) {
    divsInFind[i].addEventListener('click',ifChosen)
}

//Tic-Tac-Toe

document.querySelector('.game3').addEventListener('click',()=>{
    document.querySelector('.fullContent').style.display = 'none'
    document.querySelector('.thirdGame').style.display = 'block'
    startTicTac()
    clickX()
})

document.querySelector('.endGame3').addEventListener('click',()=>{
    document.querySelector('.fullContent').style.display = 'block'
    document.querySelector('.thirdGame').style.display = 'none'
})

document.querySelector('.startTicTac').addEventListener('click',startTicTac)

document.querySelector('#ticTacX').addEventListener('click',clickX)

document.querySelector('#ticTacO').addEventListener('click',clickO)

placeTicTac = document.querySelectorAll('.place')
for (i = 0; i < placeTicTac.length; i++){
    placeTicTac[i].addEventListener('click',clickedPlace)
}


//Сапер

document.querySelector('.game4').addEventListener('click',startMineSweeper)
for (i = 0; i < bombSquare.length; i++){
    
    bombSquare[i].addEventListener('click', openSpaceGlander)
    bombSquare[i].addEventListener('contextmenu', checkSpaceGlander)
    bombSquare[i].addEventListener('mouseover', colorizeButtonGameMineSweeperOn)
    bombSquare[i].addEventListener('mouseout', colorizeButtonGameMineSweeperOff)
}

document.querySelector('.startGlandersAgain').addEventListener('click',startMineSweeper);

document.querySelector('.endGame4').addEventListener('click',endGameMineSweeper)


// Морський бій


for (let i = 0; i < squareShips.length; i++) {
    squareShips[i].addEventListener('mousedown',(ev)=>{
        if (!isChoosed) {
            if (ev.target.classList[0] == 'poleShip'){
                putMouseOnShip(ev)
                targetted = 1
                document.addEventListener('mousemove',move)
                document.addEventListener('mouseup',mouseUp)
            }
        }
    });
}
document.querySelector('.panelBattle').addEventListener('click',startBattle)




