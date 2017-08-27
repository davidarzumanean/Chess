chess.isCheck = function () {
    var reverseColor = {
        black: 'white',
        white: 'black'
    };
    for (var yCoord = 7; yCoord >= 0; yCoord--) {
        for (var xCoord in chess.board[yCoord]) {
            if (chess.board[yCoord][xCoord] !== null) {

                var thisPiece = chess.board[yCoord][xCoord];
                var enemyColor = reverseColor[thisPiece.color];
                var check = thisPiece.validateMove(KINGSPOSITION[enemyColor]);

                if (check.success === true) {
                    alert(thisPiece.color + ' checked');
                }
            }
        }
    }
};

chess.isMate = function () {
    var whiteKingCoords = KINGSPOSITION.white;
    var blackKingCoords = KINGSPOSITION.black;
    var whiteKing = chess.board[whiteKingCoords.y][whiteKingCoords.x];
    var blackKing = chess.board[blackKingCoords.y][blackKingCoords.x];

    if (!(whiteKing instanceof King)) {
        alert('Black Won!');
        location.reload();
    } else if (!(blackKing instanceof King)) {
        alert('White Won!');
        location.reload();
    }
};