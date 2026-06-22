import { world } from "@minecraft/server"

/**
 * スコアボードの値を追加します
 * @argument {import("@minecraft/server").Player|string} player 対象のプレイヤー
 * @argument {string} scoreBoardName 対象のスコアボード
 * @argument {number} number 追加する値
 */

export function addScore(player, scoreBoardName, number) {
    world.scoreboard.getObjective(scoreBoardName).addScore(player, number)
}

/**
 * スコアボードの値を減らします
 * @argument {import("@minecraft/server").Player|string} player 対象のプレイヤー
 * @argument {string} scoreBoardName 対象のスコアボード
 * @argument {number} number 減らす値
 */

export function removeScore(player, scoreBoardName, number) {
    world.scoreboard.getObjective(scoreBoardName).setScore(player, getScore(player, scoreBoardName) - number)
}

/**
 * スコアボードの値を設定します
 * @argument {import("@minecraft/server").Player|string} player 対象のプレイヤー
 * @argument {string} scoreBoardName 対象のスコアボード
 * @argument {number} number 設定する値
 */

export function setScore(player, scoreBoardName, number) {
    world.scoreboard.getObjective(scoreBoardName).setScore(player, number)
}

/**
 * スコアボードの値を取得
 * @argument {import("@minecraft/server").Player|string} player 対象のプレイヤー
 * @argument {string} scoreBoardName 対象のスコアボード
 * @returns {number}
 */

export function getScore(player, scoreBoardName) {
    return world.scoreboard.getObjective(scoreBoardName).getScore(player)
}

/**
 * スコアボードの値が指定した値以上かの検知
 * @argument {import("@minecraft/server").Player|string} player 対象のプレイヤー
 * @argument {string} scoreBoardName 対象のスコアボード
 * @argument {number} number 設定する値
 * @returns {boolean}
 */

export function searchScore(player, scoreBoardName, number) {
    return world.scoreboard.getObjective(scoreBoardName).getScore(player) >= number
}

/**
 * 指定した文字のスコアボードがワールドになければ追加します
 * @argument {string} scoreboardname スコアボードの名前
 */

export function ifNotExistScoreBoard(scoreboardname) {
    if (world.scoreboard.getObjective(scoreboardname) == undefined) {
        world.scoreboard.addObjective(scoreboardname)
    }
}

/**
 * 指定した文字のスコアボードがワールドにあれば削除します
 * @argument {string} scoreboardname スコアボードの名前
 */

export function ifExistScoreBoard(scoreboardname) {
    if (world.scoreboard.getObjective(scoreboardname) != undefined) {
        world.scoreboard.removeObjective(scoreboardname)
    }
}