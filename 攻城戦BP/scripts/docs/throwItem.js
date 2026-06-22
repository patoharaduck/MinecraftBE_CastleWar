/**
 * アイテムを投げるプレイヤーの顔の座標を返します
 * @param {import("@minecraft/server").Player} player 対象のプレイヤー
 * @returns {import("@minecraft/server").Vector3 | null}
 */


export function getPlayerLocation(player) {
    const playerLocation = {
        x : player.location.x,
        y : player.location.y + 1.5,
        z : player.location.z
    };
    return playerLocation
}

/**
 * 投げるアイテムがx, z軸のみ(二次元)で運動するときのVectorを返します
 * @param {import("@minecraft/server").Player} player アイテムを投げるプレイヤー
 * @returns {import("@minecraft/server").Vector3 | null}
 */

export function getPlayerView2(player) {
    const playerView2 = {
        x : player.getViewDirection().x,
        y : 0,
        z : player.getViewDirection().z
    };
    return playerView2
};

/**
 * 投げるアイテムがx, y, z軸で運動するときのVectorを返します
 * @param {import("@minecraft/server").Player} player アイテムを投げるプレイヤー
 * @returns {import("@minecraft/server").Vector3 | null}
 */

export function getPlayerView3(player) {
    const playerView3 = {
        x : player.getViewDirection().x,
        y : player.getViewDirection().y,
        z : player.getViewDirection().z
    };
    return playerView3
};

/**
 * 投げたアイテム(エンティティ)の速度を返します
 * @param {import("@minecraft/server").Entity} entity 投げたアイテム(エンティティ)
 * @returns {import("@minecraft/server").Vector3 | null}
 */
export function getSpeed(entity) {
    const entitySpeed = {
        x : entity.getVelocity().x,
        y : entity.getVelocity().y,
        z : entity.getVelocity().z
    };
    return entitySpeed
}

/**
 * 投げたアイテム(エンティティ)がブロックにぶつかったかどうかを返します
 * @param {import("@minecraft/server").Entity} entity 投げたアイテム(エンティティ)
 * @returns {boolean}
 */
export function checkCrash(entity) {
    const entitySpeed = {
        x : entity.getVelocity().x,
        y : entity.getVelocity().y,
        z : entity.getVelocity().z
    };
    if (entitySpeed.x == 0 || entitySpeed.y == 0 || entitySpeed.z == 0) {
        return true
    } else {
        return false
    }
}

/**
 * 投げたアイテム(エンティティ)の隣のブロック(x, y, z方向)を返します
 * @param {import("@minecraft/server").Entity} entity 対象のエンティティ
 * @returns {import("@minecraft/server").Block | null}
 */

export function getNearBlock(entity) {
    if (entity.isValid() == false) return null
    let getNearBlock = {
        north : entity.dimension.getBlock({x: entity.location.x, y : entity.location.y, z : entity.location.z - 0.5}),
        south : entity.dimension.getBlock({x: entity.location.x, y : entity.location.y, z : entity.location.z + 0.5}),
        east : entity.dimension.getBlock({x: entity.location.x + 0.5, y : entity.location.y, z : entity.location.z}),
        west : entity.dimension.getBlock({x: entity.location.x - 0.5, y : entity.location.y, z : entity.location.z}),
        up : entity.dimension.getBlock({x: entity.location.x , y : entity.location.y + 0.5, z : entity.location.z}),
        down : entity.dimension.getBlock({x: entity.location.x, y : entity.location.y - 0.5, z : entity.location.z})
    };
    return getNearBlock
}

/**
 * 投げたアイテム(エンティティ)がブロックにぶつかったかどうかを返します(当たり判定がないエンティティ)
 * @param {import("@minecraft/server").Entity} entity 投げたアイテム(エンティティ)
 * @returns {boolean}
 */

export function NoCollisionCheckNearBlock(entity) {
    if (entity.isValid() == false) return null
    let getNearBlock = {
        center : entity.dimension.getBlock(entity.location).typeId,
        north : entity.dimension.getBlock({x: entity.location.x, y : entity.location.y, z : entity.location.z - 0.1}).typeId,
        south : entity.dimension.getBlock({x: entity.location.x, y : entity.location.y, z : entity.location.z + 0.1}).typeId,
        east : entity.dimension.getBlock({x: entity.location.x + 0.1, y : entity.location.y, z : entity.location.z}).typeId,
        west : entity.dimension.getBlock({x: entity.location.x - 0.1, y : entity.location.y, z : entity.location.z}).typeId,
        up : entity.dimension.getBlock({x: entity.location.x , y : entity.location.y + 0.1, z : entity.location.z}).typeId,
        down : entity.dimension.getBlock({x: entity.location.x, y : entity.location.y - 0.1, z : entity.location.z}).typeId
    }
    if (getNearBlock.center == "minecraft:air" && getNearBlock.north == "minecraft:air" && getNearBlock.south == "minecraft:air" && getNearBlock.east == "minecraft:air" && getNearBlock.west == "minecraft:air" && getNearBlock.up == "minecraft:air" && getNearBlock.down == "minecraft:air") {
        return false
    } else {
        return true
    }
}

/**
 * 投げたアイテム(エンティティ)がブロックにぶつかったかどうかを返します(当たり判定があるエンティティ)
 * @param {import("@minecraft/server").Entity} entity 投げたアイテム(エンティティ)
 * @returns {boolean}
 */

export function CollisionCheckNearBlock(entity) {
    if (entity.isValid() == false) return null
    let getNearBlock = {
        north : entity.dimension.getBlock({x: entity.location.x, y : entity.location.y, z : entity.location.z - 0.5}).typeId,
        south : entity.dimension.getBlock({x: entity.location.x, y : entity.location.y, z : entity.location.z + 0.5}).typeId,
        east : entity.dimension.getBlock({x: entity.location.x + 0.5, y : entity.location.y, z : entity.location.z}).typeId,
        west : entity.dimension.getBlock({x: entity.location.x - 0.5, y : entity.location.y, z : entity.location.z}).typeId,
        up : entity.dimension.getBlock({x: entity.location.x , y : entity.location.y + 0.5, z : entity.location.z}).typeId,
        down : entity.dimension.getBlock({x: entity.location.x, y : entity.location.y - 0.5, z : entity.location.z}).typeId
    }
    if (getNearBlock.north == "minecraft:air" && getNearBlock.south == "minecraft:air" && getNearBlock.east == "minecraft:air" && getNearBlock.west == "minecraft:air" && getNearBlock.up == "minecraft:air" && getNearBlock.down == "minecraft:air") {
        return false
    } else {
        return true
    }
}

/**
 * 投げたアイテムの方向をプレイヤーの向いている方向に合わせます
 * @param {import("@minecraft/server").Player} player アイテムを投げるプレイヤー
 * @param {import("@minecraft/server").Entity} entity 投げるアイテム(エンティティ)
 */
export function setThrownItemRotation(player, entity) {
    entity.setRotation(player.getRotation())
}