/**
 * Created by SamMFFL on 16/9/24.
 */

function showNumberWithAnimation(i, j, num) {
    var numberCell = $('#number-cell-' + i + '-' + j);

    numberCell.css('background-color', getNumberBackgroundColor(num));
    numberCell.css('color', getNumberColor(num));
    // numberCell.text(num);
    numberCell.text(getITAlias(num));
    numberCell.animate({
        width: cellSideLength+"px",
        height: cellSideLength+'px',
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 50);
}

function showMoveAnimation(fromX, fromY, toX, toY) {
    console.log(fromX, fromY, toX, toY);
    var numberCell = $('#number-cell-' + fromX + '-' + fromY);
    numberCell.animate({
        top: getPosTop(toX, toY),
        left: getPosLeft(toX, toY)
    }, 100);
}

function updateScore(score) {
    $('#score').text(score);
}