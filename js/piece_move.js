Piece.DragManager = new function () {

    var dragObject = {};

    document.onmousedown = onMouseDown;
    document.onmousemove = onMouseMove;
    document.onmouseup = onMouseUp;

    function onMouseDown(e) {
        if(e.which === 1) {
            var draggedPiece = e.target.closest('.f_piece');
            if (!draggedPiece) {
                return;
            }

            dragObject.draggedPieceFigure = draggedPiece;
            var parentCell = dragObject.draggedPieceFigure.parentNode;
            dragObject.parentCoord = parentCell.id;

            var dragCoordsArr = splitCoordinates(dragObject.parentCoord);
            dragObject.draggedPieceObj = chess.board[dragCoordsArr.y][dragCoordsArr.x];

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
            Piece.DragManager.onDragEnd(dragObject, dropElem);
        }
    }

    function checkDroppable(event) {
        function prepareForEating (dropCell) {
            dropCell.removeChild(dropTarget);
            dropCellPieceObj = null;
        }

        dragObject.draggedPieceFigure.hidden = true;
        var dropTarget = document.elementFromPoint(event.clientX, event.clientY);
        dragObject.draggedPieceFigure.hidden = false;

        var isValidMove;
        var dropTargetContainsPiece = dropTarget.classList.contains('f_piece');

        if(dropTargetContainsPiece) {
            var dropCell = dropTarget.parentNode;
            var dropTargetParentCoord = dropCell.getAttribute('id');
            var dropCoordsArr = splitCoordinates(dropTargetParentCoord);
            var dropCellPieceObj = chess.board[dropCoordsArr.y][dropCoordsArr.x];

            if (dragObject.draggedPieceObj.color === dropCellPieceObj.color) {
                resetMove();
                return;

            } else if (dragObject.draggedPieceObj.color !== dropCellPieceObj.color) {
                isValidMove = dragObject.draggedPieceObj.validateMove(dropCoordsArr);

                if (isValidMove.success === true) {
                    if(isValidMove.eat === true) {
                        prepareForEating(dropCell);
                        return dropCell;
                    }
                    return dropTarget;
                } else {
                    resetMove();
                    return;
                }
            }

        } else if (!dropTarget.classList.contains('f_piece') && !dropTarget.classList.contains('f_board-cell')) {
            resetMove();
            return;
        }

        var dropCellCoord = dropTarget.getAttribute('id');
        var dropCellCoordsArr = splitCoordinates(dropCellCoord);

        isValidMove = dragObject.draggedPieceObj.validateMove(dropCellCoordsArr);

        if (isValidMove && isValidMove.success === true) {
            return dropTarget;

        } else {
            var message = "This move is not valid!";
            resetMove(message);
        }
    }

    this.onDragEnd = function (dragObject, dropElem) {
        var coords = splitCoordinates(dragObject.parentCoord);
        var pieceInCell = chess.board[coords.y][coords.x];

        chess.board[coords.y][coords.x] = null;

        var targetCoord = splitCoordinates(dropElem.id);

        chess.board[targetCoord.y][targetCoord.x] = pieceInCell;
        pieceInCell.coords = [targetCoord.x, targetCoord.y];

        dropElem.appendChild(dragObject.draggedPieceFigure);
        dragObject.draggedPieceFigure.removeAttribute('style');
    };

    function resetMove (message) {
        dragObject.draggedPieceFigure.removeAttribute('style');

        if (message) {
            alert(message);
        } else {
            alert("can't do this action")
        }
    }
}();

var xCoordArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
var xCoordIndexCoordination = {a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7};

function findLeftAndRightEatCoordX (xCoord){
    var xCoordIndex = xCoordIndexCoordination[xCoord];

    var eatLeftCoordX = xCoordIndex - 1 >= 0 ? xCoordArr[xCoordIndex - 1] : null;
    var eatRightCoordX = xCoordIndex + 1 < xCoordArr.length ? xCoordArr[xCoordIndex + 1] : null;

    return [eatLeftCoordX, eatRightCoordX];
}

function splitCoordinates(coord) {
    coord = coord.split('-');

    return {x: coord[0], y: +coord[1]};
}