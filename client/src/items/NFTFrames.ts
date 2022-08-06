import { ItemType } from "../../../types/Items";
import store from "../stores";
import { openNFTFrameDialog } from "../stores/NFTFrames";
import Item from "./Item";

export default class NFTFrame extends Item {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);

    this.itemType = ItemType.NFTFRAMES;
  }

  onOverlapDialog() {
    this.setDialogBox("Press R to view NFTs");
  }

  openDialog() {
    // dispatch NFTFrames dialog to be tre
    store.dispatch(openNFTFrameDialog());
  }
}
