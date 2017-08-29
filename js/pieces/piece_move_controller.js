var moveController = {
    draggedObj: null,

    getPieceObjectByCoords: function (dragCoords) {
        this.draggedObj = chess.board[dragCoords.y][dragCoords.x];
    }
}