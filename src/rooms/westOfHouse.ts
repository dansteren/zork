import { smallMailbox } from '../containers'

export default {
  name: "West of House",
  description: "You are standing in an open field west of a white house, with a boarded front door.\nThere is a small mailbox here.",
  contains: [
    smallMailbox
  ],
  north: 'northOfHouse',
  northeast: 'northOfHouse',
  east: "The door is boarded and you can't remove the boards.",
  southeast: 'southOfHouse',
  south: 'southOfHouse',
  // southwest: undefined,
  // west: forest,
  // northwest: undefined,
  // up: undefined,
  // down: undefined
}
