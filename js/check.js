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

                if(check.success === true) {
                    console.log(thisPiece.color + ' checked');
                }

            } else {
                continue;
            }
        }
    }
}