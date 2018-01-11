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


export function getNumberColor(number) {
    if (number <= 4) {
        return '#776e65';
    }
    return 'white';
}


export default {
    getSinglePos,
    removeElement,
    getNumberBackgroundColor,
    getITAlias,
    getNumberColor
}