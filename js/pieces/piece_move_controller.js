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
        return this.draggedObj.color === chess.playersTurn.colorTurn;
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
        return this.draggedObj.color === this.dropTargetObj.color;
    },
    
    reshuffle: function () {
        if(this.draggedObj.constructor === King && this.dropTargetObj.constructor === Rook) {
            var reshuffleCoords = chess.reshuffle(moveController.draggedObj, moveController.dropTargetObj);
            return reshuffleCoords;
        }
        return false;
    },

    canConvertPawn: function (targetCoord) {
        return (this.draggedObj instanceof Pawn && (targetCoord.y === ROW_7 || targetCoord.y === ROW_0));
    },
    
    convertPawn: function (selectedType, dropCoords) {
        var color = this.draggedObj.color;
        var coords = this.draggedObj.coords;
        var dropX = dropCoords.x;
        var dropY = dropCoords.y;

        chess.board[coords.y][coords.x] = null;

        switch(selectedType) {
            case 'Rook':
                chess.board[dropY][dropX] = new Rook(color, {x: dropX, y: dropY});
                break;
            case 'Knight':
                chess.board[dropY][dropX] = new Knight(color, {x: dropX, y: dropY});
                break;
            case 'Bishop':
                chess.board[dropY][dropX] = new Bishop(color, {x: dropX, y: dropY});
                break;
            case 'Queen':
                chess.board[dropY][dropX] = new Queen(color, {x: dropX, y: dropY});
                break;
        }
    }
};