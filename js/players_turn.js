chess.playersTurn = {
    pieceColorArr: [WHITEPIECE, BLACKPIECE],
    turnIndex: 0
};

var turn = chess.playersTurn;

turn.colorTurn = turn.pieceColorArr[turn.turnIndex];

turn.nextPlayer = function () {
    turn.turnIndex = (turn.turnIndex + 1) % 2;
    turn.colorTurn = turn.pieceColorArr[turn.turnIndex];
};