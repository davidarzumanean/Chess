chess.convertPawn = function(pawn, pawnUi, dropX, dropY) {
    var boardContainer = document.getElementById('boardContainer');
    var color = pawn.color;
    var coords = pawn.coords;

    var pieceContainer =  document.createElement('div');
    pieceContainer.classList.add('convert-pieces-container');
    boardContainer.appendChild(pieceContainer);

    var overlay = document.getElementsByClassName('f_overlay')[0];
    overlay.classList.add('is_active');
    document.getElementById('board').classList.add('disable-pointer');

    var piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.position = 'static';

    piece.onclick = function() {
        chess.board[coords[1]][coords[0]] = null;

        var selectedType = this.getAttribute('data-type');

        function convertPieceUi(type) {
            pawnUi.classList.remove(color + '-pawn');
            pawnUi.classList.add(color + '-' + type);
        }

        switch(selectedType) {
            case 'Rook':
                chess.board[dropY][dropX] = new Rook(color, [dropX, dropY]);
                convertPieceUi('rook');
                break;
            case 'Knight':
                chess.board[dropY][dropX] = new Knight(color, [dropX, dropY]);
                convertPieceUi('knight');
                break;
            case 'Bishop':
                chess.board[dropY][dropX] = new Bishop(color, [dropX, dropY]);
                convertPieceUi('bishop');
                break;
            case 'Queen':
                chess.board[dropY][dropX] = new Queen(color, [dropX, dropY]);
                convertPieceUi('queen');
                break;
        }

        pieceContainer.remove();
        overlay.classList.remove('is_active');
        document.getElementById('board').classList.remove('disable-pointer');
    };

    var rook = piece.cloneNode(true);
    rook.onclick = piece.onclick;
    rook.dataset.type = 'Rook';
    rook.classList.add(color + '-rook');

    var knight = piece.cloneNode(true);
    knight.onclick = piece.onclick;
    knight.dataset.type = 'Knight';
    knight.classList.add(color + '-knight');

    var bishop = piece.cloneNode(true);
    bishop.onclick = piece.onclick;
    bishop.dataset.type = 'Bishop';
    bishop.classList.add(color + '-bishop');

    var queen = piece.cloneNode(true);
    queen.onclick = piece.onclick;
    queen.dataset.type = 'Queen';
    queen.classList.add(color + '-queen');

    pieceContainer.appendChild(rook);
    pieceContainer.appendChild(knight);
    pieceContainer.appendChild(bishop);
    pieceContainer.appendChild(queen);


};