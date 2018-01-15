/**
 * Created by SamMFFL on 2018/1/10.
 */

const px2rem = (x, base = 37.5) => (x / base);

/**
 * 获取实际位置偏离原点值
 * @param num
 * @param cellPadding
 * @param cellWidth
 * @returns {*}
 */
export function getSinglePos(num, cellPadding = 8, cellWidth = 80) {
    return px2rem(cellPadding) + (px2rem(cellWidth) + px2rem(cellPadding)) * num;
}

/**
 * 删除页面元素
 * @param element
 * @returns {boolean}
 */
export function removeElement(element) {
    if (!element)return false;

    const elementType = Object.prototype.toString.call(element);
    let parentE;
    if (/\[object NodeList\]/ig.test(elementType)) {
        if (element.length == 0)return false;

        const elementsArray = Array.prototype.slice.call(element);
        parentE = elementsArray[0].parentNode;
        if (parentE) {
            elementsArray.forEach((e) => {
                parentE.removeChild(e);
            });
        }
    } else {
        parentE = element.parentNode;
        if (parentE) {
            parentE.removeChild(element);
        }
    }
    return true;
}

export function getNumberBackgroundColor(number) {
    const colors = {
        2: "#eee4da",
        4: "#ede0c8",
        8: "#f2b179",
        16: "#f59563",
        32: "#f67c5f",
        64: "#f65e3b",
        128: "#edcf72",
        256: "#edcc61",
        512: "#9c0",
        1024: "#33b5e5",
        2048: "#09c",
        4096: "#a6c",
        8192: "#93c",
    };

    return colors[number] || 'black';
}

export function getNumberColor(number) {
    if (number <= 4) {
        return '#776e65';
    }
    return 'white';
}

/**
 * 别名，把数字转换成名称
 * @param number
 * @returns {*|string}
 */
export function getITAlias(number) {

    const aliasName = {
        2: "小白",
        4: "实习生",
        8: "程序猿",
        16: "项目经理",
        32: "架构师",
        64: "技术经理",
        128: "高级经理",
        256: "技术总监",
        512: "副总裁",
        1024: "CTO",
        2048: "总裁",
    };

    return aliasName[number] || '神人';
}

/**
 * 判断是否有空间
 * @param board
 * @returns {boolean}
 */
export function noSpace(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}


export function canMoveLeft(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

export function canMoveRight(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

export function canMoveUp(board) {
    for (let j = 0; j < 4; j++) {
        for (let i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

export function canMoveDown(board) {
    for (let j = 0; j < 4; j++) {
        for (let i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}


export function noBlockHorizontal(row, col1, col2, board) {
    for (let i = col1 + 1; i < col2; i++) {
        if (board[row][i] != 0) {
            return false;
        }
    }
    return true;
}

export function noBlockVertical(col, row1, row2, board) {
    for (let i = row1 + 1; i < row2; i++) {
        if (board[i][col] != 0) {
            return false;
        }
    }
    return true;
}

export function noMove(board) {
    if (canMoveLeft(board) ||
        canMoveRight(board) ||
        canMoveUp(board) ||
        canMoveDown(board)) {
        return false;
    }
    return true;
}


export default {
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
}