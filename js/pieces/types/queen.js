function Queen(color, coords) {
    Piece.call(this, color, coords);

    this.validateMove = function (dropCoords) {
        var currentCoordsArr = this.coords;
        var currentCoords = {};
        currentCoords.x = currentCoordsArr.x;
        currentCoords.y = currentCoordsArr.y;

        function validateQueenMove(currentCoords, dropCoords) {
            if(dropCoords.x === currentCoords.x || dropCoords.y === currentCoords.y) {
               return validateRookMove(currentCoords, dropCoords);
            } else {
               return validateBishopMove(currentCoords, dropCoords);
            }
        }

        return validateQueenMove(currentCoords, dropCoords);
    };
}