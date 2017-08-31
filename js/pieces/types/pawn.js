function Pawn(color, coords) {
    Piece.call(this, color, coords);

    this.validateMove = function (dropCoords) {
        var currentCoordsArr = this.coords;
        var currentCoords = {};
        currentCoords.x = currentCoordsArr.x;
        currentCoords.y = currentCoordsArr.y;

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
            // Coordinates increase from bottom to top, so if black pawn moves, yCoord will decrease
            var yCoordSlip = pieceColor === 'white' ? 1 : -1;

            if (dropCoords.y === currentCoords.y + yCoordSlip) {
                var currentXCoordIndex = xCoordNumeric[currentCoords.x];
                var dropXCoordIndex = xCoordNumeric[dropCoords.x];

                if ((dropXCoordIndex === currentXCoordIndex + 1) || (dropXCoordIndex === currentXCoordIndex - 1)) {
                    return {success: true, eat: true};
                }
            }
        }

        return {success: false};
    }
}