chess.reshuffle = function (kingObj, rookObj) {

    if (kingObj.isNotMoved === true && rookObj.isNotMoved === true) {
        var kingCoordXIndex = xCoordNumeric[kingObj.coords.x];
        var kingCoordY = kingObj.coords.y;

        var rookCoordXIndex = xCoordNumeric[rookObj.coords.x];
        var rookCoordY = rookObj.coords.y;

        function shuffle(kingXOffset, rookXOffset) {
            var kingNewXCoord = xCoordAlphabetic[kingCoordXIndex + kingXOffset];
            var rookNewXCoord = xCoordAlphabetic[rookCoordXIndex + rookXOffset];

            // Makes Pieces' old position cells empty
            chess.board[kingCoordY][xCoordAlphabetic[kingCoordXIndex]] = null;
            chess.board[rookCoordY][xCoordAlphabetic[rookCoordXIndex]] = null;
            // Updates Pieces' coord.x property
            kingObj.coords.x = kingNewXCoord;
            rookObj.coords.x = rookNewXCoord;

            // Updates Kings position in the Object
            KINGSPOSITION[kingObj.color].x = kingNewXCoord;

            chess.board[kingCoordY][kingNewXCoord] = kingObj;
            chess.board[rookCoordY][rookNewXCoord] = rookObj;

            // Finds an ID of Pieces' new position cell to replace pieces in UI
            var kingNewCellId = kingNewXCoord + '-' + kingCoordY;
            var rookNewCellId = rookNewXCoord + '-' + rookCoordY;

            turn.nextPlayer();

            return {kingPos: kingNewCellId, rookPos: rookNewCellId}
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