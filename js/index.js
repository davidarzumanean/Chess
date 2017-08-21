window.onload = function () {
    chess.init();
};

var chess = {

    init : function() {
        this.initBoard();
    },
    chessBoard: {},
    board: []
};