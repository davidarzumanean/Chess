function Piece(color, coords) {
    this.color = color;
    this.coords = coords;
    this.validateMove = function () {
    };
}

chess.initPieces = function(){
    (function initPawns() {
        for(var cell in chess.board[1]){
            chess.board[1][cell] = new Pawn('white', [cell ,1]);
        }

        for(var cell in chess.board[6]){
            chess.board[6][cell] = new Pawn('black', [cell ,6]);
        }
    }());

    (function initRooks(){
        chess.board[0].a = new Rook('white', ['a' ,0]);
        chess.board[0].h = new Rook('white', ['h' ,0]);
        chess.board[7].a = new Rook('black', ['a' ,7]);
        chess.board[7].h = new Rook('black', ['h' ,7]);
    }());

    (function initKnights(){
        chess.board[0].b = new Knight('white', ['b' ,0]);
        chess.board[0].g = new Knight('white', ['g' ,0]);
        chess.board[7].b = new Knight('black', ['b' ,7]);
        chess.board[7].g = new Knight('black', ['g' ,7]);
    }());

    (function initBishops(){
        chess.board[0].c = new Bishop('white', ['c' ,0]);
        chess.board[0].f = new Bishop('white', ['f' ,0]);
        chess.board[7].c = new Bishop('black', ['c' ,7]);
        chess.board[7].f = new Bishop('black', ['f' ,7]);
    }());

    (function initQueens(){
        chess.board[0].d = new Queen('white', ['d' ,0]);
        chess.board[7].d = new Queen('black', ['d' ,7]);
    }());

    (function initKings(){
        chess.board[0].e = new King('white', ['e' ,0]);
        chess.board[7].e = new King('black', ['e' ,7]);
    }());

    drawPieces();
}

function drawPieces() {
    var chessPiece = document.createElement('div');
    chessPiece.classList.add('piece', 'f_piece');
    var className;

    for( var i = 0; i < 8; i++){
        for(var cell in chess.board[i]){
            if(chess.board[i][cell]){
                var pos = chess.board[i][cell].coords[0] + '-' + chess.board[i][cell].coords[1];
                var rank = chess.board[i][cell].constructor.name.toLowerCase();
                var color = chess.board[i][cell].color;

                className = color + '-' + rank;
                chessPiece.classList.add(className);

                document.getElementById(pos).appendChild(chessPiece.cloneNode(true));

                chessPiece.classList.remove(className);
            }
        }
    }
}