King.prototype = new Piece();
King.prototype.constructor = King;

function King(color, coords) {
    Piece.call(this, color, coords);

    this.validateMove = function (dropCoords) {
        var currentCoordsArr = this.coords;
        var currentCoords = {};
        currentCoords.x = currentCoordsArr[0];
        currentCoords.y = currentCoordsArr[1];

        var currentXCoordIndex = xCoordIndexCoordination[currentCoords.x];
        var dropXCoordIndex = xCoordIndexCoordination[dropCoords.x];

        if (dropCoords.y === currentCoords.y + 1 || dropCoords.y === currentCoords.y - 1) {
            if (chess.board[dropCoords.y][dropCoords.x] !== null) {
                return {success: true, eat: true};
            }
            return {success: true};
        } else if (dropXCoordIndex === currentXCoordIndex + 1 || dropXCoordIndex === currentXCoordIndex - 1){
            if (chess.board[dropCoords.y][dropCoords.x] !== null) {
                return {success: true, eat: true};
            }
            return {success: true};
        }

        return {success: false}
    };
}