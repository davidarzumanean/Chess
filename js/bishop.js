function Bishop(color, coords) {
    Piece.call(this, color, coords);
}

Bishop.prototype = new Piece();
Bishop.prototype.constructor = Bishop;

Bishop.validateMove = function (dropCoords) {
    var currentCoords = this.coords;
    var pieceColor = this.color;

   

};