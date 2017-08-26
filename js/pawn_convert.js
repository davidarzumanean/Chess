chess.convertPawn = function(pawn, dropX, dropY) {
    var boardContainer = document.getElementById('boardContainer');
    var color = pawn.color;
    var coords = pawn.coords;

    var pieceContainer =  document.createElement('div');
    pieceContainer.classList.add('convert-pieces-container');
    boardContainer.appendChild(pieceContainer);

    var piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.position = 'static';

    var rook = piece.cloneNode(true);
    rook.dataset.type = 'Rook';
    rook.classList.add(color + '-rook');

    var knight = piece.cloneNode(true);
    knight.dataset.type = 'Knight';
    knight.classList.add(color + '-knight');

    var bishop = piece.cloneNode(true);
    bishop.dataset.type = 'Bishop';
    bishop.classList.add(color + '-bishop');

    var queen = piece.cloneNode(true);
    queen.dataset.type = 'Queen';
    queen.classList.add(color + '-queen');

    pieceContainer.appendChild(rook);
    pieceContainer.appendChild(knight);
    pieceContainer.appendChild(bishop);
    pieceContainer.appendChild(queen);
};