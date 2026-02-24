const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

let board = [];
let currentPlayer = CROSS;
let gameActive = true;
let boardSize = 3;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    boardSize = prompt('Введите размер поля (например, 3 для поля 3x3):', '3');
    boardSize = parseInt(boardSize) || 3;
    initBoard(boardSize);
    renderGrid(boardSize);
}

function initBoard(size) {
    board = [];
    for (let i = 0; i < size; i++) {
        board[i] = new Array(size).fill(EMPTY);
    }
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = board[i][j];
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (!gameActive) {
        alert("Игра окончена");
        return;
    }
    if (board[row][col] !== EMPTY) {
        return;
    }

    board[row][col] = currentPlayer;
    renderSymbolInCell(currentPlayer, row, col);
    
    if (checkWin(currentPlayer)) {
        gameActive = false;
        alert(`Победил игрок ${currentPlayer}`);
        return;
    }
    
    if (checkDraw()) {
        gameActive = false;
        alert('Победила дружба');
        return;
    }
    
    currentPlayer = currentPlayer === CROSS ? ZERO : CROSS;

    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function checkWin(player) {
    const lines = [];
    
    for (let i = 0; i < boardSize; i++) {
        const row = [];
        for (let j = 0; j < boardSize; j++) {
            row.push([i, j]);
        }
        lines.push(row);
    }
    
    for (let j = 0; j < boardSize; j++) {
        const col = [];
        for (let i = 0; i < boardSize; i++) {
            col.push([i, j]);
        }
        lines.push(col);
    }
    
    const mainDiag = [];
    for (let i = 0; i < boardSize; i++) {
        mainDiag.push([i, i]);
    }
    lines.push(mainDiag);
    
    const secondaryDiag = [];
    for (let i = 0; i < boardSize; i++) {
        secondaryDiag.push([i, boardSize - 1 - i]);
    }
    lines.push(secondaryDiag);
    
    for (const line of lines) {
        let win = true;
        for (const [row, col] of line) {
            if (board[row][col] !== player) {
                win = false;
                break;
            }
        }
        
        if (win) {
            line.forEach(([row, col]) => {
                renderSymbolInCell(player, row, col, 'red');
            });
            return true;
        }
    }
    
    return false;
}

function checkDraw() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (board[i][j] === EMPTY) {
                return false;
            }
        }
    }
    return true;
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    console.log('reset!');
    initBoard(boardSize);
    currentPlayer = CROSS;
    gameActive = true;
    renderGrid(boardSize);
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
