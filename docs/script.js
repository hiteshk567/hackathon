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


    // if (soldier !== "none") {
    //     selectedPiece = soldier;
    // } else {

    //     if (selectedPiece !== "")
    //         updatePos(row, col, currentPlayer, soldier, selectedPiece);
    // }

    console.log(row, col, color, isVisited, currentPlayer, soldier);
});

function updatePos(row, col, currentPlayer, soldier, selectedPiece) {
    // let newPos = document.querySelector(`[data_row="1"`);
    console.log("a");
    // console.log(newPost);
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