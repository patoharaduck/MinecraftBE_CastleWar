import { system, world } from "@minecraft/server";
import { uiManager } from "@minecraft/server-ui";
import { getScore } from "../docs/scoreBoard";
import { setRound } from "../docs/math";

const prefix = ".";

world.beforeEvents.chatSend.subscribe(eventData => {
    const { sender, message } = eventData

    eventData.cancel = true
    if (message.charAt(0) != prefix) {
        world.sendMessage(`${sender.nameTag}§a: §r${message}`)
    } else {
        const command = message.replace(`.`, ``);

        if (command == "help") {
            sender.sendMessage([
                `§2===コマンド一覧===`,
                `\n`,
                `\n§2.help -- このワールドで使えるコマンドを表示します`,
                `\n§2.status -- プレイヤーの情報を表示します`,
                `\n§2.sui -- 自害します`
            ])
        } else if (command == `status`) {
            const kill = getScore(sender, `kill`)
            const death = getScore(sender, `death`)
            const play = getScore(sender, `play`)
            const kd = setRound(kill / death, 3)

            sender.sendMessage([
                `§f===${sender.name}の情報===`,
                `\n§dプレイ回数 §6: §a${play}`
            ])
        } else if (command == "sui") {
            system.run(() => {
                sender.kill()
                sender.sendMessage(`§3自害しました`)
            })
        } else {
            sender.sendMessage([
                `§c>>${command}<< は無効なコマンドです!`,
                `\n§c.helpで使用可能なコマンドを確認してください!`
            ])
        }
    }
})