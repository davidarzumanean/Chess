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
    
    canReShuffle: function () {
        if(this.draggedObj.color === this.dropTargetObj.color) {
            if (this.draggedObj.constructor === King && this.dropTargetObj.constructor === Rook) {
                chess.reshuffle(moveController.draggedObj, dragObject.draggedPieceFigure, dropCellPieceObj, dropTarget);

                return;
            }
        }
    },

    validateMove: function (dropCellCoordsArr) {
        return this.draggedObj.validateMove(dropCellCoordsArr);
    },

    eatTargetPiece: function () {
        this.dropTargetObj = null;

    }
}