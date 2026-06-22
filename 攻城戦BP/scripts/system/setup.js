import { world } from "@minecraft/server";

/**
 * ゲームをセットアップするためのスコア追加とかのいろいろ
 */

export function setUp() {
    const scoreboard = world.scoreboard
    scoreboard.addObjective(`leader`)
    scoreboard.addObjective(`death`)
    scoreboard.addObjective(`kill`)
    scoreboard.addObjective(`play`)
    scoreboard.addObjective(`redleader`)
    scoreboard.addObjective(`blueleader`)
    scoreboard.addObjective(`teamNumber`)
    scoreboard.addObjective(`time`)
    scoreboard.addObjective(`structure`)

    world.gameRules.showDeathMessages = false
}