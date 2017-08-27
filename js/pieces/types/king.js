function King(color, coords) {
    Piece.call(this, color, coords);
    this.isNotMoved = true;

    this.validateMove = function (dropCoords) {
        var currentCoordsArr = this.coords;
        var currentCoords = {};
        currentCoords.x = currentCoordsArr[0];
        currentCoords.y = currentCoordsArr[1];

        var currentXCoordIndex = xCoordNumeric[currentCoords.x];
        var dropXCoordIndex = xCoordNumeric[dropCoords.x];
        var xCoordsAbsDifference = Math.abs(dropXCoordIndex - currentXCoordIndex);
        var yCoordsAbsDifference = Math.abs(dropCoords.y - currentCoords.y);

        // Checks vertical move
        if ((dropCoords.y === currentCoords.y + 1 || dropCoords.y === currentCoords.y - 1 ) && xCoordsAbsDifference <= 1) {
            KINGSPOSITION[this.color] = {x: dropCoords.x, y: dropCoords.y};
            this.isNotMoved = false;

            if (chess.board[dropCoords.y][dropCoords.x] !== null) {
                return {success: true, eat: true};
            }
            return {success: true};
        }

        // Checks horizontal move
        if ((dropXCoordIndex === currentXCoordIndex + 1 || dropXCoordIndex === currentXCoordIndex - 1) && yCoordsAbsDifference <= 1){
            KINGSPOSITION[this.color] = {x: dropCoords.x, y: dropCoords.y};
            this.isNotMoved = false;

            if (chess.board[dropCoords.y][dropCoords.x] !== null) {
                return {success: true, eat: true};
            }
            return {success: true};
        }

        return {success: false};
    };
}