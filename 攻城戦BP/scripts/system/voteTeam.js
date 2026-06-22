import { world, system, StructureSaveMode } from "@minecraft/server";
import { uiManager, ModalFormData } from "@minecraft/server-ui";
import { arraySort } from "../docs/array";
import { addScore, getScore, ifExistScoreBoard, ifNotExistScoreBoard, setScore } from "../docs/scoreBoard";
import { setNameTagColor, removeTeamTagALL, searchRed, searchBlue } from "../docs/team";

/**
 * スタート
 * @argument {number} time スタートまでの時間
 * @argument {number} end 終了までの時間
 */

export function start2 (time, end) {
    try {
        return new Promise((resolve) => {
            const attackPlayer = world.getPlayers({tags : [`def`]})[0]

            if (attackPlayer.hasTag(`red`)) {
                world.sendMessage(`§c赤チーム§rのみなさん,各自所定の位置についてください`)
                for (const player of world.getPlayers({tags : [`red`]})) {
                    player.setGameMode(`adventure`)
                    player.teleport({x : 0, y : -60, z : 31})
                    player.playSound(
                        `mob.creeper.say`
                    )
                }

                let t = 0
                const rTime = system.runInterval(() => {
                    for (const player of world.getPlayers()) {
                        player.onScreenDisplay.setActionBar(`準備終了まで §e${time - t}秒`)
                    }

                    if (time - t <= 3) {
                        for (const player of world.getPlayers()) {
                            player.onScreenDisplay.setTitle(`§a${time - t}`)
                        }
                    }
                    if (time - t <= 0) {
                        system.clearRun(rTime)
                        for (const player of world.getPlayers()) {
                            player.onScreenDisplay.setTitle(`§eスタート`)
                            player.setGameMode(`adventure`)

                            if (player.hasTag(`red`)) {
                                player.addTag(`started`)
                            }

                            if (player.hasTag(`blue`)) {
                                player.teleport({x : 0, y : -60, z : 31})
                            }
                        }

                        let s = 0;
                        let m = 0

                        const Ptime = system.runInterval(() => {
                            for (const player of world.getPlayers()) {
                                player.onScreenDisplay.setActionBar(`経過時間 §a${m}§r分 §b${s}§r秒`)
                            }

                            if (m >= end) {
                                system.clearRun(Ptime)
                                world.sendMessage(`${end}分経過しました, 試合終了です`)
                                setScore(`redtime`, `time`, m * 60 + s)
                                for (const player of world.getPlayers()) {
                                    player.setGameMode(`spectator`)
                                }
                                resolve()
                            }

                            const d = world.getPlayers({tags : [`death`, `leader`, `red`]})[0]
                            if (d != undefined) {
                                if (d.hasTag(`leader`) && d.hasTag(`red`)) {
                                    system.clearRun(Ptime)
                                    world.sendMessage(`チームリーダーが死にました, 試合終了です`)
                                    world.sendMessage(`経過時間は §a${m}§r分 §b${s}§r秒 です`)
                                    setScore(`redtime`, `time`, m * 60 + s)
                                    for (const player of world.getPlayers()) {
                                        player.setGameMode(`spectator`)
                                    }
                                    resolve()
                                }
                            }

                            s ++
                            if (s >= 60) {
                                m ++
                                s = 0
                            }
                        }, 20)
                    }
                    t ++
                }, 20)
            } else if (attackPlayer.hasTag(`blue`)) {
                world.sendMessage(`§b青チーム§rのみなさん,各自所定の位置についてください`)
                for (const player of world.getPlayers({tags : [`blue`]})) {
                    player.setGameMode(`adventure`)
                    player.teleport({x : 0, y : -60, z : 31})
                    player.playSound(
                        `mob.creeper.say`
                    )
                }

                let t = 0
                const rTime = system.runInterval(() => {
                    for (const player of world.getPlayers()) {
                        player.onScreenDisplay.setActionBar(`準備終了まで §e${time - t}秒`)
                    }

                    if (time - t <= 3) {
                        for (const player of world.getPlayers()) {
                            player.onScreenDisplay.setTitle(`§a${time - t}`)
                        }
                    }
                    if (time - t <= 0) {
                        system.clearRun(rTime)
                        for (const player of world.getPlayers()) {
                            player.onScreenDisplay.setTitle(`§eスタート`)
                            player.setGameMode(`adventure`)

                            if (player.hasTag(`blue`)) {
                                player.addTag(`started`)
                            }

                            if (player.hasTag(`red`)) {
                                player.teleport({x : 0, y : -60, z : 31})
                            }
                        }

                        let s = 0;
                        let m = 0

                        const Ptime = system.runInterval(() => {
                            for (const player of world.getPlayers()) {
                                player.onScreenDisplay.setActionBar(`経過時間 §a${m}§r分 §b${s}§r秒`)
                            }

                            if (m >= end) {
                                system.clearRun(Ptime)
                                world.sendMessage(`${end}分経過しました, 試合終了です`)
                                setScore(`bluetime`, `time`, m * 60 + s)
                                for (const player of world.getPlayers()) {
                                    player.setGameMode(`spectator`)
                                }
                                resolve()
                            }

                            const d = world.getPlayers({tags : [`death`, `leader`, `blue`]})[0]
                            if (d != undefined) {
                                if (d.hasTag(`leader`) && d.hasTag(`blue`)) {
                                    system.clearRun(Ptime)
                                    world.sendMessage(`チームリーダーが死にました, 試合終了です`)
                                    world.sendMessage(`経過時間は §a${m}§r分 §b${s}§r秒 です`)
                                    setScore(`bluetime`, `time`, m * 60 + s)
                                    for (const player of world.getPlayers()) {
                                        player.setGameMode(`spectator`)
                                    }
                                    resolve()
                                }
                            }

                            s ++
                            if (s >= 60) {
                                m ++
                                s = 0
                            }
                        }, 20)
                    }
                    t ++
                }, 20)
            }
        })
    }
    catch (error) {
        console.warn(`エラー内容:${error}, エラーのある場所:${error.stack}`)
    }
}


/**
 * スタート
 * @argument {number} time スタートまでの時間
 * @argument {number} end 終了までの時間
 */

export function start1 (time, end) {
    try {
        return new Promise((resolve) => {
            const attackPlayer = world.getPlayers({tags : [`attack`]})[0]

            if (attackPlayer.hasTag(`red`)) {
                world.sendMessage(`§c赤チーム§rのみなさん,各自所定の位置についてください`)
                for (const player of world.getPlayers({tags : [`red`]})) {
                    player.setGameMode(`adventure`)
                    player.teleport({x : 0, y : -60, z : 31})
                    player.playSound(
                        `mob.creeper.say`
                    )
                }

                let t = 0
                const rTime = system.runInterval(() => {
                    for (const player of world.getPlayers()) {
                        player.onScreenDisplay.setActionBar(`準備終了まで §e${time - t}秒`)
                    }

                    if (time - t <= 3) {
                        for (const player of world.getPlayers()) {
                            player.onScreenDisplay.setTitle(`§a${time - t}`)
                        }
                    }
                    if (time - t <= 0) {
                        system.clearRun(rTime)
                        for (const player of world.getPlayers()) {
                            player.onScreenDisplay.setTitle(`§eスタート`)
                            player.setGameMode(`adventure`)

                            if (player.hasTag(`red`)) {
                                player.addTag(`started`)
                            }

                            if (player.hasTag(`blue`)) {
                                player.teleport({x : 0, y : -60, z : 31})
                            }
                        }

                        let s = 0;
                        let m = 0

                        const Ptime = system.runInterval(() => {
                            for (const player of world.getPlayers()) {
                                player.onScreenDisplay.setActionBar(`経過時間 §a${m}§r分 §b${s}§r秒`)
                            }

                            if (m >= end) {
                                system.clearRun(Ptime)
                                world.sendMessage(`${end}分経過しました, 攻守交代です`)
                                setScore(`redtime`, `time`, m * 60 + s)
                                for (const player of world.getPlayers()) {
                                    player.setGameMode(`spectator`)
                                }
                                resolve()
                            }

                            const d = world.getPlayers({tags : [`death`, `leader`, `red`]})[0]
                            if (d != undefined) {
                                if (d.hasTag(`leader`) && d.hasTag(`red`)) {
                                    system.clearRun(Ptime)
                                    world.sendMessage(`チームリーダーが死にました, 攻守交代です`)
                                    world.sendMessage(`経過時間は §a${m}§r分 §b${s}§r秒 です`)
                                    setScore(`redtime`, `time`, m * 60 + s)
                                    for (const player of world.getPlayers()) {
                                        player.setGameMode(`spectator`)
                                    }
                                    resolve()
                                }
                            }

                            s ++
                            if (s >= 60) {
                                m ++
                                s = 0
                            }
                        }, 20)
                    }
                    t ++
                }, 20)
            } else if (attackPlayer.hasTag(`blue`)) {
                world.sendMessage(`§b青チーム§rのみなさん,各自所定の位置についてください`)
                for (const player of world.getPlayers({tags : [`blue`]})) {
                    player.setGameMode(`adventure`)
                    player.teleport({x : 0, y : -60, z : 31})
                    player.playSound(
                        `mob.creeper.say`
                    )
                }

                let t = 0
                const rTime = system.runInterval(() => {
                    for (const player of world.getPlayers()) {
                        player.onScreenDisplay.setActionBar(`準備終了まで §e${time - t}秒`)
                    }

                    if (time - t <= 3) {
                        for (const player of world.getPlayers()) {
                            player.onScreenDisplay.setTitle(`§a${time - t}`)
                        }
                    }
                    if (time - t <= 0) {
                        system.clearRun(rTime)
                        for (const player of world.getPlayers()) {
                            player.onScreenDisplay.setTitle(`§eスタート`)
                            player.setGameMode(`adventure`)

                            if (player.hasTag(`blue`)) {
                                player.addTag(`started`)
                            }

                            if (player.hasTag(`red`)) {
                                player.teleport({x : 0, y : -60, z : 31})
                            }
                        }

                        let s = 0;
                        let m = 0

                        const Ptime = system.runInterval(() => {
                            for (const player of world.getPlayers()) {
                                player.onScreenDisplay.setActionBar(`経過時間 §a${m}§r分 §b${s}§r秒`)
                            }

                            if (m >= end) {
                                system.clearRun(Ptime)
                                world.sendMessage(`${end}分経過しました, 攻守交代です`)
                                setScore(`bluetime`, `time`, m * 60 + s)
                                for (const player of world.getPlayers()) {
                                    player.setGameMode(`spectator`)
                                }
                                resolve()
                            }

                            const d = world.getPlayers({tags : [`death`, `leader`, `blue`]})[0]
                            if (d != undefined) {
                                if (d.hasTag(`leader`) && d.hasTag(`blue`)) {
                                    system.clearRun(Ptime)
                                    world.sendMessage(`チームリーダーが死にました, 攻守交代です`)
                                    world.sendMessage(`経過時間は §a${m}§r分 §b${s}§r秒 です`)
                                    setScore(`bluetime`, `time`, m * 60 + s)
                                    for (const player of world.getPlayers()) {
                                        player.setGameMode(`spectator`)
                                    }
                                    resolve()
                                }
                            }

                            s ++
                            if (s >= 60) {
                                m ++
                                s = 0
                            }
                        }, 20)
                    }
                    t ++
                }, 20)
            }
        })
    }
    catch (error) {
        console.warn(`エラー内容:${error}, エラーのある場所:${error.stack}`)
    }
}

/**
 * 攻守決め
 */

export function setAttack() {
    try {
        return new Promise((resolve) => {
            system.runTimeout(() => {
                const numberRandom = Math.floor(Math.random() * 10)

                if (numberRandom > 4) {
                    for (const player of world.getPlayers()) {
                        player.playSound(
                            `note.harp`,
                            {
                                pitch : 0.5
                            }
                        )
                        if (player.hasTag(`attack`)) {
                            player.removeTag(`attack`)
                        }
                        if (player.hasTag(`def`)) {
                            player.removeTag(`def`)
                        }

                        if (player.hasTag(`red`)) {
                            player.addTag(`attack`)
                        } else if (player.hasTag(`blue`)) {
                            player.addTag(`def`)
                        }
                    }
                    world.sendMessage(`§c赤チーム§rが先に防衛をします`)
                } else {
                    for (const player of world.getPlayers()) {
                        player.playSound(
                            `note.harp`,
                            {
                                pitch : 0.5
                            }
                        )
                        if (player.hasTag(`attack`)) {
                            player.removeTag(`attack`)
                        }
                        if (player.hasTag(`def`)) {
                            player.removeTag(`def`)
                        }

                        if (player.hasTag(`red`)) {
                            player.addTag(`def`)
                        } else if (player.hasTag(`blue`)) {
                            player.addTag(`attack`)
                        }
                    }
                    world.sendMessage(`§b青チーム§rが先に防衛をします`)
                }

                resolve()
            }, 40)
        })
    }
    catch (error) {
        console.warn(`エラー内容:${error}, エラーのある場所:${error.stack}`)
    }
}

/**
 * 建築フェーズの処理
 *@argument {number} time 建築フェーズの時間 
 */

 export function buildCastle(time) {
    try {
        return new Promise(resolve => {
            world.sendMessage(`各チーム要塞の建築をしてください!時間は§b${time}秒§rです!`)
            for (const player of world.getPlayers()) {
                player.setGameMode(`creative`)
                player.playSound(
                    `mob.irongolem.hit`
                )

                if (player.hasTag(`red`)) {
                    player.teleport({x : -20, y : -60, z : 31})
                } else if (player.hasTag(`blue`)) {
                    player.teleport({x : 20, y : -60, z : 31})
                }
            }

            let t = 0
            const Ctime = system.runInterval(() => {
                for (const player of world.getPlayers()) {
                    player.onScreenDisplay.setActionBar(`残り建築時間 §a${time - t}秒§r`)
                }

                if (time - t <= 0) {
                    system.clearRun(Ctime)
                    world.sendMessage(`--建築終了--`)

                    for (const player of world.getPlayers()) {
                        player.playSound(
                            `random.levelup`
                        )
                        player.setGameMode(`spectator`)
                        player.teleport({x : 0, y : -60, z : 31})
                        const inventory = player.getComponent(`minecraft:inventory`).container
                        inventory.clearAll()
                    }

                    addScore(`red`, `structure`, 0)
                    addScore(`blue`, `structure`, 0)
                    const redC = getScore(`red`, `structure`)
                    const blueC = getScore(`blue`, `structure`)

                    world.structureManager.createFromWorld(
                        `mystructure:blue${redC}`,
                        world.getDimension(`overworld`),
                        {
                            x : 5,
                            y : -64,
                            z : 16
                        },
                        {
                            x : 54,
                            y : -2,
                            z : 45
                        },
                        {
                            saveMode : StructureSaveMode.World
                        }
                    )
                    world.structureManager.createFromWorld(
                        `mystructure:red${blueC}`,
                        world.getDimension(`overworld`),
                        {
                            x : -54,
                            y : -64,
                            z : 16
                        },
                        {
                            x : -5,
                            y : -2,
                            z : 45
                        },
                        {
                            saveMode : StructureSaveMode.World
                        }
                    )
                    addScore(`red`, `structure`, 1)
                    addScore(`blue`, `structure`, 1)

                    resolve()
                }

                t ++
            }, 20)
        })
    }
    catch (error) {
        console.warn(`エラー内容:${error}, エラーのある場所:${error.stack}`)
    }
 }

/**
 * チームリーダーが決まるまでの一連の流れの処理
 * @argument {number} time 投票終了までの時間
 * @returns {Promise}
 */

export function voteTeam(time) {
    try {
        return new Promise((resolve) => {
            let totalPlayer = 0

            world.sendMessage(`チームのリーダーを決める投票をします!時間は§b${time}秒§rです!`)

            setLeaderScoreBoard()
            for (const player of world.getPlayers()) {
                playerTagSetting(player)
                VoteTeamLeader(player)
                player.setGameMode(`adventure`)
                player.playSound(
                    `click_on.wooden_pressure_plate`
                )

                if (player.hasTag(`red`)) {
                    addScore(player, `redleader`, 0)
                } else if (player.hasTag(`blue`)) {
                    addScore(player, `blueleader`, 0)
                }
                if (player.hasTag(`ready`)) {
                    player.removeTag(`ready`)
                }
                totalPlayer ++
            };

            setScore(`投票`, `totalvote`, 0)

            let vt = 0;
            const voteTime = system.runInterval(() => {
                if (getScore(`投票`, `totalvote`) == totalPlayer) {
                    system.clearRun(voteTime)
                    decideLeader().then(() => {
                        resolve()
                    })
                } else if (vt >= time) {
                    for (const player of world.getPlayers()) {
                        uiManager.closeAllForms(player)
                    }
                    system.clearRun(voteTime)
                    decideLeader().then(() => {
                        resolve()
                    })
                }

                vt ++
            },20)
        })
    }
    catch (error) {
        console.warn(`エラー内容:${error}, エラーのある場所:${error.stack}`)
    }
}


/**
 * リーダー決定の処理まとめ
 */

async function decideLeader() {
    ReddecideLeader()
    bluedecideLeader()
}


/**
 * チームリーダーを決める処理(赤)
 */

async function ReddecideLeader() {
    try {
        const red = world.getPlayers({tags : [`red`]});
        var scoreList = []
    
        for (const allScore of world.scoreboard.getObjective(`redleader`).getScores()) {
            scoreList.push(allScore.score)
        };
    
        const maxScore = Math.max(...scoreList);
        const candeLPlayer = red.filter(element => getScore(element, `redleader`) == maxScore)
        const leaderPlayer = candeLPlayer[Math.floor(Math.random() * candeLPlayer.length)];
        leaderPlayer.addTag(`leader`)

        world.sendMessage(`${leaderPlayer.nameTag}§6が§c赤チーム§6のリーダーになりました!`)

        for (const player of red) {
            player.playSound(
                `firework.launch`
            )
        }
    }
    catch (error) {
        console.warn(`エラー内容:${error}, エラーのある場所:${error.stack}`)
    }
}


/**
 * チームリーダーを決める処理(青)
 */

async function bluedecideLeader() {
    try {
        const blue = world.getPlayers({tags : [`blue`]});
        var scoreList = []
    
        for (const allScore of world.scoreboard.getObjective(`blueleader`).getScores()) {
            scoreList.push(allScore.score)
        };
    
        const maxScore = Math.max(...scoreList);
        const candeLPlayer = blue.filter(element => getScore(element, `blueleader`) == maxScore)
        const leaderPlayer = candeLPlayer[Math.floor(Math.random() * candeLPlayer.length)];
        leaderPlayer.addTag(`leader`)
        world.sendMessage(`${leaderPlayer.nameTag}§6が§b青チーム§6のリーダーになりました!`)

        for (const player of blue) {
            player.playSound(
                `firework.launch`
            )
        }
    }
    catch (error) {
        console.warn(`エラー内容:${error}, エラーのある場所:${error.stack}`)
    }
}


/**
 * チームリーダーを決める投票のフォーム処理
 * @argument {import("@minecraft/server").Player} player フォームを表示するプレイヤー
 */

async function VoteTeamLeader(player) {
    try {
        const form = new ModalFormData()
        .title(`チームリーダーの投票`);
    
        let teamList = []
        player.playSound(
            `tile.piston.in`
        )
        if (player.hasTag(`red`)) {
            const redTeam = world.getPlayers({tags : [`red`]});
            for (const player of redTeam) {
                teamList.push(player.name)
            };
            teamList = arraySort(teamList)
            form.dropdown(`投票するプレイヤー`, teamList)

            const response = await form.show(player);
    
            if (!response.canceled) {
                const selectedPlayer = redTeam.find(element => element.name == teamList[response.formValues]);
                addScore(selectedPlayer, `redleader`, 1)
                addScore(`投票`, `totalvote`, 1)
            } else {
                addScore(`投票`, `totalvote`, 1)
            }
        } else if (player.hasTag(`blue`)) {
            const blueTeam = world.getPlayers({tags : [`blue`]});
            for (const player of blueTeam) {
                teamList.push(player.name)
            };
            teamList = arraySort(teamList)
            form.dropdown(`投票するプレイヤー`, teamList)
    
            const response = await form.show(player);
    
            if (!response.canceled) {
                const selectedPlayer = blueTeam.find(element => element.name == teamList[response.formValues]);
                addScore(selectedPlayer, `blueleader`, 1)
                addScore(`投票`, `totalvote`, 1)
            } else {
                addScore(`投票`, `totalvote`, 1)
            }
        }
    }
    catch (error) {
        console.warn(`エラー内容:${error}, エラーのある場所:${error.stack}`)
    }
}


/**
 * リーダースコアボードの処理
 */

function setLeaderScoreBoard() {
    try {
        ifExistScoreBoard(`totalvote`)
        ifExistScoreBoard(`redleader`)
        ifExistScoreBoard(`blueleader`)
        ifNotExistScoreBoard(`totalvote`)
        ifNotExistScoreBoard(`redleader`)
        ifNotExistScoreBoard(`blueleader`)
    }
    catch (error) {
        console.warn(`エラー内容:${error}, エラーのある場所:${error.stack}`)
    }
}


/**
 * タグ関係の処理
 * @argument {import("@minecraft/server").Player} player 対象のプレイヤー
 */

function playerTagSetting(player) {
    if (player.hasTag(`sanka`)) {
        player.removeTag(`sanka`)
    }

    if (player.hasTag(`leader`)) {
        player.removeTag(`leader`)
    }
}

/**
 * チーム分けする関数(赤と青)
 * @argument {import("@minecraft/server").Player[]} player 全てのプレイヤー(配列) 
 */

export function setTeam(player) {
    try {
        const playerElement = player.length
        const copyPlayers = [...player]
        let first = true
        removeTeamTagALL(player)
        for (let i = 0; i < playerElement; i ++) {
            const RandElement = Math.floor(Math.random() * player.length)
            const numberRandom = Math.floor(Math.random() * 10)
            const selectedPlayer = player[RandElement]
    
            if (first) {
                selectedPlayer.addTag(numberRandom < 4? `red` : `blue`)
                first = false
            } else if (searchRed(copyPlayers) == searchBlue(copyPlayers)) {
                selectedPlayer.addTag(numberRandom < 4? `red` : `blue`)
            } else {
                selectedPlayer.addTag(searchRed(copyPlayers) < searchBlue(copyPlayers)? `red` : `blue`)
            }
            setNameTagColor(selectedPlayer)
            const targetPlayerIndex = player.findIndex( element => element == selectedPlayer)
            player.splice(targetPlayerIndex, 1)

            for (const player of world.getPlayers()) {
                player.playSound(
                    `random.anvil_use`,
                    {
                        volume : 1,
                        pitch : 2
                    }
                )
            }
        }
    }
    catch (error) {
        console.warn(`エラー内容:${error}, エラーのある場所:${error.stack}`)
    }
}

/**
 * スコアボードに人数設定
 * @argument {import("@minecraft/server").Player[]} player 全てのプレイヤー(配列)
 */

export function setTeamNumber(player) {
    world.scoreboard.getObjective(`teamNumber`).setScore(`赤チーム`, searchRed(player))
    world.scoreboard.getObjective(`teamNumber`).setScore(`青チーム`, searchBlue(player))
}