function King(color, coords) {
    Piece.call(this, color, coords);
}

King.prototype = new Piece();
King.prototype.constructor = King;

King.validateMove = function (dropCoords) {
    var currentCoords = this.coords;
    var pieceColor = this.color;

   

};