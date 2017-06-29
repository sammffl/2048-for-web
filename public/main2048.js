/**
 * Created by SamMFFL on 16/9/24.
 */


var board = [];
var score = 0;
var hasConflicted = [];

var start = {
    x: 0,
    y: 0
}
var end = {
    x: 0,
    y: 0
}

$(function () {
    prepareForMobile()

    newGame();

    $('#newGame').bind('click', function () {
        newGame();
    })
});

function prepareForMobile() {
    if (documentWidth > 500) {
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }


    $('#grid-container').css('width', gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('height', gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('padding', cellSpace);
    $('#grid-container').css('border-radius', 0.02 * gridContainerWidth);

    $('.grid-cell').css('width', cellSideLength);
    $('.grid-cell').css('height', cellSideLength);
    // $('.grid-cell').css('border-radius', 0.02 * cellSideLength);
}

function newGame() {
    //棋盘格初始化
    init();
    //随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();

}

function init() {
    $('#grid-container').hide();
    board = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var $gridCell = $('#grid-cell-' + i + '-' + j);
            $gridCell.css('top', getPosTop(i, j))
            $gridCell.css('left', getPosLeft(i, j))
        }
    }

    for (var i = 0; i < 4; i++) {
        board[i] = [];
        hasConflicted[i] = [];
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView(function () {
        $('#grid-container').show();
    });
    score = 0;
    $('#score').text(0);
}

function updateBoardView(callback) {
    $('.number-cell').remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            var theNumberCell = $('#number-cell-' + i + '-' + j);

            if (board[i][j] === 0) {
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPosTop(i, j) + cellSideLength / 2);
                theNumberCell.css('left', getPosLeft(i, j) + cellSideLength / 2);
            } else {
                theNumberCell.css('width', cellSideLength + 'px');
                theNumberCell.css('height', cellSideLength + 'px');
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css('left', getPosLeft(i, j));
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]))
                theNumberCell.css('color', getNumberColor(board[i][j]))
                theNumberCell.text(getITAlias(board[i][j]));
            }
            hasConflicted[i][j] = false;
        }
    }

    $('.number-cell').css('line-height', cellSideLength + 'px');
    // $('.number-cell').css('border-radius', 0.02 * cellSideLength + 'px');
    // $('.number-cell').css('font-size', 0.6 * cellSideLength + 'px');


    if (!!callback && typeof callback == "function") {
        callback();
    }
}

function generateOneNumber() {
    if (noSpace(board)) {
        return false;
    }
    //随机一个位置
    var randomX = parseInt(Math.floor(Math.random() * 4));
    var randomY = parseInt(Math.floor(Math.random() * 4));

    var times = 0;
    while (times < 50) {
        if (board[randomX][randomY] == 0) {
            break;
        }

        var randomX = parseInt(Math.floor(Math.random() * 4));
        var randomY = parseInt(Math.floor(Math.random() * 4));
        times++;
    }

    if (times == 50) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] == 0) {
                    randomX = i;
                    randomY = j;
                }
            }
        }
    }


    //随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    //显示数字
    board[randomX][randomY] = randNumber;
    showNumberWithAnimation(randomX, randomY, randNumber);

    return true;
}


$(document).keydown(function (e) {

    switch (e.keyCode) {
        case 37: //left
            event.preventDefault();
            if (moveLeft()) {
                setTimeout(function () {
                    generateOneNumber();
                }, 105);
                setTimeout(function () {
                    isGameOver();
                }, 150);
            }
            break;
        case 38: //up
            event.preventDefault();
            if (moveUp()) {
                setTimeout(function () {
                    generateOneNumber();
                }, 105);
                setTimeout(function () {
                    isGameOver();
                }, 150);
            }
            break;
        case 39: //right
            event.preventDefault();
            if (moveRight()) {
                setTimeout(function () {
                    generateOneNumber();
                }, 105);
                setTimeout(function () {
                    isGameOver();
                }, 150);
            }
            break;
        case 40: //down
            event.preventDefault();
            if (moveDown()) {
                setTimeout(function () {
                    generateOneNumber();
                }, 105);
                setTimeout(function () {
                    isGameOver();
                }, 150);
            }
            break;
        default:
            break;
    }
});

document.addEventListener('touchstart', function (event) {
    start.x = event.touches[0].pageX;
    start.y = event.touches[0].pageY;
});

document.addEventListener('touchmove', function (event) {
    event.preventDefault();
});

document.addEventListener('touchend', function (event) {
    end.x = event.changedTouches[0].pageX;
    end.y = event.changedTouches[0].pageY;

    var deltaX = end.x - start.x;
    var deltaY = end.y - start.y;
    if (Math.abs(deltaX) < 30 && Math.abs(deltaY) < 30) {
        return;
    }

    if (Math.abs(deltaX) >= Math.abs(deltaY)) {
        if (deltaX > 0) {
            if (moveRight()) {
                setTimeout(function () {
                    generateOneNumber();
                }, 105);
                setTimeout(function () {
                    isGameOver();
                }, 150);
            }
        } else {
            if (moveLeft()) {
                setTimeout(function () {
                    generateOneNumber();
                }, 105);
                setTimeout(function () {
                    isGameOver();
                }, 150);
            }
        }
    } else {
        if (deltaY > 0) {
            if (moveDown()) {
                setTimeout(function () {
                    generateOneNumber();
                }, 105);
                setTimeout(function () {
                    isGameOver();
                }, 150);
            }
        } else {
            if (moveUp()) {
                setTimeout(function () {
                    generateOneNumber();
                }, 105);
                setTimeout(function () {
                    isGameOver();
                }, 150);
            }
        }
    }
});


function isGameOver() {
    if (noSpace(board) && noMove(board)) {
        gameOver();
    }
}
function gameOver() {
    alert('game over!');
}

function moveLeft() {
    if (!canMoveLeft(board))
        return false;

    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] == board[i][j] &&
                        noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;

                        continue;
                    }
                }
            }
        }
    }
    setTimeout(function () {
        updateBoardView();
    }, 100);
    return true;
}

function moveRight() {
    if (!canMoveRight(board)) {
        return false;
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] == board[i][j] &&
                        noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(function () {
        updateBoardView();
    }, 100);
    return true;
}

function moveUp() {
    if (!canMoveUp(board)) {
        return false;
    }

    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[k][j] == board[i][j] &&
                        noBlockVertical(j, k, i, board) && !hasConflicted[k][j]) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];

                        updateScore(score);
                        hasConflicted[k][j] = true;
                        continue
                    }
                }
            }
        }
    }
    setTimeout(function () {
        updateBoardView();
    }, 100);
    return true;
}

function moveDown() {
    if (!canMoveDown(board)) {
        return false;
    }

    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[k][j] == board[i][j] &&
                        noBlockVertical(j, i, k, board) && !hasConflicted[k][j]) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];

                        updateScore(score);
                        hasConflicted[k][j] = true;
                        continue
                    }
                }
            }
        }
    }
    setTimeout(function () {
        updateBoardView();
    }, 100);
    return true;
}