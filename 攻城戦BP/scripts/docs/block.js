import { world, system } from "@minecraft/server"

/**
 * 特定の座標のブロックの座標を返します(y + 1)
 * 読み込みしないと使えないからtpかtick area必須
 * @argument {number} x x座標
 * @argument {number} z z座標
 * @returns {Promise}
 */

export function searchBlock(x,z) {
    try {
        return new Promise((resolve) => {
            const searchBlock = system.runInterval(() => {
                for (let i = 200; i > -64; i --) {
                    let Location = {
                        x : x,
                        y : i,
                        z : z
                    };
    
                    if (world.getDimension(`minecraft:overworld`).getBlock(Location) != undefined) {
                        if (world.getDimension(`minecraft:overworld`).getBlock(Location).typeId != "minecraft:air") {
                            system.clearRun(searchBlock)
                            Location = {
                                x : x,
                                y : i + 1,
                                z : z
                            }
                            resolve(Location)
                        }
                    }
                }
            }, 20)
        })
    }
    catch (error) {
        console.warn(`エラー内容:${error}, エラーのある場所:${error.stack}`)
    }
}