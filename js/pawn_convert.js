chess.convertPawn = function(pawn) {
    var boardContainer = document.getElementById('boardContainer');
    var color = pawn.color;

    var pieceContainer =  document.createElement('div');
    pieceContainer.classList.add('convert-pieces-container');
    boardContainer.appendChild(pieceContainer);

    var rook = document.createElement('div');
    rook.dataset.type = 'Rook';
    rook.classList.add('piece', 'white-rook');
    rook.style.position = 'static';

    var knight = document.createElement('div');
    knight.dataset.type = 'Knight';
    knight.classList.add('piece', 'white-knight');
    knight.style.position = 'static';

    var bishop = document.createElement('div');
    bishop.dataset.type = 'Bishop';
    bishop.classList.add('piece', 'white-bishop');
    bishop.style.position = 'static';

    var queen = document.createElement('div');
    queen.dataset.type = 'Queen';
    queen.classList.add('piece', 'white-queen');
    queen.style.position = 'static';

    pieceContainer.appendChild(rook);
    pieceContainer.appendChild(knight);
    pieceContainer.appendChild(bishop);
    pieceContainer.appendChild(queen);

}