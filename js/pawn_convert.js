chess.convertPawn = function(pawn) {
    var boardContainer = document.getElementById('boardContainer');
    var color = pawn.color;

    var pieceContainer =  document.createElement('div');
    var rook = document.createElement('div');
    rook.classList.add('piece', 'white-rook');
    pieceContainer.appendChild(rook);
    boardContainer.appendChild(pieceContainer);

}