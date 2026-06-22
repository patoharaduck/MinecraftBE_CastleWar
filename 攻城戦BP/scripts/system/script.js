import { world, system, ItemStack } from "@minecraft/server"
import { buildCastle, setAttack, setTeam, setTeamNumber, start1, start2, voteTeam } from "./voteTeam"
import { setUp } from "./setup"
import { addScore, getScore } from "../docs/scoreBoard"

system.afterEvents.scriptEventReceive.subscribe(eventData => {
    const { id } = eventData

    if (id == "game:setup") {
        setUp()
    } else if (id == "game:set") {
        const allPlayer = world.getPlayers()
        setTeam(allPlayer)
        setTeamNumber(allPlayer)
    } else if (id == "game:start") {
        game()
    }
})

async function game() {
    score()
    clearTag1()
    clearTag2()
    clearAll()
    place()
    await voteTeam(30)
    await buildCastle(600)
    await setAttack()
    setItem()
    await start1(30, 5)
    clearTag2()
    clearAll()
    setItem()
    await start2(30, 5)
    end()
    clearAll()
}

function end() {
    world.sendMessage(`結果は...`)
    system.runTimeout(() => {
        if (getScore(`redtime`, `time`) > getScore(`bluetime`, `time`)) {
            for (const player of world.getPlayers()) {
                player.teleport({x : 0, y : -60, z : 31})
                player.onScreenDisplay.setTitle(`§c赤チーム§fの勝利`)
                player.playSound(
                    `block.bell.hit`
                )
                player.setGameMode(`adventure`)
                const inventory = player.getComponent(`minecraft:inventory`).container
                inventory.clearAll()
            }
        } else {
            for (const player of world.getPlayers()) {
                player.teleport({x : 0, y : -60, z : 31})
                player.onScreenDisplay.setTitle(`§b青チーム§fの勝利`)
                player.playSound(
                    `block.bell.hit`
                )
                player.setGameMode(`adventure`)
                const inventory = player.getComponent(`minecraft:inventory`).container
                inventory.clearAll()
            }
        }
    }, 30)
}

function clearAll() {
    for (const player of world.getPlayers()) {
        const inventory = player.getComponent(`minecraft:inventory`).container
        const equ = player.getComponent(`minecraft:equippable`)
        equ.setEquipment(`Head`, undefined)
        equ.setEquipment(`Chest`, undefined)
        inventory.clearAll()
    }
}

function setItem() {
            const location = {
                x : 0,
                y : -60,
                z : 0
            }
            const blockInventory = world.getDimension(`minecraft:overworld`).getBlock(location).getComponent(`inventory`).container
    
            const Rlocation = {
                x : -2,
                y : -60,
                z : 0
            }
            const RblockInventory = world.getDimension(`minecraft:overworld`).getBlock(Rlocation).getComponent(`inventory`).container
    
            const bItem = {
                helmet : blockInventory.getItem(0),
                chestplate : blockInventory.getItem(1),
                sword : blockInventory.getItem(2),
                bow : blockInventory.getItem(3),
                arrow : blockInventory.getItem(4)
            }
            
            const rItem = {
                helmet : RblockInventory.getItem(0),
                chestplate : RblockInventory.getItem(1),
                sword : RblockInventory.getItem(2),
                bow : RblockInventory.getItem(3),
                arrow : RblockInventory.getItem(4)
            }

            for (const player of world.getPlayers()) {
                if (player.hasTag(`red`)) {
                    const inventory = player.getComponent(`minecraft:inventory`).container
                    const equ = player.getComponent(`minecraft:equippable`)
            
                    equ.setEquipment(`Head`, rItem.helmet)
                    equ.setEquipment(`Chest`, rItem.chestplate)
            
                    inventory.setItem(0, rItem.sword)
                    inventory.setItem(1, rItem.bow)
                    inventory.setItem(2, rItem.arrow)
                    inventory.setItem(3, new ItemStack(`minecraft:cooked_beef`, 64)) 
                } else if (player.hasTag(`blue`)) {
                    const inventory = player.getComponent(`minecraft:inventory`).container
                    const equ = player.getComponent(`minecraft:equippable`)
            
                    equ.setEquipment(`Head`, bItem.helmet)
                    equ.setEquipment(`Chest`, bItem.chestplate)
            
                    inventory.setItem(0, bItem.sword)
                    inventory.setItem(1, bItem.bow)
                    inventory.setItem(2, bItem.arrow)
                    inventory.setItem(3, new ItemStack(`minecraft:cooked_beef`, 64)) 
                }
            }
}

function clearTag1() {
    for (const player of world.getPlayers()) {
        if (player.hasTag(`leader`)) {
            player.removeTag(`leader`)
        }
        if (player.hasTag(`started`)) {
            player.removeTag(`started`)
        }
        if (player.hasTag(`attack`)) {
            player.removeTag(`attack`)
        }
        if (player.hasTag(`def`)) {
            player.removeTag(`def`)
        }
    }
}

function clearTag2() {
    for (const player of world.getPlayers()) {
        if (player.hasTag(`death`)) {
            player.removeTag(`death`)
        }
        if (player.hasTag(`started`)) {
            player.removeTag(`started`)
        }
    }
}

function place() {
    world.structureManager.place(
        `def`,
        world.getDimension(`overworld`),
        {
            x : -54,
            y : -64,
            z : 16
        }
    )
    world.structureManager.place(
        `def`,
        world.getDimension(`overworld`),
        {
            x : 5,
            y : -64,
            z : 16
        }
    )
}

function score() {
    for (const player of world.getPlayers()) {
        addScore(player, `play`, 1)
    }
}