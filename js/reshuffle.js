chess.reshuffle = function (kingObj, kingUiElem, rookObj, rookUiElem) {

    if (kingObj.isNotMoved === true && rookObj.isNotMoved === true) {
        var kingCoordXIndex = xCoordIndexCoordination[kingObj.coords[0]];
        var kingCoordY = kingObj.coords[1];

        var rookCoordXIndex = xCoordIndexCoordination[rookObj.coords[0]];
        var rookCoordY = rookObj.coords[1];

        var kingNewXCoord;
        var rookNewXCoord;

        var kingNewCellId;
        var rookNewCellId;

        var kingPositionCell;
        var rookPositionCell;
        
        if (kingCoordXIndex < rookCoordXIndex) {
            for (var i = kingCoordXIndex + 1; i < rookCoordXIndex; i++) {
                if (chess.board[kingCoordY][xCoordArr[i]] !== null) {
                    return {success: false};
                }
            }

            kingNewXCoord = xCoordArr[kingCoordXIndex + 2];
            rookNewXCoord = xCoordArr[rookCoordXIndex - 2];

            chess.board[kingCoordY][xCoordArr[kingCoordXIndex]] = null;
            chess.board[rookCoordY][xCoordArr[rookCoordXIndex]] = null;
            kingObj.coords[1] = kingNewXCoord;
            rookObj.coords[1] = rookNewXCoord;

            kingsPosition[kingObj.color] = {x: xCoordArr[kingCoordXIndex + 2], y: kingCoordY};

            chess.board[kingCoordY][kingNewXCoord] = kingObj;
            chess.board[rookCoordY][rookNewXCoord] = rookObj;

            kingNewCellId = kingNewXCoord + '-' + kingCoordY;
            rookNewCellId = rookNewXCoord + '-' + rookCoordY;

            kingPositionCell = document.getElementById(kingNewCellId);
            rookPositionCell = document.getElementById(rookNewCellId);

            kingPositionCell.appendChild(kingUiElem);
            rookPositionCell.appendChild(rookUiElem);

            chess.checkPlayersTurn.changeTheTurn();

        } else  if (kingCoordXIndex > rookCoordXIndex) {
            for (var i = kingCoordXIndex - 1; i > rookCoordXIndex; i--) {
                if (chess.board[kingCoordY][xCoordArr[i]] !== null) {
                    return {success: false};
                }
            }

            kingNewXCoord = xCoordArr[kingCoordXIndex - 2];
            rookNewXCoord = xCoordArr[rookCoordXIndex + 3];

            chess.board[kingCoordY][xCoordArr[kingCoordXIndex]] = null;
            chess.board[rookCoordY][xCoordArr[rookCoordXIndex]] = null;
            kingObj.coords[1] = kingNewXCoord;
            rookObj.coords[1] = rookNewXCoord;

            kingsPosition[kingObj.color] = {x: xCoordArr[kingCoordXIndex + 2], y: kingCoordY};

            chess.board[kingCoordY][kingNewXCoord] = kingObj;
            chess.board[rookCoordY][rookNewXCoord] = rookObj;

            kingNewCellId = kingNewXCoord + '-' + kingCoordY;
            rookNewCellId = rookNewXCoord + '-' + rookCoordY;

            kingPositionCell = document.getElementById(kingNewCellId);
            rookPositionCell = document.getElementById(rookNewCellId);

            kingPositionCell.appendChild(kingUiElem);
            rookPositionCell.appendChild(rookUiElem);

            chess.checkPlayersTurn.changeTheTurn();
        }
    }
};