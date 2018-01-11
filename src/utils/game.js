/**
 * Created by SamMFFL on 2018/1/10.
 */
// import "babel-polyfill";
import {
    getSinglePos,
    removeElement,
    getNumberBackgroundColor,
    getITAlias,
    getNumberColor
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
    init() {
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

    test() {
        this.board[1][2] = 2;
        this._updateBoardView();
    }
}