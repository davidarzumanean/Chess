chess.initBoard = function () {
    var table = document.createElement("table");
    table.setAttribute("class", "board");
    table.setAttribute("id", "board");
    document.getElementById('boardContainer').appendChild(table);

    chess.chessBoard = table;

    for (var boardRow = 7; boardRow >= 0; boardRow--) {
        chess.board[boardRow] = {a: null, b: null, c: null, d: null, e: null, f: null, g: null, h: null};
        var row = document.createElement("tr");
        table.appendChild(row);


        for(var boardCol in chess.board[boardRow]){
            var boardCell = document.createElement("td");
            row.appendChild(boardCell);
            boardCell.setAttribute('id', boardCol + '-' + boardRow);
            boardCell.classList.add('f_board-cell');
        }
    }

    pieces.init();
    pieces.drawPieces();
};