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

            dragObject.draggedPieceDom = draggedPiece;
            var parentCell = dragObject.draggedPieceDom.parentNode;
            dragObject.parentCoord = splitCoordinates(parentCell.id);

            moveController.getPieceObjectByCoords(dragObject.parentCoord);

            dragObject.downX = e.pageX;
            dragObject.downY = e.pageY;

            return false;
        }
    }

    function onMouseMove(e) {
        if (!dragObject.draggedPieceDom) {
            return;
        }

        var moveX = e.pageX - dragObject.downX;
        var moveY = e.pageY - dragObject.downY;

        if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
            return;
        }

        startDrag(e);

        dragObject.draggedPieceDom.style.left = moveX + 'px';
        dragObject.draggedPieceDom.style.top = moveY + 'px';

        return false;
    }

    function startDrag() {
        dragObject.draggedPieceDom.style.zIndex = 9999;
        dragObject.draggedPieceDom.style.position = 'absolute';
    }

    function onMouseUp(e) {
        if (dragObject.draggedPieceDom) {
            finishDrag(e);
        }

        dragObject = {};
    }

    function finishDrag(e) {
        var dropTarget = checkDroppable(e);

        if (dropTarget) {
            onDragEnd(dropTarget);
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
            return dropTarget;
        }

        resetMove();
    }

    function validateEat(dropTarget) {
        var dropCell = dropTarget.parentNode;
        var dropTargetParentCoord = dropCell.getAttribute('id');
        var dropCoordsArr = splitCoordinates(dropTargetParentCoord);

        moveController.getPieceObjectByCoords(dropCoordsArr, true);

        function preparetoEat(dropCell) {
            dropCell.removeChild(dropTarget);
            moveController.eatTargetPiece();
        }

        if (moveController.targetPieceHasSameColor()) {
            if (moveController.reshuffle()) {
                var newPositions = chess.reshuffle(moveController.draggedObj, moveController.dropTargetObj);

                var kingPositionCell = document.getElementById(newPositions.kingPos);
                var rookPositionCell = document.getElementById(newPositions.rookPos);
                console.log(kingPositionCell);

                kingPositionCell.appendChild(dragObject.draggedPieceDom);
                rookPositionCell.appendChild(dropTarget);
                return;
            }

        } else {
            isValidMove = moveController.validateMove(dropCoordsArr);

            if (isValidMove.success === true) {
                turn.nextPlayer();

                if (isValidMove.eat === true) {
                    preparetoEat(dropCell);
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
        dragObject.draggedPieceDom.hidden = true;
        var dropTarget = document.elementFromPoint(event.clientX, event.clientY);
        dragObject.draggedPieceDom.hidden = false;

        return dropTarget;
    }

    function onDragEnd(dropTarget) {
        var targetCoord = splitCoordinates(dropTarget.id);

        if (moveController.convertPawn(targetCoord)) {
            chess.convertPawn(moveController.draggedObj, dragObject.draggedPieceDom, targetCoord.x, targetCoord.y);
        }

        moveController.moveTo(targetCoord);

        movePieceInDom(dropTarget);

        chess.isCheck();
        chess.isMate();
    }

    function resetMove() {
        dragObject.draggedPieceDom.removeAttribute('style');
    }

    function movePieceInDom(targetCoord) {
        targetCoord.appendChild(dragObject.draggedPieceDom);
        dragObject.draggedPieceDom.removeAttribute('style');
    }
};

function splitCoordinates(coord) {
    coord = coord.split('-');

    return {x: coord[0], y: +coord[1]};
}