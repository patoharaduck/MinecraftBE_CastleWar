import { system } from "@minecraft/server";

system.afterEvents.scriptEventReceive.subscribe(ev=>{
    const { id , message , sourceEntity } = ev;
    if( id.startsWith("player:name")){
        sourceEntity.nameTag = message
    }
})