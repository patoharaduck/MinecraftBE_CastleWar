/**
 * 指定した小数で四捨五入した値を返します
 * @param { number } number 四捨五入する値
 * @param { number } digit 小数第何位を四捨五入するのか
 * @returns { number }
 */

export function setRound(number, digit) {
    const keta = digit - 1
    const suuji = number * 10 ** keta
    const kaketaAtai = Math.round(suuji)
    return kaketaAtai / 10 ** keta
}

/**
 * 配列の中の一番大きな数字のインデックスを返します
 * @argument {number[]} array 取得する配列
 * @returns {number}
 */

export function getMaxIndex(array) {
    const index = array.findIndex(Math.max(...array))
    return index
}

/**
 * 2点の値の中間値を返します
 * @argument {number} number1 比較する値その1
 * @argument {number} number2 比較する値その2
 * @returns {number}
 */

export function middleNumber(number1, number2) {
    if (number1 > number2) {
        const middlePoint = Math.round((number1 - number2) / 2)
        return number2 + middlePoint
    } else {
        const middlePoint = Math.round((number2 - number1) / 2)
        return number1 + middlePoint
    }
}