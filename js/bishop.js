function Bishop(color, coords) {
    Piece.call(this, color, coords);

    this.validateMove = function (dropCoords) {
        var currentCoordsArr = this.coords;
        var currentCoords = {};
        currentCoords.x = currentCoordsArr[0];
        currentCoords.y = currentCoordsArr[1];

        var xCoordAbsDifference = Math.abs(xCoordIndexCoordination[dropCoords.x] - xCoordIndexCoordination[currentCoords.x]);
        var yCoordAbsDifference = Math.abs(dropCoords.y - currentCoords.y);

        if (xCoordAbsDifference === yCoordAbsDifference) {
            var xCoord = xCoordIndexCoordination[currentCoords.x];
            var yCoord = currentCoords.y;
            var xCoordCharIndex;
            if (xCoordIndexCoordination[currentCoords.x] - xCoordIndexCoordination[dropCoords.x] > 0) {
                if (dropCoords.y - currentCoords.y > 0) {
                    while (xCoordArr[xCoord] !== dropCoords.x + 1 && yCoord !== dropCoords.y - 1) {
                        xCoord--;
                        yCoord++;
                        xCoordCharIndex = xCoordArr[xCoord];
                        if (chess.board[yCoord][xCoordCharIndex] !== null) {
                            return {success: false};
                        }
                    }
                    return {success: true};

                } else if (dropCoords.y - currentCoords.y < 0) {
                    while (xCoordArr[xCoord] !== dropCoords.x + 1 && yCoord !== dropCoords.y + 1) {
                        xCoord--;
                        yCoord--;
                        xCoordCharIndex = xCoordArr[xCoord];
                        if (chess.board[yCoord][xCoordCharIndex] === null) {
                            return {success: false};
                        }
                    }
                    return {success: true};
                }
            }
        }

        return {success: false};
    }
}

Bishop.prototype = new Piece();
Bishop.prototype.constructor = Bishop;