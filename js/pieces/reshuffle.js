chess.reshuffle = function (kingObj, kingUiElem, rookObj, rookUiElem) {

    if (kingObj.isNotMoved === true && rookObj.isNotMoved === true) {
        var kingCoordXIndex = xCoordNumeric[kingObj.coords[0]];
        var kingCoordY = kingObj.coords[1];

        var rookCoordXIndex = xCoordNumeric[rookObj.coords[0]];
        var rookCoordY = rookObj.coords[1];

        function shuffle(kingXOffset, rookXOffset) {
            var kingNewXCoord = xCoordAlphabetic[kingCoordXIndex + kingXOffset];
            var rookNewXCoord = xCoordAlphabetic[rookCoordXIndex + rookXOffset];

            // Makes Pieces' old position cells empty
            chess.board[kingCoordY][xCoordAlphabetic[kingCoordXIndex]] = null;
            chess.board[rookCoordY][xCoordAlphabetic[rookCoordXIndex]] = null;
            // Updates Pieces' coord.x property
            kingObj.coords[0] = kingNewXCoord;
            rookObj.coords[0] = rookNewXCoord;

            // Updates Kings position in the Object
            KINGSPOSITION[kingObj.color].x = kingNewXCoord;

            chess.board[kingCoordY][kingNewXCoord] = kingObj;
            chess.board[rookCoordY][rookNewXCoord] = rookObj;

            // Finds an ID of Pieces' new position cell to replace pieces in UI
            var kingNewCellId = kingNewXCoord + '-' + kingCoordY;
            var rookNewCellId = rookNewXCoord + '-' + rookCoordY;

            var kingPositionCell = document.getElementById(kingNewCellId);
            var rookPositionCell = document.getElementById(rookNewCellId);

            kingPositionCell.appendChild(kingUiElem);
            rookPositionCell.appendChild(rookUiElem);

            turn.nextPlayer();
        };

        if (kingCoordXIndex < rookCoordXIndex) {
            for (var i = kingCoordXIndex + 1; i < rookCoordXIndex; i++) {
                if (chess.board[kingCoordY][xCoordAlphabetic[i]] !== null) {
                    return {success: false};
                }
            }

            shuffle(2, -2);
        }

        if (kingCoordXIndex > rookCoordXIndex) {
            for (var i = kingCoordXIndex - 1; i > rookCoordXIndex; i--) {
                if (chess.board[kingCoordY][xCoordAlphabetic[i]] !== null) {
                    return {success: false};
                }
            }

            shuffle(-2, 3);
        }
    }
};