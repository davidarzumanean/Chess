function Pawn(color, coords) {
    Piece.call(this, color, coords);

    this.validateMove = function (dropCoords) {
        var currentCoordsArr = this.coords;
        var currentCoords = {};
        currentCoords.x = currentCoordsArr[0];
        currentCoords.y = currentCoordsArr[1];

        var pieceColor = this.color;

        if (chess.board[dropCoords.y][dropCoords.x] === null && dropCoords.x === currentCoords.x) {
            switch (pieceColor) {
                case 'white':
                    if (currentCoords.y === 1 && dropCoords.y - currentCoords.y <= 2 && chess.board[currentCoords.y + 1][dropCoords.x] === null) {
                        return {success: true};
                    } else if (dropCoords.y - currentCoords.y === 1) {
                        return {success: true};
                    } else {
                        return {success: false};
                    }
                    break;
                case 'black':
                    if (currentCoords.y === 6 && dropCoords.y - currentCoords.y >= -2 && chess.board[currentCoords.y - 1][dropCoords.x] === null) {
                        return {success: true};
                    } else if (dropCoords.y - currentCoords.y === -1) {
                        return {success: true};
                    } else {
                        return {success: false};
                    }
                    break;
            }

            return {success: false};
        } else if (chess.board[dropCoords.y][dropCoords.x] !== null) {

            var neighborPieces = findLeftAndRightEatCoordX(currentCoords.x);
            var leftPieceX = neighborPieces[0];
            var rightPieceX = neighborPieces[1];

            switch (pieceColor) {
                case 'white':
                    if (dropCoords.y === currentCoords.y + 1) {
                        if ((leftPieceX !== null && leftPieceX === dropCoords.x) || (rightPieceX !== null && rightPieceX === dropCoords.x)) {
                            return {success: true, eat: true};
                        }
                    }
                    break;
                case 'black':
                    if (dropCoords.y === currentCoords.y - 1) {
                        if ((leftPieceX !== null && leftPieceX === dropCoords.x) || (rightPieceX !== null && rightPieceX === dropCoords.x)) {
                            return {success: true, eat: true};
                        }
                    }
                    break;
            }
        }

        return {success: false};
    }
}