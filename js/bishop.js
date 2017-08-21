function Bishop(color, coords) {
    Piece.call(this, color, coords);

    this.validateMove = function (dropCoords) {
        var currentCoordsArr = this.coords;
        var currentCoords = {};
        currentCoords.x = currentCoordsArr[0];
        currentCoords.y = currentCoordsArr[1];


    }
}

Bishop.prototype = new Piece();
Bishop.prototype.constructor = Bishop;