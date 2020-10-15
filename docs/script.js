let h1 = createElement("h1", "result");

h1.innerHTML = "CHESS GAME";

let whoseTurn = createElement("h1", "turn");
whoseTurn.innerHTML = "white";

let button = createElement("button", "btn");
button.type = "button";
button.innerHTML = "RESTART";

function resetAll() {
  restartGame();
  let turn = document.querySelector(".turn");
  turn.innerHTML = "white";
  container.addEventListener("click", (e) => {
    // console.log(e.target);
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
      if (oldSingleHighlight) {
        let temp = document.querySelector(
          `[data_row="${oldSingleHighlight[0]}"][data_col="${oldSingleHighlight[1]}"]`
        );
        temp.style = "none";
        currentHighligh = "";
      }

      currentHighligh = selectHighlight(row, col);
      oldSingleHighlight = currentHighligh;

      if (oldValues.length > 0) {
        for (let i = 0; i < oldValues.length; i++) {
          let temp = document.querySelector(
            `[data_row="${oldValues[i][0]}"][data_col="${oldValues[i][1]}"]`
          );

          temp.style = "none";
        }
        oldValues = [];
      }

      if (selectedPiece === "pawn") {
        changedCol = displayPoss(oldPosition[0], oldPosition[1], currentPlayer);
        oldValues = changedCol;
      }
      oldPosition.push(currentPlayer, soldier);
    } else {
      if (selectedPiece !== "") {
        if (
          row >= 0 &&
          row <= 7 &&
          col >= 0 &&
          col <= 7 &&
          isMovable(
            row,
            col,
            selectedPiece,
            oldPosition[0],
            oldPosition[1],
            currentTurn
          )
        ) {
          removeOldPos(oldPosition[0], oldPosition[1]);
          removeOldPos(row, col);
          updatePos(row, col, oldPosition[2], oldPosition[3], selectedPiece);
          if (oldSingleHighlight) {
            let temp = document.querySelector(
              `[data_row="${oldSingleHighlight[0]}"][data_col="${oldSingleHighlight[1]}"]`
            );
            temp.style = "none";
            currentHighligh = "";
          }
          if (changedCol.length > 0) {
            for (let i = 0; i < changedCol.length; i++) {
              let temp = document.querySelector(
                `[data_row="${changedCol[i][0]}"][data_col="${changedCol[i][1]}"]`
              );
              if (!temp) continue;
              temp.style = "none";
            }
            changedCol = [];
          }
          let blackKing = document.querySelector(
            `[soldier="king"][player="black"]`
          );
          let whiteKing = document.querySelector(
            `[soldier="king"][player="white"]`
          );
          let h1 = document.querySelector(".result");
          if (!blackKing) {
            h1.innerHTML = "PLAYER 1 WON";
            setTimeout(() => {
              restartGame();
            }, 5000);
          }
          if (!whiteKing) {
            h1.innerHTML = "PLAYER 2 WON";
            setTimeout(() => {
              restartGame();
            }, 5000);
          }
          oldPosition = [];
          selectedPiece = "";
          currentTurn = currentTurn === "white" ? "black" : "white";
        }
      }
    }
  });
}

button.addEventListener("click", () => {
  resetAll();
});

let selectedPiece = "";
let oldPosition = [];
let currentTurn = "white";
let changedCol = [];
let oldValues = [];
let currentHighligh = "";
let oldSingleHighlight = "";

let image = {
  pawn: "fas fa-chess-pawn fa-3x",
  knight: "fas fa-chess-knight fa-3x",
  rook: "fas fa-chess-rook fa-3x",
  bishop: "fas fa-chess-bishop fa-3x",
  queen: "fas fa-chess-queen fa-3x",
  king: "fas fa-chess-king fa-3x",
};

let container;

function restartGame() {
  let h1 = document.querySelector(".result");
  h1.innerHTML = "CHESS GAME";
  selectedPiece = "";
  oldPosition = [];
  currentTurn = "white";
  changedCol = [];
  oldValues = [];
  currentHighligh = "";
  oldSingleHighlight = "";
  createGrid();
}

createGrid();

container.addEventListener("click", (e) => {
  //   e.stopPropagation();
  //   console.log(e.target);
  let whoseTurn = document.querySelector(".turn");

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
    if (oldSingleHighlight) {
      let temp = document.querySelector(
        `[data_row="${oldSingleHighlight[0]}"][data_col="${oldSingleHighlight[1]}"]`
      );
      temp.style = "none";
      currentHighligh = "";
    }

    currentHighligh = selectHighlight(row, col);
    oldSingleHighlight = currentHighligh;

    if (oldValues.length > 0) {
      for (let i = 0; i < oldValues.length; i++) {
        let temp = document.querySelector(
          `[data_row="${oldValues[i][0]}"][data_col="${oldValues[i][1]}"]`
        );

        temp.style = "none";
      }
      oldValues = [];
    }

    if (selectedPiece === "pawn") {
      changedCol = displayPoss(oldPosition[0], oldPosition[1], currentPlayer);
      oldValues = changedCol;
    }
    oldPosition.push(currentPlayer, soldier);
  } else {
    if (selectedPiece !== "") {
      if (
        row >= 0 &&
        row <= 7 &&
        col >= 0 &&
        col <= 7 &&
        isMovable(
          row,
          col,
          selectedPiece,
          oldPosition[0],
          oldPosition[1],
          currentTurn
        )
      ) {
        removeOldPos(oldPosition[0], oldPosition[1]);
        removeOldPos(row, col);
        updatePos(row, col, oldPosition[2], oldPosition[3], selectedPiece);
        if (oldSingleHighlight) {
          let temp = document.querySelector(
            `[data_row="${oldSingleHighlight[0]}"][data_col="${oldSingleHighlight[1]}"]`
          );
          temp.style = "none";
          currentHighligh = "";
        }
        if (changedCol.length > 0) {
          for (let i = 0; i < changedCol.length; i++) {
            let temp = document.querySelector(
              `[data_row="${changedCol[i][0]}"][data_col="${changedCol[i][1]}"]`
            );
            if (!temp) continue;
            temp.style = "none";
          }
          changedCol = [];
        }
        let blackKing = document.querySelector(
          `[soldier="king"][player="black"]`
        );
        let whiteKing = document.querySelector(
          `[soldier="king"][player="white"]`
        );
        let h1 = document.querySelector(".result");
        if (!blackKing) {
          h1.innerHTML = "PLAYER 1 WON";
          setTimeout(() => {
            resetAll();
          }, 5000);
        }
        if (!whiteKing) {
          h1.innerHTML = "PLAYER 2 WON";
          setTimeout(() => {
            resetAll();
          }, 5000);
        }
        oldPosition = [];
        selectedPiece = "";
        currentTurn = currentTurn === "white" ? "black" : "white";
        whoseTurn.innerHTML = currentTurn;
      }
    }
  }
});

function isMovable(newRow, newCol, soldier, startRow, startCol, playerMoved) {
  startRow = parseInt(startRow);
  startCol = parseInt(startCol);
  newRow = +newRow;
  newCol = +newCol;
  let opponent = playerMoved === "white" ? "black" : "white";
  let allNodes = document.querySelectorAll(
    `[soldier="none"],[player="${opponent}"]`
  );
  if (soldier === "pawn") {
    let possibleMove = 1;
    if (startRow === 1 || startRow === 6) {
      possibleMove += 1;
    }

    if (playerMoved === "white") {
      let isEmemyLeft = document.querySelector(
        `[data_row="${startRow + 1}"][data_col="${
          startCol - 1
        }"][player="${opponent}"]`
      );
      let isEmemyRight = document.querySelector(
        `[data_row="${startRow + 1}"][data_col="${
          startCol + 1
        }"][player="${opponent}"]`
      );
      if (newCol === startCol) {
        let possiblePaths = [];
        for (let temp = 1; temp <= possibleMove; temp++) {
          let pushRow = checkOpponentAcquired(
            startRow + temp,
            startCol,
            opponent,
            playerMoved
          );
          if (pushRow) break;
          possiblePaths.push(startRow + temp);
        }
        for (let i = 0; i < possiblePaths.length; i++) {
          if (
            newRow === possiblePaths[i] &&
            newCol === startCol &&
            newCol - startCol < possibleMove
          ) {
            return true;
          }
        }
      } else if (
        (newCol === startCol + 1 || newCol === startCol - 1) &&
        newRow === startRow + 1 &&
        playerMoved !== opponent &&
        (isEmemyLeft || isEmemyRight)
      ) {
        return true;
      }
    } else {
      let isEmemyLeft = document.querySelector(
        `[data_row="${startRow - 1}"][data_col="${
          startCol - 1
        }"][player="${opponent}"]`
      );
      let isEmemyRight = document.querySelector(
        `[data_row="${startRow - 1}"][data_col="${
          startCol + 1
        }"][player="${opponent}"]`
      );
      if (newCol === startCol) {
        let possiblePaths = [];
        for (let temp = 1; temp <= possibleMove; temp++) {
          let pushRow = checkOpponentAcquired(
            startRow - temp,
            startCol,
            opponent,
            playerMoved
          );
          if (pushRow) break;
          possiblePaths.push(startRow - temp);
        }
        for (let i = 0; i < possiblePaths.length; i++) {
          if (
            newRow === possiblePaths[i] &&
            newCol === startCol &&
            startCol - newCol < possibleMove
          ) {
            return true;
          }
        }
      } else if (
        (newCol === startCol + 1 || newCol === startCol - 1) &&
        newRow === startRow - 1 &&
        playerMoved !== opponent &&
        (isEmemyLeft || isEmemyRight)
      ) {
        return true;
      }
    }
  } else if (soldier === "rook") {
    if (newCol === startCol) {
      let start = newRow > startRow ? startRow : newRow;
      let end = newRow > startRow ? newRow : startRow;
      for (let i = start + 1; i <= end; i++) {
        if (i === startRow) continue;
        let isOpponent = document.querySelector(
          `[data_row="${i}"][data_col="${newCol}"][player="${opponent}"]`
        );
        if (isOpponent && i === end) return true;
        let temp = document.querySelector(
          `[data_row="${i}"][data_col="${newCol}"][player="none"]`
        );
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
        let isOpponent = document.querySelector(
          `[data_row="${newRow}"][data_col="${i}"][player="${opponent}"]`
        );
        if (isOpponent && i === end) return true;
        let temp = document.querySelector(
          `[data_row="${newRow}"][data_col="${i}"][player="none"]`
        );
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
      [startRow - 2, startCol + 1],
    ];
    for (let i = 0; i < possibleMoves.length; i++) {
      if (newRow === possibleMoves[i][0] && newCol === possibleMoves[i][1]) {
        let checkEmpty = document.querySelector(
          `[data_row="${newRow}"][data_col="${newCol}"][player="${playerMoved}"]`
        );
        if (checkEmpty) return false;
        return true;
      }
    }
    return false;
  } else if (soldier === "bishop") {
    if (newRow === startRow || newCol === startCol) return false;
    let possibleMoves = checkDiagonal(
      newRow,
      newCol,
      startRow,
      startCol,
      playerMoved,
      opponent
    );
    for (let i = 0; i < possibleMoves.length; i++) {
      if (newRow === possibleMoves[i][0] && newCol === possibleMoves[i][1])
        return true;
    }
    return false;
  } else if (soldier === "queen") {
    let possibleMoves = checkDiagonal(
      newRow,
      newCol,
      startRow,
      startCol,
      playerMoved,
      opponent
    );
    for (let i = 0; i < possibleMoves.length; i++) {
      if (newRow === possibleMoves[i][0] && newCol === possibleMoves[i][1]) {
        return true;
      }
    }
    let verticalMoves = checkVertical(
      newRow,
      newCol,
      startRow,
      startCol,
      playerMoved,
      opponent
    );
    for (let i = 0; i < verticalMoves.length; i++) {
      if (newRow === verticalMoves[i][0] && newCol === verticalMoves[i][1])
        return true;
    }
    return false;
  } else if (soldier === "king") {
    let possibleMoves = [
      [startRow + 1, startCol],
      [startRow - 1, startCol],
      [startRow, startCol + 1],
      [startRow, startCol - 1],
      [startRow + 1, startCol - 1],
      [startRow + 1, startCol + 1],
      [startRow - 1, startCol - 1],
      [startRow - 1, startCol + 1],
    ];
    for (let i = 0; i < possibleMoves.length; i++) {
      if (newRow === possibleMoves[i][0] && newCol === possibleMoves[i][1]) {
        let checkEmpty = document.querySelector(
          `[data_row="${newRow}"][data_col="${newCol}"][player="${playerMoved}"]`
        );
        if (checkEmpty) return false;
        return true;
      }
    }
    return false;
  }
}

function checkVertical(
  newRow,
  newCol,
  startRow,
  startCol,
  playerMoved,
  opponent
) {
  let possibleMoves = [];
  if (newRow === startRow) {
    let start = newCol > startCol ? startCol : newCol;
    let end = newCol > startCol ? newCol : startCol;
    for (let i = start; i <= end; i++) {
      if (i === startCol) continue;
      let isEmpty = document.querySelector(
        `[data_row="${startRow}"][data_col="${i}"][player="${playerMoved}"]`
      );
      if (isEmpty) break;
      let isEnemy = document.querySelector(
        `[data_row="${startRow}"][data_col="${i}"][player="${opponent}"]`
      );
      if (isEnemy) {
        possibleMoves.push([startRow, i]);
        break;
      }
      possibleMoves.push([newRow, i]);
    }
  }
  if (newCol === startCol) {
    let start = newRow > startRow ? startRow : newRow;
    let end = newRow > startRow ? newRow : startRow;
    for (let i = start; i <= end; i++) {
      if (i === startRow) continue;
      let isEmpty = document.querySelector(
        `[data_row="${i}"][data_col="${startCol}"][player="${playerMoved}"]`
      );
      if (isEmpty) break;
      let isEnemy = document.querySelector(
        `[data_row="${i}"][data_col="${startCol}"][player="${opponent}"]`
      );
      if (isEnemy) {
        possibleMoves.push([i, startCol]);
        break;
      }
      possibleMoves.push([i, newCol]);
    }
  }
  return possibleMoves;
}

function checkDiagonal(
  newRow,
  newCol,
  startRow,
  startCol,
  playerMoved,
  opponent
) {
  let possibleMoves = [];
  let start = newRow > startRow ? startRow : newRow;
  let end = newRow > startRow ? newRow : startRow;
  let k = 0;
  for (let i = start; i <= end; i++) {
    k++;
    let isEmpty = document.querySelector(
      `[data_row="${startRow + k}"][data_col="${
        startCol + k
      }"][player="${playerMoved}"]`
    );
    if (isEmpty) break;
    let isEnemy = document.querySelector(
      `[data_row="${startRow + k}"][data_col="${
        startCol + k
      }"][player="${opponent}"]`
    );
    if (isEnemy) {
      possibleMoves.push([startRow + k, startCol + k]);
      break;
    }
    possibleMoves.push([startRow + k, startCol + k]);
  }
  k = 0;
  for (let i = start; i <= end; i++) {
    k++;
    let isEmpty = document.querySelector(
      `[data_row="${startRow + k}"][data_col="${
        startCol - k
      }"][player="${playerMoved}"]`
    );
    if (isEmpty) break;
    let isEnemy = document.querySelector(
      `[data_row="${startRow + k}"][data_col="${
        startCol - k
      }"][player="${opponent}"]`
    );
    if (isEnemy) {
      possibleMoves.push([startRow + k, startCol - k]);
      break;
    }
    possibleMoves.push([startRow + k, startCol - k]);
  }
  k = 0;
  for (let i = start; i <= end; i++) {
    k++;
    let isEmpty = document.querySelector(
      `[data_row="${startRow - k}"][data_col="${
        startCol + k
      }"][player="${playerMoved}"]`
    );
    if (isEmpty) break;
    let isEnemy = document.querySelector(
      `[data_row="${startRow - k}"][data_col="${
        startCol + k
      }"][player="${opponent}"]`
    );
    if (isEnemy) {
      possibleMoves.push([startRow - k, startCol + k]);
      break;
    }
    possibleMoves.push([startRow - k, startCol + k]);
  }
  k = 0;
  for (let i = start; i <= end; i++) {
    k++;
    let isEmpty = document.querySelector(
      `[data_row="${startRow - k}"][data_col="${
        startCol - k
      }"][player="${playerMoved}"]`
    );
    if (isEmpty) break;
    let isEnemy = document.querySelector(
      `[data_row="${startRow - k}"][data_col="${
        startCol - k
      }"][player="${opponent}"]`
    );
    if (isEnemy) {
      possibleMoves.push([startRow - k, startCol - k]);
      break;
    }
    possibleMoves.push([startRow - k, startCol - k]);
  }
  return possibleMoves;
}

function checkOpponentAcquired(row, col, opponent, basePlayer) {
  let canMove = true;
  let pos = document.querySelector(
    `[data_row="${row}"][data_col="${col}"][player="none"]`
  );
  if (pos) return false;
  else return true;
}

function removeOldPos(row, col) {
  let oldNode = document.querySelector(
    `[data_row="${row}"][data_col="${col}"]`
  );
  let img;
  if (oldNode.childNodes.length !== 0) {
    img = oldNode.childNodes[0];
    oldNode.removeChild(img);
  }
  oldNode.setAttribute("player", "none");
  oldNode.setAttribute("soldier", "none");
}

function updatePos(row, col, currentPlayer, soldier, selectedPiece) {
  let selectedNode = document.querySelector(
    `[data_row="${row}"][data_col="${col}"]`
  );
  let img = createElement("img");
  img.src = "images/" + soldier + "_" + currentPlayer + ".png";
  img.setAttribute("data_row", row);
  img.setAttribute("data_col", col);
  img.setAttribute("visited", false);
  img.setAttribute("player", currentPlayer);
  img.setAttribute("soldier", soldier);
  selectedNode.append(img);
  selectedNode.setAttribute("player", currentPlayer);
  selectedNode.setAttribute("soldier", soldier);
}

function createGrid() {
  document.body.innerHTML = "";
  container = createElement("div", "container");
  for (let i = 0; i < 8; i++) {
    let singleRow = createElement("div", "row");
    let className = "";
    let player = getPlayer(i);
    let soldier = "none";
    for (let j = 0; j < 8; j++) {
      let currentRow = i + 1,
        currentCol = j + 1;
      if (
        (currentRow % 2 === 1 && currentCol % 2 === 1) ||
        (currentRow % 2 === 0 && currentCol % 2 === 0)
      ) {
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
      if (soldier !== "none") {
        let img = createElement("img");
        img.src = "images/" + soldier + "_" + player + ".png";
        // i = createElement("div", className);
        img.setAttribute("data_row", i);
        img.setAttribute("data_col", j);
        img.setAttribute("visited", false);
        img.setAttribute("player", player);
        img.setAttribute("soldier", soldier);
        singleNode.append(img);
      }
      singleRow.append(singleNode);
    }
    container.append(singleRow);
  }
  document.body.append(button, h1, container);
}

function getPlayer(n) {
  if (n === 0 || n === 1) return "white";
  else if (n === 6 || n === 7) return "black";
  else return "none";
}

function displayPoss(startRow, startCol, player) {
  //   enemy = enemy === "white" ? "black" : "white";
  let enemy = player === "white" ? "black" : "white";
  (startCol = +startCol), (startRow = +startRow);
  let possibleMove = 1;
  let changedCol = [];
  if (startRow === 1 || startRow === 6) {
    possibleMove += 1;
  }
  if (player === "white") {
    let left = document.querySelector(
      `[data_row="${startRow + 1}"][data_col="${
        startCol + 1
      }"][player="${enemy}"]`
    );
    let right = document.querySelector(
      `[data_row="${startRow + 1}"][data_col="${
        startCol - 1
      }"][player="${enemy}"]`
    );
    console.log(left, right, startRow + 1, startCol + 1, enemy);
    if (left) changedCol.push([startRow + 1, startCol + 1]);
    if (right) changedCol.push([startRow + 1, startCol - 1]);
    if (possibleMove === 2) {
      changedCol.push([startRow + 1, startCol], [startRow + 2, startCol]);
    } else {
      changedCol.push([startRow + 1, startCol]);
    }
  } else {
    let left = document.querySelector(
      `[data_row="${startRow - 1}"][data_col="${
        startCol + 1
      }"][player="${enemy}"]`
    );
    let right = document.querySelector(
      `[data_row="${startRow - 1}"][data_col="${
        startCol - 1
      }"][player="${enemy}"]`
    );
    if (left) changedCol.push([startRow - 1, startCol + 1]);
    if (right) changedCol.push([startRow - 1, startCol - 1]);
    if (possibleMove === 2) {
      changedCol.push([startRow - 1, startCol], [startRow - 2, startCol]);
    } else {
      changedCol.push([startRow - 1, startCol]);
    }
  }

  for (let i = 0; i < changedCol.length; i++) {
    let temp = document.querySelector(
      `[data_row="${changedCol[i][0]}"][data_col="${changedCol[i][1]}"][player="none"]`
    );
    if (!temp) {
      if (startCol !== changedCol[i][1]) {
        temp = document.querySelector(
          `[data_row="${changedCol[i][0]}"][data_col="${changedCol[i][1]}"][player="${enemy}"]`
        );
      }
    }
    if (!temp) break;
    oldValues.push(temp.getAttribute("class"));
    temp.style.backgroundColor = "yellow";
  }
  return changedCol;
}

function selectHighlight(row, col) {
  let temp = document.querySelector(`[data_row="${row}"][data_col="${col}"]`);
  oldSingleHighlight = [row, col];
  temp.style.backgroundColor = "green";
  return oldSingleHighlight;
}

function node(row, col, className, playerName, soldier) {
  let singleDiv = createElement("div", className);
  singleDiv.setAttribute("data_row", row);
  singleDiv.setAttribute("data_col", col);
  singleDiv.setAttribute("visited", false);
  singleDiv.setAttribute("player", playerName);
  singleDiv.setAttribute("soldier", soldier);
  return singleDiv;
}

function createElement(tagName, className) {
  let element = document.createElement(tagName);
  element.className = className;
  return element;
}
