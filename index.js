window.onload = main;

const ROW_COUNT = 8;
const CELL_COUNT = 8;
let HORSE_I = 0;
let HORSE_J = 0;

function main() {
    createBoard();
    initializationBord();
    setStartHorsePosition();
    document.addEventListener('click',startAlgorithm)
    // startAlgorithm();
}

function createBoard() {
    const mainDiv = document.getElementById('app');

    for (let i = 0; i < ROW_COUNT; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < CELL_COUNT; j++) {
            const cell = document.createElement('div');
            cell.setAttribute('id', `cell_${i}_${j}`);
            cell.classList.add('cell');
            cell.innerText = '0';
            row.appendChild(cell);
        }
        mainDiv.appendChild(row);
    }
}

function initializationBord() {
    for (let i = 0; i < ROW_COUNT; i++) {
        for (let j = 0; j < CELL_COUNT; j++) {
            const cell = document.getElementById(`cell_${i}_${j}`);
            if (getValue(i, j) !== -1) {
                cell.innerText = '' + getAvailableBoxesFor(i, j).length;
            }
        }
    }
}

function getAvailableBoxesFor(i, j) {
    const availableBoxes = [];

    if (i - 2 >= 0 && j + 1 < ROW_COUNT && getValue(i - 2 , j + 1 ) !== -1){
        availableBoxes.push({i: i - 2, j: j + 1});
    }
    if (i - 2 >= 0 && j -1 >= 0 && getValue(i - 2, j - 1) !== -1) {
        availableBoxes.push({i: i - 2, j: j - 1});
    }
    if (i + 2 < ROW_COUNT && j + 1 < CELL_COUNT && getValue(i + 2, j + 1) !== -1) {
        availableBoxes.push({i: i + 2, j: j + 1});
    }
    if (i + 2 < ROW_COUNT && j - 1 >= 0 && getValue(i + 2, j - 1) !== -1) {
        availableBoxes.push({i: i + 2, j: j-1});
    }
    if (i - 1 >= 0 && j + 2 < CELL_COUNT && getValue(i - 1, j + 2) !== -1) {
        availableBoxes.push({i: i - 1, j: j + 2});
    }
    if (i - 1 >= 0 && j - 2 >= 0 && getValue(i - 1, j - 2) !== -1) {
        availableBoxes.push({i: i - 1, j: j - 2});
    }
    if (i + 1 < ROW_COUNT && j + 2 < CELL_COUNT && getValue(i + 1, j + 2) !== -1) {
        availableBoxes.push({i: i + 1, j: j +2});
    }
    if (i + 1 < ROW_COUNT && j - 2 >= 0 && getValue(i + 1, j - 2) !== -1) {
        availableBoxes.push({i: i + 1, j: j - 2});
    }
    return availableBoxes;
}

function getValue(i, j) {
    const value = document.getElementById(`cell_${i}_${j}`);
    debugger;
    return +value.innerHTML;
}

function setStartHorsePosition() {
    const cell = document.getElementById(`cell_${HORSE_I}_${HORSE_J}`);
    cell.innerHTML = '' + -1;
    if (cell.innerHTML === '-1') {
       cell.setAttribute( 'class', 'horse');
    }
}

function startAlgorithm(){
    debugger;
    const timerId = setInterval(() => {
        if (isFinished()) {
            clearInterval(timerId)
        }
        initializationBord();
        horseMove();
    },1000)

}

function isFinished() {
    for (let i = 0; i < ROW_COUNT; i++) {
        for (let j = 0; j < CELL_COUNT; j++) {
            if (getValue(i, j) !== -1) {
                return false;
            }
        }
    }
    return true;
}

function horseMove() {
    const availableBoxes = getAvailableBoxesFor(HORSE_I, HORSE_J);
    let minStepCount = 8;
    availableBoxes.forEach(box => {
        const {i, j} = box;
        if (getValue(i, j) < minStepCount) {
            minStepCount = getValue(i, j);
            HORSE_I = i;
            HORSE_J = j;
        }
    });
    const cell = document.getElementById(`cell_${HORSE_I}_${HORSE_J}`);
    cell.innerHTML = '' + -1;
    if (cell.innerHTML === '-1') {
        cell.setAttribute('class', 'horse');
    }
}