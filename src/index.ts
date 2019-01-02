import { Game } from './core'
import * as rooms from './rooms'

const name: string = 'ZORK I: The Great Underground Empire'
const description: string = `Copyright (c) 1981, 1982, 1983 Infocom, Inc. All rights reserved.
Licensed to Tandy Corporation.
ZORK is a registered trademark of Infocom, Inc.
Revision 88 / Serial number 840726`

const game: Game = new Game({
  name,
  description,
  rooms,
  startingRoom: rooms.westOfHouse
});

// game.world = new World([...rooms])
// game.world.startingRoom = rooms.westOfHouse
// game.player = new Player()

game.start()


// // Allow player to create shortcuts to certain locations.
// // e.g. the player wants to go to the dam from the house. At the house they type:
// // >do goToDam
// // which does n,n,e,e,n... or something like that.
