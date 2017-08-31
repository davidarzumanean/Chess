function Bishop(color, coords) {
    Piece.call(this, color, coords);

    this.validateMove = function (dropCoords) {
        var currentCoordsArr = this.coords;
        var currentCoords = {};
        currentCoords.x = currentCoordsArr.x;
        currentCoords.y = currentCoordsArr.y;

        return validateBishopMove(currentCoords, dropCoords)
    }
}



function validateBishopMove(currentCoords, dropCoords) {
    var xCoordAbsDifference = Math.abs(xCoordNumeric[dropCoords.x] - xCoordNumeric[currentCoords.x]);
    var yCoordAbsDifference = Math.abs(dropCoords.y - currentCoords.y);

    if (xCoordAbsDifference === yCoordAbsDifference) {
        var xCoord = xCoordNumeric[currentCoords.x];
        var yCoord = currentCoords.y;
        var xCoordAlpha;
        var dropCoordXIndex = xCoordNumeric[dropCoords.x];
        var dropCellContainsPiece = chess.board[dropCoords.y][dropCoords.x];

        function bishopCheckCell() {
            if (chess.board[yCoord][xCoordAlpha] !== null) {
                return {success: false};
            }
        };

        // Checks left side
        if (xCoordNumeric[currentCoords.x] - xCoordNumeric[dropCoords.x] > 0) {
            // Checks left top
            if (dropCoords.y - currentCoords.y > 0) {
                while (xCoordAlphabetic[xCoord] !== xCoordAlphabetic[dropCoordXIndex + 1] && yCoord !== dropCoords.y - 1) {
                    xCoord--;
                    yCoord++;
                    xCoordAlpha = xCoordAlphabetic[xCoord];

                    bishopCheckCell();
                }
                if (dropCellContainsPiece) {
                    return {success: true, eat: true};
                }
                return {success: true};
            }
            // Checks left bottom
            if (dropCoords.y - currentCoords.y < 0) {
                while (xCoordAlphabetic[xCoord] !== xCoordAlphabetic[dropCoordXIndex + 1] && yCoord !== dropCoords.y + 1) {
                    xCoord--;
                    yCoord--;
                    xCoordAlpha = xCoordAlphabetic[xCoord];

                    bishopCheckCell();
                }
                if (dropCellContainsPiece) {
                    return {success: true, eat: true};
                }
                return {success: true};
            }
        }

        // Checks right side
        if (xCoordNumeric[currentCoords.x] - xCoordNumeric[dropCoords.x] < 0) {
            // Checks right top
            if (dropCoords.y - currentCoords.y > 0) {
                while (xCoordAlphabetic[xCoord] !== xCoordAlphabetic[dropCoordXIndex - 1] && yCoord !== dropCoords.y - 1) {
                    xCoord++;
                    yCoord++;
                    xCoordAlpha = xCoordAlphabetic[xCoord];

                    bishopCheckCell();
                }
                if (dropCellContainsPiece) {
                    return {success: true, eat: true};
                }
                return {success: true};
            }

            // Checks right bottom
            if (dropCoords.y - currentCoords.y < 0) {
                while (xCoordAlphabetic[xCoord] !== xCoordAlphabetic[dropCoordXIndex - 1] && yCoord !== dropCoords.y + 1) {
                    xCoord++;
                    yCoord--;
                    xCoordAlpha = xCoordAlphabetic[xCoord];

                    bishopCheckCell();
                }
                if (dropCellContainsPiece) {
                    return {success: true, eat: true};
                }
                return {success: true};
            }
        }
    }

    return {success: false};
}