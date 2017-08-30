Piece.DragManager = new function () {

    var dragObject = {};

    document.onmousedown = onMouseDown;
    document.onmousemove = onMouseMove;
    document.onmouseup = onMouseUp;

    function onMouseDown(e) {
        if (e.which === 1) {
            var draggedPiece = e.target.closest('.f_piece');
            if (!draggedPiece) {
                return;
            }

            dragObject.draggedPieceFigure = draggedPiece;
            var parentCell = dragObject.draggedPieceFigure.parentNode;
            dragObject.parentCoord = splitCoordinates(parentCell.id);

            moveController.getPieceObjectByCoords(dragObject.parentCoord);

            dragObject.downX = e.pageX;
            dragObject.downY = e.pageY;

            return false;
        }
    }

    function onMouseMove(e) {
        if (!dragObject.draggedPieceFigure) {
            return;
        }

        var moveX = e.pageX - dragObject.downX;
        var moveY = e.pageY - dragObject.downY;

        if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
            return;
        }

        startDrag(e);

        dragObject.draggedPieceFigure.style.left = moveX + 'px';
        dragObject.draggedPieceFigure.style.top = moveY + 'px';

        return false;
    }

    function startDrag() {
        dragObject.draggedPieceFigure.style.zIndex = 9999;
        dragObject.draggedPieceFigure.style.position = 'absolute';
    }

    function onMouseUp(e) {
        if (dragObject.draggedPieceFigure) {
            finishDrag(e);
        }

        dragObject = {};
    }

    function finishDrag(e) {
        var dropElem = checkDroppable(e);

        if (dropElem) {
            onDragEnd(dragObject, dropElem);
        } else {
            resetMove();
        }
    }

    function checkDroppable(event) {
        if (moveController.checkMoveTurn() === false) {
            resetMove();
            return;
        }

        var dropTarget = getDropTarget();

        var dropTargetContainsPiece = dropTarget.classList.contains('f_piece');

        if (!dropTargetContainsPiece && !dropTarget.classList.contains('f_board-cell')) {
            resetMove();
            return;
        }

        if (dropTargetContainsPiece) {
            return validateEat(dropTarget);
        }

        var dropCellCoord = dropTarget.getAttribute('id');
        var dropCellCoordsArr = splitCoordinates(dropCellCoord);
        var isValidMove = moveController.validateMove(dropCellCoordsArr);

        if (isValidMove && isValidMove.success === true) {
            turn.nextPlayer();
            return dropTarget;
        }

        resetMove();
    }

    function validateEat(dropTarget) {
        var dropCell = dropTarget.parentNode;
        var dropTargetParentCoord = dropCell.getAttribute('id');
        var dropCoordsArr = splitCoordinates(dropTargetParentCoord);

        moveController.getPieceObjectByCoords(dropCoordsArr, true);
        var dropCellPieceObj = moveController.dropTargetObj;

        function prepareForEating(dropCell) {
            dropCell.removeChild(dropTarget);
            moveController.eatTargetPiece();
        }

        if (moveController.draggedObj.color === moveController.dropTargetObj.color) {
            if (moveController.draggedObj.constructor === King && moveController.dropTargetObj.constructor === Rook) {
                chess.reshuffle(moveController.draggedObj, dragObject.draggedPieceFigure, dropCellPieceObj, dropTarget);

                return;
            }

            resetMove();
            return;

        } else {
            isValidMove = moveController.draggedObj.validateMove(dropCoordsArr);

            if (isValidMove.success === true) {
                turn.nextPlayer();

                if (isValidMove.eat === true) {
                    prepareForEating(dropCell);
                    return dropCell;
                }
                return dropTarget;

            } else {
                resetMove();
                return;
            }
        }
    }

    function getDropTarget() {
        dragObject.draggedPieceFigure.hidden = true;
        var dropTarget = document.elementFromPoint(event.clientX, event.clientY);
        dragObject.draggedPieceFigure.hidden = false;

        return dropTarget;
    }

    function onDragEnd(dragObject, dropElem) {
        var coords = dragObject.parentCoord;
        var pieceInCell = moveController.draggedObj;

        var targetCoord = splitCoordinates(dropElem.id);

        if (pieceInCell instanceof Pawn && (targetCoord.y === ROW_7 || targetCoord.y === ROW_0)) {
            chess.convertPawn(pieceInCell, dragObject.draggedPieceFigure, targetCoord.x, targetCoord.y);
        }

        chess.board[coords.y][coords.x] = null;

        chess.board[targetCoord.y][targetCoord.x] = pieceInCell;
        pieceInCell.coords = [targetCoord.x, targetCoord.y];

        dropElem.appendChild(dragObject.draggedPieceFigure);
        dragObject.draggedPieceFigure.removeAttribute('style');

        chess.isCheck();
        chess.isMate();
    }

    function resetMove() {
        dragObject.draggedPieceFigure.removeAttribute('style');
    }
};

function splitCoordinates(coord) {
    coord = coord.split('-');

    return {x: coord[0], y: +coord[1]};
}