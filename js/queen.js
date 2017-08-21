function Queen(color, coords) {
    Piece.call(this, color, coords);
}

Queen.prototype = new Piece();
Queen.prototype.constructor = Queen;

Queen.validateMove = function (dropCoords) {
    var currentCoords = this.coords;
    var pieceColor = this.color;

   

};