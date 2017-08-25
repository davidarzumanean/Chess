chess.isCheck = function () {
    var reverseColor = {
        black: 'white',
        white: 'black'
    }
    for (var i = 7; i >= 0; i--) {
        for (var xCoord in chess.board[i]) {
            if (chess.board[i][xCoord] !== null) {

                var thisPiece = chess.board[i][xCoord];
                var enemyColor = reverseColor[thisPiece.color];
                var check = thisPiece.validateMove(kingsPosition[enemyColor]);

                if (check.success === true) {
                    alert(thisPiece.color + ' checked');
                }

            } else {
                continue;
            }
        }
    }
}

chess.isMate = function () {
    var whiteKingCoors = kingsPosition.white;
    var blackKingCoors = kingsPosition.black;
    var whiteKing = chess.board[whiteKingCoors.y][whiteKingCoors.x];
    var blackKing = chess.board[blackKingCoors.y][blackKingCoors.x];

    if (!(whiteKing instanceof King)) {
        alert('Black Won!');
        location.reload();
    } else if (!(blackKing instanceof King)) {
        alert('White Won!');
        location.reload();
    }
}