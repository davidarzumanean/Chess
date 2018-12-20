function Rook(color, coords) {
    Piece.call(this, color, coords);
    this.isNotMoved = true;

    this.validateMove = function (dropCoords) {
        var currentCoordsArr = this.coords;
        var currentCoords = {};
        currentCoords.x = currentCoordsArr.x;
        currentCoords.y = currentCoordsArr.y;

        return validateRookMove(currentCoords, dropCoords);
    }
}

function validateRookMove(currentCoords, dropCoords) {
    if (dropCoords.x === currentCoords.x && dropCoords.y === currentCoords.y) {
        return {success: false};
    }
    if (dropCoords.x === currentCoords.x) {
        if (currentCoords.y < dropCoords.y) {
            for (var i = currentCoords.y + 1; i < dropCoords.y; i++) {
                if (chess.board[i][currentCoords.x] !== null) {
                    return {success: false};
                }
            }
        }

        if (currentCoords.y > dropCoords.y) {
            for (var i = currentCoords.y - 1; i > dropCoords.y; i--) {
                if (chess.board[i][currentCoords.x] !== null) {
                    return {success: false};
                }
            }
        }

        this.isNotMoved = false;

        if (chess.board[dropCoords.y][dropCoords.x] !== null) {
            return {success: true, eat: true};
        }

        return {success: true};
    }

    if (dropCoords.y === currentCoords.y) {
        var currentCoordXIndex = xCoordNumeric[currentCoords.x];
        var dropCoordXIndex = xCoordNumeric[dropCoords.x];

        if (currentCoordXIndex < dropCoordXIndex) {
            for (var j = currentCoordXIndex + 1; j < dropCoordXIndex; j++) {
                if (chess.board[dropCoords.y][xCoordAlphabetic[j]] !== null) {
                    return {success: false};
                }
            }
        }

        if (currentCoordXIndex > dropCoordXIndex) {
            for (var j = currentCoordXIndex - 1; j > dropCoordXIndex; j--) {
                if (chess.board[dropCoords.y][xCoordAlphabetic[j]] !== null) {
                    return {success: false};
                }
            }
        }

        this.isNotMoved = false;

        if (chess.board[dropCoords.y][dropCoords.x] !== null) {
            return {success: true, eat: true};
        }
        return {success: true};
    }

    return {success: false};
}