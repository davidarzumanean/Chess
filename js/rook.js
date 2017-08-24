function Rook(color, coords) {
    Piece.call(this, color, coords);

    this.validateMove = function (dropCoords) {
        var currentCoordsArr = this.coords;
        var currentCoords = {};
        currentCoords.x = currentCoordsArr[0];
        currentCoords.y = currentCoordsArr[1];

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
            } else if (currentCoords.y > dropCoords.y) {
                for (var i = currentCoords.y - 1; i > dropCoords.y; i--) {
                    if (chess.board[i][currentCoords.x] !== null) {
                        return {success: false};
                    }
                }
            }

            if (chess.board[dropCoords.y][dropCoords.x] !== null) {
                return {success: true, eat: true};
            }

            return {success: true};

        } else if (dropCoords.y === currentCoords.y) {
            var currentCoordXIndex = xCoordIndexCoordination[currentCoords.x];
            var dropCoordXIndex = xCoordIndexCoordination[dropCoords.x];

            if (currentCoordXIndex < dropCoordXIndex) {
                for (var j = currentCoordXIndex + 1; j < dropCoordXIndex; j++) {
                    if (chess.board[dropCoords.y][xCoordArr[j]] !== null) {
                        return {success: false};
                    }
                }
            } else if (currentCoordXIndex > dropCoordXIndex) {
                for (var j = currentCoordXIndex - 1; j > dropCoordXIndex; j--) {
                    if (chess.board[dropCoords.y][xCoordArr[j]] !== null) {
                        return {success: false};
                    }
                }
            }

            if (chess.board[dropCoords.y][dropCoords.x] !== null) {
                return {success: true, eat: true};
            }
            return {success: true};
        }

        return {success: false};
    }
}