var moveController = {
    draggedObj: null,
    dropTargetObj: null,

    getPieceObjectByCoords: function (dragCoords, containsPiece) {
        if(containsPiece) {
            this.dropTargetObj = chess.board[dragCoords.y][dragCoords.x];
            return;
        }
        this.draggedObj = chess.board[dragCoords.y][dragCoords.x];
    },

    checkMoveTurn: function () {
        if(this.draggedObj.color === chess.playersTurn.colorTurn) {
            return true;
        }
        return false;
    },

    validateMove: function (dropCellCoordsArr) {
        return this.draggedObj.validateMove(dropCellCoordsArr);
    },

    eatTargetPiece: function () {
        var coords = this.dropTargetObj.coords;
        chess.board[coords.y][coords.x] = null;
        this.dropTargetObj = null;

        turn.nextPlayer();
    },

    moveTo: function (targetCoord) {
        var currentCoords = this.draggedObj.coords;

        chess.board[targetCoord.y][targetCoord.x] = this.draggedObj;
        chess.board[currentCoords.y][currentCoords.x] = null;
        this.draggedObj.coords = {x: targetCoord.x, y: targetCoord.y};

        turn.nextPlayer();
    },

    targetPieceHasSameColor: function () {
        if(this.draggedObj.color === this.dropTargetObj.color) {
            return true;
        }

        return false;
    },
    
    reshuffle: function () {
        if(this.draggedObj.constructor === King && this.dropTargetObj.constructor === Rook) {
            chess.reshuffle(moveController.draggedObj, moveController.dropTargetObj);
        }
        return false;
    },

    convertPawn: function (targetCoord) {
        if(this.draggedObj instanceof Pawn && (targetCoord.y === ROW_7 || targetCoord.y === ROW_0)){
            return true;
        }
        return false;
    }
}