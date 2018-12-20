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

            var reshuffleCoords = moveController.reshuffle();
            if (reshuffleCoords) {
                var kingPositionCell = document.getElementById(reshuffleCoords.kingPos);
                var rookPositionCell = document.getElementById(reshuffleCoords.rookPos);

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

        if (moveController.canConvertPawn(targetCoord)) {
            chess.convertPawn(moveController.draggedObj, dragObject.draggedPieceDom, targetCoord);
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

// function initConvertPiecesSelection(pawnPiece, color, dropCoords) {
//     var boardContainer = document.getElementById('boardContainer');
//     var pieceContainer =  document.createElement('div');
//     pieceContainer.classList.add('convert-pieces-container');
//     boardContainer.appendChild(pieceContainer);
//
//     var overlay = document.getElementsByClassName('f_overlay')[0];
//     overlay.classList.add('is_active');
//     document.getElementById('board').classList.add('disable-pointer');
//
//     var piece = document.createElement('div');
//     piece.classList.add('piece');
//     piece.style.position = 'static';
//
//     piece.onclick = function() {
//         var selectedType = this.getAttribute('data-type');
//
//         moveController.convertPawn(selectedType, dropCoords);
//
//         convertPieceUi(pawnPiece, color, selectedType)
//
//         pieceContainer.remove();
//         overlay.classList.remove('is_active');
//         document.getElementById('board').classList.remove('disable-pointer');
//     };
//
//     var rook = piece.cloneNode(true);
//     rook.onclick = piece.onclick;
//     rook.dataset.type = 'Rook';
//     rook.classList.add(color + '-rook');
//
//     var knight = piece.cloneNode(true);
//     knight.onclick = piece.onclick;
//     knight.dataset.type = 'Knight';
//     knight.classList.add(color + '-knight');
//
//     var bishop = piece.cloneNode(true);
//     bishop.onclick = piece.onclick;
//     bishop.dataset.type = 'Bishop';
//     bishop.classList.add(color + '-bishop');
//
//     var queen = piece.cloneNode(true);
//     queen.onclick = piece.onclick;
//     queen.dataset.type = 'Queen';
//     queen.classList.add(color + '-queen');
//
//     pieceContainer.appendChild(rook);
//     pieceContainer.appendChild(knight);
//     pieceContainer.appendChild(bishop);
//     pieceContainer.appendChild(queen);
// }

function convertPieceUi(pawnPiece, color, type) {
    pawnPiece.classList.remove(color + '-pawn');
    pawnPiece.classList.add(color + '-' + type);
}