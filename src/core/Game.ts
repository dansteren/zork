import * as readline from 'readline'

export interface GameOptions {
  name: string
  description: string
  prompt?: string
  rooms?: RoomCollection
  startingRoom: Room
}

export enum Direction {
  NORTH = 'NORTH',
  NORTHEAST = 'NORTHEAST',
  EAST = 'EAST',
  SOUTHEAST = 'SOUTHEAST',
  SOUTH = 'SOUTH',
  SOUTHWEST = 'SOUTHWEST',
  WEST = 'WEST',
  NORTHWEST = 'NORTHWEST',
  UP = 'UP',
  DOWN = 'DOWN'
}

export interface Room {
  name: string
  description: string
}

export interface RoomCollection {
  [key: string]: Room
}

export default class Game {
  private name: string
  private description: string
  private prompt: string
  private location: Room
  private rooms: RoomCollection
  private terminal: readline.Interface

  constructor({name, description, rooms, startingRoom, prompt}: GameOptions) {
    this.name = name
    this.description = description
    this.rooms = rooms
    this.location = startingRoom
    this.prompt = prompt || '> '
    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
  }

  start() {
    console.log(this.name)
    console.log(this.description + '\n')
    this.describeRoom()
    this.promptForInput()
  }

  describeRoom() {
    console.log(this.location.name)
    console.log(this.location.description)
  }

  promptForInput() {
    this.terminal.question(this.prompt, this.handleUserInput.bind(this))
  }

  handleUserInput(input: string) {
    if (!input) {
      console.log('I beg your pardon?')
      this.promptForInput()
      return
    }
    const [ rawAction, ...directObjectList] = input.split(' ')
    const action = rawAction.toLowerCase()
    const directObject = directObjectList.join(' ')

    switch (action) {
      case 'n':
      case 'north':
        this.navigate(Direction.NORTH)
        break
      case 'ne':
        this.navigate(Direction.NORTHEAST)
        break
      case 'e':
      case 'east':
        this.navigate(Direction.EAST)
        break
      case 'se':
        this.navigate(Direction.SOUTHEAST)
        break
      case 's':
      case 'south':
        this.navigate(Direction.SOUTH)
        break
      case 'sw':
        this.navigate(Direction.SOUTHWEST)
        break
      case 'w':
      case 'west':
        this.navigate(Direction.WEST)
        break
      case 'nw':
        this.navigate(Direction.NORTHWEST)
        break
      case 'u':
      case 'up':
        this.navigate(Direction.UP)
        break
      case 'd':
      case 'down':
        this.navigate(Direction.DOWN)
        break
      case 'l':
      case 'look':
        this.describeRoom()
        break
      case 'examine':
        if (!directObject) {
          console.log('What do you want to examine?')
          // TODO: if the user types examine without a direct object then let
          // them type the direct object directly without typing examine again
          break
        }
        console.log(`Unable to examine ${directObject} at this time`)
        break
      case 'exit':
      case 'q':
      case 'quit':
        // TODO: Properly calculate scores and rank, etc.
        console.log('Your score is 0 (total of 350 points), in 2 moves.')
        console.log('This gives you the rank of Beginner.')
        this.terminal.question(`Do you wish to leave the game? (Y is affirmative): ${this.prompt}`, this.handleExitConfirmationResponse.bind(this))
        break
      default:
        console.log(`I don't understand how to "${input}"`)
        break
    }
    this.promptForInput()
  }

  navigate(direction: Direction) {
    const newRoomName = this.location[direction.toLowerCase()]
    if (!newRoomName) {
      console.log(`You can't go that way.`)
      return
    }
    const newLocation = this.rooms[newRoomName]
    if (!newLocation) {
      console.log(newRoomName)
      // In this case, newRoomName is actually a string explaining why you can't
      // go the specified direction
      return
    }
    this.location = newLocation
    this.describeRoom()
  }

  handleExitConfirmationResponse(response: string) {
    if (response.toUpperCase() === 'Y') {
      console.log('See you soon!')
      this.terminal.close()
      process.exit()
    } else {
      console.log('OK')
      this.promptForInput()
    }
  }
}
