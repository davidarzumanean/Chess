window.onload = function () {
    chess.init();
};

var chess = {

    init : function() {
        chess.initBoard();
    },
    chessBoard: {},
    board: []
};