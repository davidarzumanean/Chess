function King(color, coords) {
    Piece.call(this, color, coords);
    this.isNotMoved = true;

    this.validateMove = function (dropCoords) {
        var currentCoordsArr = this.coords;
        var currentCoords = {};
        currentCoords.x = currentCoordsArr.x;
        currentCoords.y = currentCoordsArr.y;
        var kingColor = this.color;

        var currentXCoordIndex = xCoordNumeric[currentCoords.x];
        var dropXCoordIndex = xCoordNumeric[dropCoords.x];
        var xCoordsAbsDifference = Math.abs(dropXCoordIndex - currentXCoordIndex);
        var yCoordsAbsDifference = Math.abs(dropCoords.y - currentCoords.y);

        function checkTheMove(kingColor) {
            // TODO: why is the value of this window here ?
            KINGSPOSITION[kingColor] = {x: dropCoords.x, y: dropCoords.y};
            this.isNotMoved = false;

            if (chess.board[dropCoords.y][dropCoords.x] !== null) {
                return {success: true, eat: true};
            }
            return {success: true};
        }

        // Checks vertical move
        if ((dropCoords.y === currentCoords.y + 1 || dropCoords.y === currentCoords.y - 1 ) && xCoordsAbsDifference <= 1) {
            return checkTheMove(kingColor);
        }

        // Checks horizontal move
        if ((dropXCoordIndex === currentXCoordIndex + 1 || dropXCoordIndex === currentXCoordIndex - 1) && yCoordsAbsDifference <= 1){
            return checkTheMove(kingColor);
        }

        return {success: false};
    };
}

// Positions of both kings

var KINGSPOSITION = {
    white: {
        x: COL_E,
        y: ROW_0
    },
    black: {
        x: COL_E,
        y: ROW_7
    }
};