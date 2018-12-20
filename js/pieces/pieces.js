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
            chess.board[ROW_1][cell] = new Pawn(WHITEPIECE, {x: cell ,y: ROW_1});
        }

        for(var cell in chess.board[ROW_6]){
            chess.board[ROW_6][cell] = new Pawn(BLACKPIECE, {x: cell ,y: ROW_6});
        }
    },

    initRooks: function (){
        chess.board[ROW_0].a = new Rook(WHITEPIECE, {x: COL_A ,y: ROW_0});
        chess.board[ROW_0].h = new Rook(WHITEPIECE, {x: COL_H ,y: ROW_0});
        chess.board[ROW_7].a = new Rook(BLACKPIECE, {x: COL_A ,y: ROW_7});
        chess.board[ROW_7].h = new Rook(BLACKPIECE, {x: COL_H ,y: ROW_7});
    },

    initKnights: function (){
        chess.board[ROW_0].b = new Knight(WHITEPIECE, {x: COL_B ,y: ROW_0});
        chess.board[ROW_0].g = new Knight(WHITEPIECE, {x: COL_G ,y: ROW_0});
        chess.board[ROW_7].b = new Knight(BLACKPIECE, {x: COL_B ,y: ROW_7});
        chess.board[ROW_7].g = new Knight(BLACKPIECE, {x: COL_G ,y: ROW_7});
    },

    initBishops: function (){
        chess.board[ROW_0].c = new Bishop(WHITEPIECE, {x: COL_C ,y: ROW_0});
        chess.board[ROW_0].f = new Bishop(WHITEPIECE, {x: COL_F ,y: ROW_0});
        chess.board[ROW_7].c = new Bishop(BLACKPIECE, {x: COL_C ,y: ROW_7});
        chess.board[ROW_7].f = new Bishop(BLACKPIECE, {x: COL_F ,y: ROW_7});
    },

    initQueens: function (){
        chess.board[ROW_0].d = new Queen(WHITEPIECE, {x: COL_D ,y: ROW_0});
        chess.board[ROW_7].d = new Queen(BLACKPIECE, {x: COL_D ,y: ROW_7});
    },

    initKings: function (){
        chess.board[ROW_0].e = new King(WHITEPIECE, {x: COL_E ,y: ROW_0});
        chess.board[ROW_7].e = new King(BLACKPIECE, {x: COL_E ,y: ROW_7});
    },

    drawPieces: function() {
        var chessPiece = document.createElement('div');
        chessPiece.classList.add('piece', 'f_piece');
        var className;

        for( var row = 0; row < 8; row++){
            for(var cell in chess.board[row]){
                var pieceObj = chess.board[row][cell];
                if(pieceObj){
                    var pos = pieceObj.coords.x + '-' + pieceObj.coords.y;
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

