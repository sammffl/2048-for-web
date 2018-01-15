/**
 * Created by SamMFFL on 2018/1/10.
 */
// import "babel-polyfill";
import {
    getSinglePos,
    removeElement,
    getNumberBackgroundColor,
    getITAlias,
    getNumberColor,
    noSpace,
    canMoveLeft,
    canMoveRight,
    canMoveUp,
    canMoveDown,
    noBlockHorizontal,
    noBlockVertical,
    noMove,
} from './support2048';

export default class game {

    constructor(props) {
        this._needAlias = props.needAlias;
        this.board = []; // 游戏位置计数板
        this.score = 0;
        this.hasConflicted = [];
        this.start = {
            x: 0,
            y: 0,
        };
        this.end = {
            x: 0,
            y: 0
        };
    };

    /**
     * 初始化
     */
    _init() {
        // 初始化游戏网格
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let $gridCell = document.querySelector(`#grid-cell-${i}-${j}`);
                $gridCell.style.top = `${getSinglePos(i)}rem`;
                $gridCell.style.left = `${getSinglePos(j)}rem`;
            }
        }

        // 初始化游戏计分板和冲突
        for (let i = 0; i < 4; i++) {
            this.board[i] = [];
            this.hasConflicted[i] = [];
            for (let j = 0; j < 4; j++) {
                this.board[i][j] = 0;
                this.hasConflicted[i][j] = false;
            }
        }

        this.score = 0;
        document.querySelector('#score').innerHTML = '0';
        this._updateBoardView(() => {
            document.querySelector('#grid-container').style.display = 'block';
        })
    }

    _bindTouch() {
        let self = this;
        document.addEventListener('touchstart', function (event) {
            self.start.x = event.touches[0].pageX;
            self.start.y = event.touches[0].pageY;
        });

        document.addEventListener('touchmove', function (event) {
            event.preventDefault();
        });

        document.addEventListener('touchend', function (event) {
            self.end.x = event.changedTouches[0].pageX;
            self.end.y = event.changedTouches[0].pageY;

            let deltaX = self.end.x - self.start.x;
            let deltaY = self.end.y - self.start.y;
            if (Math.abs(deltaX) < 30 && Math.abs(deltaY) < 30) return false;
            if (Math.abs(deltaX) >= Math.abs(deltaY)) {
                if (deltaX > 0) { // 向右滑动

                } else { // 向左滑动
                    if (self._moveLeft()) {
                        console.log('sdf');
                        setTimeout(() => {
                            console.log(123)
                            self._generateOneNumber();
                        }, 105);
                        setTimeout(() => {
                            self._isGameOver();
                        }, 150);
                    }else{
                        console.log('ss')
                    }
                }
            }

        })
    }

    _moveLeft() {
        if (!canMoveLeft(this.board)) return false;

        for (let i = 0; i < 4; i++) {
            for (let j = 1; j < 4; j++) {
                if (this.board[i][j] != 0) {
                    for (let k = 0; k < j; k++) {
                        if (this.board[i][k] == 0 && noBlockHorizontal(i, k, j, this.board)) {
                            // 没有阻碍，继续往左移
                            this._showMoveAnimation(i, j, i, k);
                            this.board[i][k] = this.board[i][j];
                            this.board[i][j] = 0;
                            continue;

                        } else if (this.board[i][k] == this.board[i][j] &&
                            noBlockHorizontal(i, k, j, this.board) && !this.hasConflicted[i][k]) {

                            this._showMoveAnimation(i, j, i, k);
                            this.board[i][k] += this.board[i][j];
                            this.board[i][j] = 0;
                            this.score += this.board[i][k];
                            this._updateScore(this.score);
                            this.hasConflicted[i][k] = true;

                            continue;
                        }
                    }
                }
            }
        }

        setTimeout(() => {
            this._updateBoardView();
        }, 100);
        return true;
    }


    /**
     * 更新游戏计数板
     * @param callback
     * @private
     */
    _updateBoardView(callback) {
        removeElement(document.querySelectorAll('.number-cell'));

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.board[i][j] !== 0) { // 该位置有数值
                    const boardNumber = this.board[i][j];
                    let numberCellDiv = document.createElement('div');
                    numberCellDiv.id = `number-cell-${i}-${j}`;
                    numberCellDiv.className = 'number-cell';
                    numberCellDiv.style.top = `${getSinglePos(i)}rem`;
                    numberCellDiv.style.left = `${getSinglePos(j)}rem`;
                    numberCellDiv.style.backgroundColor = getNumberBackgroundColor(boardNumber);
                    numberCellDiv.style.color = getNumberColor(boardNumber);
                    numberCellDiv.innerHTML = this._needAlias ? getITAlias(boardNumber) : boardNumber;
                    document.querySelector('#grid-container').appendChild(numberCellDiv);
                }
                this.hasConflicted[i][j] = false;
            }
        }
        !!callback && callback();
    }

    _createNumberCell(i,j , num){
        const boardNumber = num;
        let numberCellDiv = document.createElement('div');
        numberCellDiv.id = `number-cell-${i}-${j}`;
        numberCellDiv.className = 'number-cell';
        numberCellDiv.style.top = `${getSinglePos(i)}rem`;
        numberCellDiv.style.left = `${getSinglePos(j)}rem`;
        numberCellDiv.style.backgroundColor = getNumberBackgroundColor(boardNumber);
        numberCellDiv.style.color = getNumberColor(boardNumber);
        numberCellDiv.innerHTML = this._needAlias ? getITAlias(boardNumber) : boardNumber;
        document.querySelector('#grid-container').appendChild(numberCellDiv);
    }

    /**
     * 随机空位置生成2或者4
     * @returns {boolean}
     */
    _generateOneNumber() {
        console.log(123);
        if (noSpace(this.board)) return false;

        let randomX = parseInt(Math.floor(Math.random() * 4));
        let randomY = parseInt(Math.floor(Math.random() * 4));
        let times = 0;
        while (times < 50) {
            if (this.board[randomX][randomY] == 0)break;

            randomX = parseInt(Math.floor(Math.random() * 4));
            randomY = parseInt(Math.floor(Math.random() * 4));
            times++;
        }

        if (times >= 50) {
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (this.board[i][j] == 0) {
                        randomX = i;
                        randomY = j;
                    }
                }
            }
        }

        //随机一个数字
        let randNumber = this.board[randomX][randomY] = Math.random() < 0.5 ? 2 : 4;
        // this._showNumberWithAnimation(randomX, randomY, randNumber);
        this._createNumberCell(randomX,randomY, randNumber);
        return true;
    }

    _showNumberWithAnimation(i, j, num) {

        // let numberCell = $('#number-cell-' + i + '-' + j);
        //
        //
        //
        // numberCell.css('background-color', getNumberBackgroundColor(num));
        // numberCell.css('color', getNumberColor(num));
        // numberCell.text(getITAlias(num));
        // numberCell.animate({
        //     top: `${getSinglePos(i)}rem`,
        //     left: `${getSinglePos(j)}rem`,
        // }, 50);

    }

    _showMoveAnimation(fromX, fromY, toX, toY) {
        console.log(fromX, fromY, toX, toY);
        let numberCell = $('#number-cell-' + fromX + '-' + fromY);
        numberCell.animate({
            top: `${getSinglePos(toX)}rem`,
            left: `${getSinglePos(toY)}rem`
        }, 100);
    }

    _updateScore(score) {
        $('#score').text(score);
    }

    _isGameOver() {
        if (noSpace(this.board) && noMove(this.board)) {
            this._gameOver();
        }
    }

    _gameOver() {
        alert('game over!');
    }


    startGame() {
        this._init();
        this._generateOneNumber();
        this._generateOneNumber();
        this._updateBoardView();
        this._bindTouch();
    }
}