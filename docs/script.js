let selectedPiece = "";
let oldPosition = [];
let currentTurn = "white";

let image = {
    pawn: "pawn",
    knight: "knight",
    rook: "rook",
    bishop: "bishop",
    queen: "queen",
    king: "king"
};

let container = createElement("div", "container");
createGrid();

container.addEventListener("click", e => {
    let row = e.target.getAttribute("data_row");
    let col = e.target.getAttribute("data_col");
    let color = e.target.className;
    let isVisited = e.target.getAttribute("visited");
    let currentPlayer = e.target.getAttribute("player");
    let soldier = e.target.getAttribute("soldier");
    if (soldier !== "none" && currentPlayer === currentTurn) {
        oldPosition = [];
        selectedPiece = "";
        selectedPiece = soldier;
        oldPosition.push(row);
        oldPosition.push(col);
        oldPosition.push(currentPlayer, soldier);
    } else {
        if (selectedPiece !== "") {
            if (row >= 0 && row <= 7 && col >= 0 && col <= 7 && isMovable(row, col, selectedPiece, oldPosition[0], oldPosition[1], currentTurn)) {
                removeOldPos(oldPosition[0], oldPosition[1]);
                updatePos(row, col, oldPosition[2], oldPosition[3], selectedPiece);
                oldPosition = [];
                selectedPiece = "";
                currentTurn = currentTurn === "white" ? "black" : "white";
            }
        }
    }
});

function isMovable(newRow, newCol, soldier, startRow, startCol, playerMoved) {
    startRow = parseInt(startRow);
    // console.log(playerMoved);
    startCol = parseInt(startCol);
    newRow = +newRow;
    newCol = +newCol;
    // console.log(startRow, startCol, newCol, newRow);
    let opponent = playerMoved === "white" ? "black" : "white";
    let allNodes = document.querySelectorAll(`[soldier="none"],[player="${opponent}"]`);
    if (soldier === "pawn") {
        let possibleMove = 1;
        if (startRow === 1 || startRow === 6) {
            possibleMove += 1;
        }

        if (playerMoved === "white") {
            if (newCol === startCol) {
                let possiblePaths = [];
                for (let temp = 1; temp <= possibleMove; temp++) {
                    let pushRow = checkOpponentAcquired(startRow + temp, startCol, opponent, playerMoved);
                    if (pushRow)
                        break;
                    possiblePaths.push(startRow + temp);
                }
                for (let i = 0; i < possiblePaths.length; i++) {
                    if (newRow === possiblePaths[i] && newCol === startCol && (newCol - startCol < possibleMove)) {
                        // console.log("kumar");
                        return true;
                    }
                }
            } else if ((newCol === startCol + 1 || newCol === startCol - 1) && newRow === startRow + 1 && playerMoved !== opponent) {
                return true;
            }
        } else {
            if (newCol === startCol) {
                let possiblePaths = [];
                for (let temp = 1; temp <= possibleMove; temp++) {
                    let pushRow = checkOpponentAcquired(startRow - temp, startCol, opponent, playerMoved);
                    if (pushRow)
                        break;
                    possiblePaths.push(startRow - temp);
                }
                for (let i = 0; i < possiblePaths.length; i++) {
                    if (newRow === possiblePaths[i] && newCol === startCol && (startCol - newCol < possibleMove)) {
                        // console.log("kumar");
                        return true;
                    }
                }
            } else if ((newCol === startCol + 1 || newCol === startCol - 1) && newRow === startRow - 1 && playerMoved !== opponent) {
                return true;
            }
        }
    } else if (soldier === "rook") {
        if (newCol === startCol) {
            let start = newRow > startRow ? startRow : newRow;
            let end = newRow > startRow ? newRow : startRow;
            for (let i = start + 1; i <= end; i++) {
                if (i === startRow) continue;
                let isOpponent = document.querySelector(`[data_row="${i}"][data_col="${newCol}"][player="${opponent}"]`);
                if (isOpponent && i === end) return true;
                let temp = document.querySelector(`[data_row="${i}"][data_col="${newCol}"][player="none"]`);
                if (!temp) {
                    return false;
                }
            }
            return true;
        }
        if (newRow === startRow) {
            let start = newCol > startCol ? startCol : newCol;
            let end = newCol > startCol ? newCol : startCol;
            for (let i = start + 1; i <= end; i++) {
                if (i === startCol) continue;
                let isOpponent = document.querySelector(`[data_row="${newRow}"][data_col="${i}"][player="${opponent}"]`);
                if (isOpponent && i === end) return true;
                let temp = document.querySelector(`[data_row="${newRow}"][data_col="${i}"][player="none"]`);
                if (!temp) {
                    return false;
                }
            }
            return true;
        }
    } else if (soldier === "knight") {
        if (newRow === startRow || newCol === startCol) return false;
        let possibleMoves = [
            [startRow + 1, startCol - 2],
            [startRow + 1, startCol + 2],
            [startRow - 1, startCol - 2],
            [startRow - 1, startCol + 2],
            [startRow + 2, startCol - 1],
            [startRow + 2, startCol + 1],
            [startRow - 2, startCol - 1],
            [startRow - 2, startCol + 1]
        ];
        for (let i = 0; i < possibleMoves.length; i++) {
            if (newRow === possibleMoves[i][0] && newCol === possibleMoves[i][1]) {
                let checkEmpty = document.querySelector(`[data_row="${newRow}"][data_col="${newCol}"][player="${playerMoved}"]`);
                if (checkEmpty) return false;
                return true;
            }
        }
        return false;
    } else if (soldier === "bishop") {

    }
}

function checkOpponentAcquired(row, col, opponent, basePlayer) {
    let canMove = true;
    let pos = document.querySelector(`[data_row="${row}"][data_col="${col}"][player="none"]`);
    // console.log(pos);
    // console.log("hitesh");
    if (pos)
        return false;
    else
        return true;
    // let canCut1, canCut2;
    // if (col + 1 <= 7 || col - 1 >= 0) {
    //     canCut1 = document.querySelectorAll(`[data_row="${row}"][data_col="${col+1}"][player="${opponent}"]`);
    //     canCut2 = document.querySelectorAll(`[data_row="${row}"][data_col="${col-1}"][player="${opponent}"]`);
    //     console.log(canCut2, canCut1);
    //     if (canCut1 || canCut2) {
    //         return false;
    //     } else
    //         return true;
    // }


}

function removeOldPos(row, col) {
    let oldNode = document.querySelector(`[data_row="${row}"][data_col="${col}"]`);
    oldNode.innerText = "";
    oldNode.setAttribute("player", "none");
    oldNode.setAttribute("soldier", "none");
    // console.log(oldNode);
}

function updatePos(row, col, currentPlayer, soldier, selectedPiece) {
    let selectedNode = document.querySelector(`[data_row="${row}"][data_col="${col}"]`);
    selectedNode.innerHTML = selectedPiece;
    // console.log(currentPlayer, soldier);
    selectedNode.setAttribute("player", currentPlayer);
    selectedNode.setAttribute("soldier", soldier);
    // console.log(selectedNode);
}

function createGrid() {
    for (let i = 0; i < 8; i++) {
        let singleRow = createElement("div", "row");
        let className = "";
        let player = getPlayer(i);
        let soldier = "none";
        for (let j = 0; j < 8; j++) {
            let currentRow = i + 1,
                currentCol = j + 1;
            if (currentRow % 2 === 1 && currentCol % 2 === 1 || currentRow % 2 === 0 && currentCol % 2 === 0) {
                className = "col-grey";
            } else {
                className = "col";
            }

            if (currentRow === 1 || currentRow === 8) {
                if (currentCol === 1 || currentCol === 8) {
                    soldier = "rook";
                } else if (currentCol === 2 || currentCol === 7) {
                    soldier = "knight";
                } else if (currentCol === 3 || currentCol === 6) {
                    soldier = "bishop";
                } else if (currentCol === 4) {
                    soldier = "queen";
                } else {
                    soldier = "king";
                }
            } else if (currentRow === 2 || currentRow === 7) {
                soldier = "pawn";
            }

            let singleNode = node(i, j, className, player, soldier);
            if (soldier !== "none")
                singleNode.innerHTML = image[soldier];
            singleRow.append(singleNode);
        }
        container.append(singleRow);
    }
}

function getPlayer(n) {
    if (n === 0 || n === 1) return "white";
    else if (n === 6 || n === 7) return "black";
    else return "none";
}


function node(row, col, className, playerName, soldier) {
    let singleDiv = createElement("div", className);
    singleDiv.setAttribute("data_row", row);
    singleDiv.setAttribute("data_col", col);
    singleDiv.setAttribute("visited", false);
    singleDiv.setAttribute("player", playerName);
    singleDiv.setAttribute("soldier", soldier)


    return singleDiv;
}

function createElement(tagName, className) {
    let element = document.createElement(tagName);
    element.className = className;
    return element;
}

document.body.append(container);