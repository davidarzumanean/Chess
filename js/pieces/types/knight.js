function Knight(color, coords) {
    Piece.call(this, color, coords);

    this.validateMove = function (dropCoords) {
        var currentCoordsArr = this.coords;
        var currentCoords = {};
        currentCoords.x = currentCoordsArr.x;
        currentCoords.y = currentCoordsArr.y;

        var xCoordSlip = Math.abs(xCoordNumeric[currentCoords.x] - xCoordNumeric[dropCoords.x]);

        function checkTheMove() {
            if(chess.board[dropCoords.y][dropCoords.x] !== null) {
                return {success: true, eat: true}
            }
            return {success: true}
        }

        if (dropCoords.y === currentCoords.y + 1 || dropCoords.y === currentCoords.y - 1) {
            if (xCoordSlip === 2) {
                return checkTheMove();
            }
        }

        if (dropCoords.y === currentCoords.y + 2 || dropCoords.y === currentCoords.y - 2) {
            if (xCoordSlip === 1) {
                return checkTheMove();
            }
        }
        return {success: false}
    }
}