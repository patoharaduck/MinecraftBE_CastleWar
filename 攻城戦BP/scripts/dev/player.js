import * as GameTest from "@minecraft/server-gametest"
import { world, system } from "@minecraft/server";
import "./GameTest.js";

var min = -1 ;
var max = 1 ;

GameTest.register("mint1", "mint_test", (test) => {
    var abon = test.spawnSimulatedPlayer({ x: 0, y: 2, z: 0 }, `つんくのちんげ`);

    const abonTime = system.runInterval(eventData => {
        let num = Math.floor( Math.random() * (max + 1 - min) ) + min ;
            let num2 = Math.floor( Math.random() * (max + 1 - min) ) + min ;

            if (abon.isValid() == false) {
                system.clearRun(abonTime)
            }

            abon.move(num, num2, 1)
        }, 2)
    })
.maxTicks(3600 * 20)