/**
 * Created by SamMFFL on 16/9/24.
 */


var board = [];
var score = 0;

$(function () {
    newGame();

    $('#newGame').bind('click', function () {
        newGame();
    })
});


function newGame() {
    //棋盘格初始化
    init();
    //随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();

}

function init() {
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
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0
        }
    }

    updateBoardView();
}

function updateBoardView() {
    $('.number-cell').remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            var theNumberCell = $('#number-cell-' + i + '-' + j);

            if (board[i][j] === 0) {
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPosTop(i, j) + 50);
                theNumberCell.css('left', getPosLeft(i, j) + 50);
            } else {
                theNumberCell.css('width', '100px');
                theNumberCell.css('height', '100px');
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css('left', getPosLeft(i, j));
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]))
                theNumberCell.css('color', getNumberColor(board[i][j]))
                theNumberCell.text(board[i][j]);
            }
        }
    }
}

function generateOneNumber() {
    if (noSpace(board)) {
        return false;
    }
    //随机一个位置
    var randomX = parseInt(Math.floor(Math.random() * 4));
    var randomY = parseInt(Math.floor(Math.random() * 4));
    while (true) {
        if (board[randomX][randomY] == 0) {
            break;
        }

        var randomX = parseInt(Math.floor(Math.random() * 4));
        var randomY = parseInt(Math.floor(Math.random() * 4));
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
            console.log('left');
            if (moveLeft()) {
                setTimeout(function () {
                    generateOneNumber();
                    sumTheScore();
                    isGameOver();
                }, 200);
            }
            break;
        case 38: //up
            if (moveUp()) {
                generateOneNumber();
                isGameOver();
            }
            break;
        case 39: //right
            if (moveRight()) {
                generateOneNumber();
                isGameOver();
            }
            break;
        case 40: //down
            if (moveDown()) {
                generateOneNumber();
                isGameOver();
            }
            break;
        default:
            break;
    }
});

function sumTheScore() {
    var sum = 0;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            sum += board[i][j];
        }
    }
    console.log(sum);
    $("#score").html(sum);
}

function isGameOver() {

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
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(function () {
        updateBoardView();
    }, 200);
    return true;
}