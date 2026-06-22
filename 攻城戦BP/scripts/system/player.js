import { system, world } from "@minecraft/server";
import { addScore } from "../docs/scoreBoard";
import { setNameTagColor } from "../docs/team";

world.afterEvents.entityDie.subscribe(eventData => {
    const { deadEntity, damageSource } = eventData

    if (deadEntity.typeId == "minecraft:player") {
        if (deadEntity.hasTag(`leader`)) {
            deadEntity.addTag(`death`)
        }
    
        if (deadEntity.hasTag(`started`)) {
            deadEntity.setGameMode(`spectator`)
        }

        addScore(deadEntity, `death`, 1)
        if (damageSource.damagingEntity != undefined) {
            if (damageSource.damagingEntity.typeId == "minecraft:player") {
                addScore(damageSource.damagingEntity, `kill`, 1)
            }
        }
    }
})

world.afterEvents.playerSpawn.subscribe(eventData => {
    const { initialSpawn, player} = eventData

    if (initialSpawn) {
        addScore(player, `death`, 0)
        addScore(player, `kill`, 0)
        addScore(player, `play`, 0)
    }
})

system.runInterval(() => {
    for (const player of world.getPlayers()) {
        setNameTagColor(player)
    }
}, 20)