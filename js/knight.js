function Knight(color, coords) {
    Piece.call(this, color, coords);

    this.validateMove = function (dropCoords) {
        var currentCoordsArr = this.coords;
        var currentCoords = {};
        currentCoords.x = currentCoordsArr[0];
        currentCoords.y = currentCoordsArr[1];

        var xCoordSlip;

        if (dropCoords.y === currentCoords.y + 1 || dropCoords.y === currentCoords.y - 1) {
            xCoordSlip = Math.abs(xCoordIndexCoordination[currentCoords.x] - xCoordIndexCoordination[dropCoords.x]);
            if (xCoordSlip === 2) {
                if(chess.board[dropCoords.y][dropCoords.x] !== null) {
                    return {success: true, eat: true}
                }
                return {success: true}
            }
        } else  if (dropCoords.y === currentCoords.y + 2 || dropCoords.y === currentCoords.y - 2) {
            xCoordSlip = Math.abs(xCoordIndexCoordination[currentCoords.x] - xCoordIndexCoordination[dropCoords.x]);
            if (xCoordSlip === 1) {
                if(chess.board[dropCoords.y][dropCoords.x] !== null) {
                    return {success: true, eat: true}
                }
                return {success: true}
            }
        }
        return {success: false}
    }
}

Knight.prototype = new Piece();
Knight.prototype.constructor = Knight;