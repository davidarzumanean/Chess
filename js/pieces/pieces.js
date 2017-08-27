function Piece(color, coords) {
    this.color = color;
    this.coords = coords;
    this.validateMove = function () {
    };
}

var pieces = {
    init: function() {
        this.initPawns();
        this.initRooks();
        this.initKnights();
        this.initBishops();
        this.initQueens();
        this.initKings();
    },

    initPawns: function () {
        for(var cell in chess.board[ROW_1]){
            chess.board[ROW_1][cell] = new Pawn(WHITEPIECE, [cell ,ROW_1]);
        }

        for(var cell in chess.board[6]){
            chess.board[ROW_6][cell] = new Pawn(BLACKPIECE, [cell ,ROW_6]);
        }
    },

    initRooks: function (){
        chess.board[ROW_0].a = new Rook(WHITEPIECE, [COL_A ,ROW_0]);
        chess.board[ROW_0].h = new Rook(WHITEPIECE, [COL_H ,ROW_0]);
        chess.board[ROW_7].a = new Rook(BLACKPIECE, [COL_A ,ROW_7]);
        chess.board[ROW_7].h = new Rook(BLACKPIECE, [COL_H ,ROW_7]);
    },

    initKnights: function (){
        chess.board[ROW_0].b = new Knight(WHITEPIECE, [COL_B ,ROW_0]);
        chess.board[ROW_0].g = new Knight(WHITEPIECE, [COL_G ,ROW_0]);
        chess.board[ROW_7].b = new Knight(BLACKPIECE, [COL_B ,ROW_7]);
        chess.board[ROW_7].g = new Knight(BLACKPIECE, [COL_G ,ROW_7]);
    },

    initBishops: function (){
        chess.board[ROW_0].c = new Bishop(WHITEPIECE, [COL_C ,ROW_0]);
        chess.board[ROW_0].f = new Bishop(WHITEPIECE, [COL_F ,ROW_0]);
        chess.board[ROW_7].c = new Bishop(BLACKPIECE, [COL_C ,ROW_7]);
        chess.board[ROW_7].f = new Bishop(BLACKPIECE, [COL_F ,ROW_7]);
    },

    initQueens: function (){
        chess.board[ROW_0].d = new Queen(WHITEPIECE, [COL_D ,ROW_0]);
        chess.board[ROW_7].d = new Queen(BLACKPIECE, [COL_D ,ROW_7]);
    },

    initKings: function (){
        chess.board[ROW_0].e = new King(WHITEPIECE, [COL_E ,ROW_0]);
        chess.board[ROW_7].e = new King(BLACKPIECE, [COL_E ,ROW_7]);
    },

    drawPieces: function() {
        var chessPiece = document.createElement('div');
        chessPiece.classList.add('piece', 'f_piece');
        var className;

        for( var row = 0; row < 8; row++){
            for(var cell in chess.board[row]){
                var pieceObj = chess.board[row][cell];
                if(pieceObj){
                    var pos = pieceObj.coords[0] + '-' + pieceObj.coords[1];
                    var rank = pieceObj.constructor.name.toLowerCase();
                    var color = pieceObj.color;

                    className = color + '-' + rank;
                    chessPiece.classList.add(className);

                    document.getElementById(pos).appendChild(chessPiece.cloneNode(true));

                    chessPiece.classList.remove(className);
                }
            }
        }
    }
};

