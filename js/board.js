chess.initBoard = function () {
    var table = document.createElement("table");
    table.setAttribute("class", "board");
    table.setAttribute("id", "board");
    document.body.appendChild(table);

    chess.chessBoard = table;

    for (var i = 7; i >= 0; i--) {
        chess.board[i] = {a: null, b: null, c: null, d: null, e: null, f: null, g: null, h: null};
        var row = document.createElement("tr");
        table.appendChild(row);


        for(var cell in chess.board[i]){
            var boardCell = document.createElement("td");
            row.appendChild(boardCell);
            boardCell.setAttribute('id', cell + '-' + i);
            boardCell.classList.add('f_board-cell');
        }
    }

    chess.initPieces();
};