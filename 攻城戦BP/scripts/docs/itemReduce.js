/**
 * メインハンドのアイテムを-1する   by runaa
 * @param {import("@minecraft/server").Player} player メインハンドのアイテムを-1するプレイヤー
 */

export function itemReduse(player) {
    const { container } = player.getComponent('inventory');
    const mainhand = container.getSlot(player.selectedSlotIndex);
    if (mainhand.amount > 1) {
        mainhand.amount -= 1;
    } else if (mainhand.amount === 1) {
        container.setItem(player.selectedSlotIndex, undefined);
    }
};