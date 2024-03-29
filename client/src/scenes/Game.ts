import Phaser from "phaser";

// import { debugDraw } from '../utils/debug'
import { createCharacterAnims } from "../anims/CharacterAnims";

import Item from "../items/Item";
import Chair from "../items/Chair";
import Computer from "../items/Computer";
import Whiteboard from "../items/Whiteboard";
import VendingMachine from "../items/VendingMachine";
import "../characters/MyPlayer";
import "../characters/OtherPlayer";
import MyPlayer from "../characters/MyPlayer";
import OtherPlayer from "../characters/OtherPlayer";
import PlayerSelector from "../characters/PlayerSelector";
import Network from "../services/Network";
import { IPlayer } from "../../../types/IOfficeState";
import { PlayerBehavior } from "../../../types/PlayerBehavior";
import { ItemType } from "../../../types/Items";

import store from "../stores";
import { setFocused, setShowChat } from "../stores/ChatStore";
import TicTacToeBoard from "../items/TicTacToe";
import GatedSeats from "../items/GatedSeats";
import isHolder from "../smartContractInterface/fetchNFTState";
import NFTFrame from "../items/NFTFrames";

export default class Game extends Phaser.Scene {
  network!: Network;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keyE!: Phaser.Input.Keyboard.Key;
  private keyR!: Phaser.Input.Keyboard.Key;
  private map!: Phaser.Tilemaps.Tilemap;
  myPlayer!: MyPlayer;
  private playerSelector!: Phaser.GameObjects.Zone;
  private otherPlayers!: Phaser.Physics.Arcade.Group;
  private otherPlayerMap = new Map<string, OtherPlayer>();
  computerMap = new Map<string, Computer>();
  private whiteboardMap = new Map<string, Whiteboard>();

  private collidableRestrictedEntry!: any;
  private groupRestrictedEntry!: any;
  private objectLayerRestrictedEntry!: any;
  private RestrictedEntryColliderExists!: boolean;
  private ownsNFTs!: boolean;

  constructor() {
    super("game");
  }

  registerKeys() {
    this.cursors = this.input.keyboard.createCursorKeys();
    // maybe we can have a dedicated method for adding keys if more keys are needed in the future
    this.keyE = this.input.keyboard.addKey("E");
    this.keyR = this.input.keyboard.addKey("R");
    this.input.keyboard.disableGlobalCapture();
    this.input.keyboard.on("keydown-ENTER", (event: KeyboardEvent) => {
      store.dispatch(setShowChat(true));
      store.dispatch(setFocused(true));
    });
    this.input.keyboard.on("keydown-ESC", (event: KeyboardEvent) => {
      store.dispatch(setShowChat(false));
    });
  }

  disableKeys() {
    this.input.keyboard.enabled = false;
  }

  enableKeys() {
    this.input.keyboard.enabled = true;
  }

  create(data: { network: Network }) {
    if (!data.network) {
      throw new Error("server instance missing");
    } else {
      this.network = data.network;
    }
    const walletAddress = store.getState().user.walletAddress;

    createCharacterAnims(this.anims);

    this.map = this.make.tilemap({ key: "tilemap" });
    const FloorAndGround = this.map.addTilesetImage(
      "FloorAndGround",
      "tiles_wall"
    );

    const groundLayer = this.map.createLayer("Ground", FloorAndGround);
    groundLayer.setCollisionByProperty({ collides: true });

    // debugDraw(groundLayer, this)

    this.myPlayer = this.add.myPlayer(
      705,
      500,
      "adam",
      this.network.mySessionId
    );
    this.playerSelector = new PlayerSelector(this, 0, 0, 16, 16);

    // import chair objects from Tiled map to Phaser
    const chairs = this.physics.add.staticGroup({ classType: Chair });
    const chairLayer = this.map.getObjectLayer("Chair");
    chairLayer.objects.forEach((chairObj) => {
      const item = this.addObjectFromTiled(
        chairs,
        chairObj,
        "chairs",
        "chair"
      ) as Chair;
      // custom properties[0] is the object direction specified in Tiled
      item.itemDirection = chairObj.properties[0].value;
      // console.log(chairObj);
    });

    // import computers objects from Tiled map to Phaser
    const computers = this.physics.add.staticGroup({ classType: Computer });
    const computerLayer = this.map.getObjectLayer("Computer");
    computerLayer.objects.forEach((obj, i) => {
      const item = this.addObjectFromTiled(
        computers,
        obj,
        "computers",
        "computer"
      ) as Computer;
      item.setDepth(item.y + item.height * 0.27);
      const id = `${i}`;
      item.id = id;
      this.computerMap.set(id, item);
    });

    // import whiteboards objects from Tiled map to Phaser
    const whiteboards = this.physics.add.staticGroup({ classType: Whiteboard });
    const whiteboardLayer = this.map.getObjectLayer("Whiteboard");
    whiteboardLayer.objects.forEach((obj, i) => {
      const item = this.addObjectFromTiled(
        whiteboards,
        obj,
        "whiteboards",
        "whiteboard"
      ) as Whiteboard;
      const id = `${i}`;
      item.id = id;
      this.whiteboardMap.set(id, item);
    });

    // import vending machine objects from Tiled map to Phaser
    const vendingMachines = this.physics.add.staticGroup({
      classType: VendingMachine,
    });
    const vendingMachineLayer = this.map.getObjectLayer("VendingMachine");
    vendingMachineLayer.objects.forEach((obj, i) => {
      this.addObjectFromTiled(
        vendingMachines,
        obj,
        "vendingmachines",
        "vendingmachine"
      );
    });

    // importing ludo to tiled
    // this.addGroupFromTiled("Ludo", "ludo16x16", "ludo16x16", false);
    const ludoBoards = this.physics.add.staticGroup({
      classType: TicTacToeBoard,
    });
    const ludoBoardLayer = this.map.getObjectLayer("Ludo");
    ludoBoardLayer.objects.forEach((obj, i) => {
      const item = this.addObjectFromTiled(
        ludoBoards,
        obj,
        "ludo16x16",
        "ludo16x16"
      ) as TicTacToeBoard;
      const id = `${i}`;
      item.id = id;
      // this.whiteboardMap.set(id, item);
    });

    // this.map.removeLayer

    // importing the gated seats
    const gatedSeats = this.physics.add.staticGroup({
      classType: GatedSeats,
    });
    const gatedSeatsLayer = this.map.getObjectLayer("GatedSeats");
    gatedSeatsLayer.objects.forEach((obj, i) => {
      const item = this.addObjectFromTiled(
        gatedSeats,
        obj,
        "chairs",
        "chair"
      ) as GatedSeats;
      item.itemDirection = "right";
      const id = `${i}`;
      item.id = id;
    });

    // import NFT frames
    const nftFrames = this.physics.add.staticGroup({
      classType: NFTFrame,
    });
    const nftFramesLayer = this.map.getObjectLayer("NFTFrames");
    nftFramesLayer.objects.forEach((obj, i) => {
      const item = this.addObjectFromTiled(
        nftFrames,
        obj,
        "generic",
        "Generic"
      );
    });

    // import other objects from Tiled map to Phaser
    this.addGroupFromTiled("Wall", "tiles_wall", "FloorAndGround", false);
    this.addGroupFromTiled(
      "Objects",
      "office",
      "Modern_Office_Black_Shadow",
      false
    );

    // this.addGroupFromTiled("NFTs", "generic", "Generic", false);
    this.addGroupFromTiled(
      "ObjectsOnCollide",
      "office",
      "Modern_Office_Black_Shadow",
      true
    );
    this.addGroupFromTiled("GenericObjects", "generic", "Generic", false);
    this.addGroupFromTiled(
      "GenericObjectsOnCollide",
      "generic",
      "Generic",
      true
    );

    // Restricting block for NFT owners and not
    this.addGroupFromTiled(
      "RestrictEntryBlock",
      "tiles_wall",
      "FloorAndGround",
      true
    );
    this.RestrictedEntryColliderExists = true;

    this.addGroupFromTiled("Basement", "basement", "Basement", true);

    this.otherPlayers = this.physics.add.group({ classType: OtherPlayer });

    this.cameras.main.zoom = 1.5;
    this.cameras.main.startFollow(this.myPlayer, true);

    this.physics.add.collider(
      [this.myPlayer, this.myPlayer.playerContainer],
      groundLayer
    );
    this.physics.add.collider(
      [this.myPlayer, this.myPlayer.playerContainer],
      vendingMachines
    );

    this.physics.add.overlap(
      this.playerSelector,
      [
        chairs,
        computers,
        whiteboards,
        vendingMachines,
        ludoBoards,
        gatedSeats,
        nftFrames,
      ],
      this.handleItemSelectorOverlap,
      undefined,
      this
    );

    this.physics.add.overlap(
      this.myPlayer,
      this.otherPlayers,
      this.handlePlayersOverlap,
      undefined,
      this
    );

    // register network event listeners
    this.network.onPlayerJoined(this.handlePlayerJoined, this);
    this.network.onPlayerLeft(this.handlePlayerLeft, this);
    this.network.onMyPlayerReady(this.handleMyPlayerReady, this);
    this.network.onMyPlayerVideoConnected(this.handleMyVideoConnected, this);
    this.network.onPlayerUpdated(this.handlePlayerUpdated, this);
    this.network.onItemUserAdded(this.handleItemUserAdded, this);
    this.network.onItemUserRemoved(this.handleItemUserRemoved, this);
    this.network.onChatMessageAdded(this.handleChatMessageAdded, this);
  }

  private handleItemSelectorOverlap(playerSelector: any, selectionItem: any) {
    const currentItem = playerSelector.selectedItem as Item;
    // currentItem is undefined if nothing was perviously selected
    if (currentItem) {
      // if the selection has not changed, do nothing
      if (
        currentItem === selectionItem ||
        currentItem.depth >= selectionItem.depth
      ) {
        return;
      }
      // if selection changes, clear pervious dialog
      if (this.myPlayer.playerBehavior !== PlayerBehavior.SITTING)
        currentItem.clearDialogBox();
    }

    // set selected item and set up new dialog
    playerSelector.selectedItem = selectionItem;
    selectionItem.onOverlapDialog();
  }

  private addObjectFromTiled(
    group: Phaser.Physics.Arcade.StaticGroup,
    object: Phaser.Types.Tilemaps.TiledObject,
    key: string,
    tilesetName: string
  ) {
    const actualX = object.x! + object.width! * 0.5;
    const actualY = object.y! - object.height! * 0.5;
    const obj = group
      .get(
        actualX,
        actualY,
        key,
        object.gid! - this.map.getTileset(tilesetName).firstgid
      )
      .setDepth(actualY);
    return obj;
  }

  private addGroupFromTiled(
    objectLayerName: string,
    key: string,
    tilesetName: string,
    collidable: boolean
  ) {
    const group = this.physics.add.staticGroup();
    const objectLayer = this.map.getObjectLayer(objectLayerName);
    objectLayer.objects.forEach((object) => {
      const actualX = object.x! + object.width! * 0.5;
      const actualY = object.y! - object.height! * 0.5;
      group
        .get(
          actualX,
          actualY,
          key,
          object.gid! - this.map.getTileset(tilesetName).firstgid
        )
        .setDepth(actualY);
      if (objectLayerName === "RestrictEntryBlock") {
        console.log("yo");
        this.groupRestrictedEntry = group;
      }
    });

    if (this.myPlayer && collidable) {
      const collider = this.physics.add.collider(
        [this.myPlayer, this.myPlayer.playerContainer],
        group
      );
      if (objectLayerName === "RestrictEntryBlock") {
        this.collidableRestrictedEntry = collider;
        this.RestrictedEntryColliderExists = true;
      }
    }
  }

  // function to add new player to the otherPlayer group
  private handlePlayerJoined(newPlayer: IPlayer, id: string) {
    const otherPlayer = this.add.otherPlayer(
      newPlayer.x,
      newPlayer.y,
      "adam",
      id,
      newPlayer.name
    );
    this.otherPlayers.add(otherPlayer);
    this.otherPlayerMap.set(id, otherPlayer);
  }

  // function to remove the player who left from the otherPlayer group
  private handlePlayerLeft(id: string) {
    if (this.otherPlayerMap.has(id)) {
      const otherPlayer = this.otherPlayerMap.get(id);
      if (!otherPlayer) return;
      this.otherPlayers.remove(otherPlayer, true, true);
      this.otherPlayerMap.delete(id);
    }
  }

  private handleMyPlayerReady() {
    this.myPlayer.readyToConnect = true;
  }

  private handleMyVideoConnected() {
    this.myPlayer.videoConnected = true;
  }

  // function to update target position upon receiving player updates
  private handlePlayerUpdated(
    field: string,
    value: number | string,
    id: string
  ) {
    const otherPlayer = this.otherPlayerMap.get(id);
    otherPlayer?.updateOtherPlayer(field, value);
  }

  private handlePlayersOverlap(myPlayer: any, otherPlayer: any) {
    otherPlayer.makeCall(myPlayer, this.network?.webRTC);
  }

  private handleItemUserAdded(
    playerId: string,
    itemId: string,
    itemType: ItemType
  ) {
    if (itemType === ItemType.COMPUTER) {
      const computer = this.computerMap.get(itemId);
      computer?.addCurrentUser(playerId);
    } else if (itemType === ItemType.WHITEBOARD) {
      const whiteboard = this.whiteboardMap.get(itemId);
      whiteboard?.addCurrentUser(playerId);
    }
  }

  private handleItemUserRemoved(
    playerId: string,
    itemId: string,
    itemType: ItemType
  ) {
    if (itemType === ItemType.COMPUTER) {
      const computer = this.computerMap.get(itemId);
      computer?.removeCurrentUser(playerId);
    } else if (itemType === ItemType.WHITEBOARD) {
      const whiteboard = this.whiteboardMap.get(itemId);
      whiteboard?.removeCurrentUser(playerId);
    }
  }

  private handleChatMessageAdded(playerId: string, content: string) {
    const otherPlayer = this.otherPlayerMap.get(playerId);
    otherPlayer?.updateDialogBubble(content);
  }

  private removeEntryBlock(objectLayerName: string) {
    this.physics.world.removeCollider(this.collidableRestrictedEntry);
    this.groupRestrictedEntry.setActive(false).setVisible(false);
    this.RestrictedEntryColliderExists = false;
  }

  private addEntryBlock(objectLayerName: string) {
    this.groupRestrictedEntry.setActive(true).setVisible(true);

    if (!this.RestrictedEntryColliderExists) {
      this.addGroupFromTiled(
        "RestrictEntryBlock",
        "tiles_wall",
        "FloorAndGround",
        true
      );
    }
    this.RestrictedEntryColliderExists = true;
  }

  update(t: number, dt: number) {
    // const walletAddress = useAppSelector((state) => state.user.walletAddress);
    const walletAddress = store.getState().user.walletAddress;
    if (this.myPlayer && this.network) {
      this.playerSelector.update(this.myPlayer, this.cursors);
      this.myPlayer.update(
        this.playerSelector,
        this.cursors,
        this.keyE,
        this.keyR,
        this.network
      );
    }
    const hasNFT = store.getState().user.ownsNFT;
    if (walletAddress && hasNFT) {
      this.removeEntryBlock("RestrictEntryBlock");
    }
    if (!hasNFT) {
      this.addEntryBlock("RestrictEntryBlock");
    }

    // if (!walletAddress) {
    //   this.addEntryBlock("RestrictEntryBlock");
    // }
  }
}
