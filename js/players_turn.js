chess.checkPlayersTurn = {
    pieceColorArr: ['white', 'black'],
    turnIndex: 0
}

var turn = chess.checkPlayersTurn;

turn.colorTurn = turn.pieceColorArr[turn.turnIndex];

turn.changeTheTurn = function () {
    turn.turnIndex = (turn.turnIndex + 1) % 2;
    turn.colorTurn = turn.pieceColorArr[turn.turnIndex];
}