function Pawn(color, coords) {
    Piece.call(this, color, coords);

    this.validateMove = function (dropCoords) {
        var currentCoordsArr = this.coords;
        var currentCoords = {};
        currentCoords.x = currentCoordsArr[0];
        currentCoords.y = currentCoordsArr[1];

        var pieceColor = this.color;

        // move to empty cell validation
        if (chess.board[dropCoords.y][dropCoords.x] === null && dropCoords.x === currentCoords.x) {
            switch (pieceColor) {
                case 'white':
                    // if it is first move, can move 2 cells
                    if (currentCoords.y === 1 && dropCoords.y - currentCoords.y <= 2 && chess.board[currentCoords.y + 1][dropCoords.x] === null) {
                        return {success: true};
                    // else can move 1 cell
                    } else if (dropCoords.y - currentCoords.y === 1) {
                        return {success: true};
                    } else {
                        return {success: false};
                    }
                    break;
                case 'black':
                    // if it is first move, can move 2 cells
                    if (currentCoords.y === 6 && dropCoords.y - currentCoords.y >= -2 && chess.board[currentCoords.y - 1][dropCoords.x] === null) {
                        return {success: true};
                    // else can move 1 cell
                    } else if (dropCoords.y - currentCoords.y === -1) {
                        return {success: true};
                    } else {
                        return {success: false};
                    }
                    break;
            }
        }

        // eat validation
        if (chess.board[dropCoords.y][dropCoords.x] !== null) {
            var neighborPieces = pawnEatXCoords(currentCoords.x);
            var leftPieceX = neighborPieces[0];
            var rightPieceX = neighborPieces[1];

            // Coordinates increase from bottom to top, so if black pawn moves, yCoord will decrease
            var yCoordSlip = pieceColor === 'white' ? 1 : -1;
            if (dropCoords.y === currentCoords.y + yCoordSlip) {
                if ((leftPieceX !== null && leftPieceX === dropCoords.x) || (rightPieceX !== null && rightPieceX === dropCoords.x)) {
                    return {success: true, eat: true};
                }
            }
        }

        return {success: false};
    }
}

function pawnEatXCoords(xCoord) {
    var xCoordIndex = xCoordNumeric[xCoord];

    // if xCoord is in table, assign it, else, assign null
    var eatLeftCoordX = xCoordIndex - 1 >= 0 ? xCoordAlphabetic[xCoordIndex - 1] : null;
    var eatRightCoordX = xCoordIndex + 1 < xCoordAlphabetic.length ? xCoordAlphabetic[xCoordIndex + 1] : null;

    return [eatLeftCoordX, eatRightCoordX];
}