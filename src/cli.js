#!/usr/bin/env node
var fs = require('fs')


const [,,...args] = process.argv

switch (args[0]) {
  case 'i':
  case 'init':
    console.log('creating IF structure... sike!')
    const roomsDir = './rooms';
    if (!fs.existsSync(roomsDir)){
      fs.mkdirSync(roomsDir);
    }
    const containersDir = './containers';
    if (!fs.existsSync(containersDir)){
      fs.mkdirSync(containersDir);
    }
    const itemsDir = './items';
    if (!fs.existsSync(itemsDir)){
      fs.mkdirSync(itemsDir);
    }
    break
  case 'c':
  case 'compile':
    console.log('Compiling your IF...')
    console.log('Unable to compile IF at this time')
    break
  case 'help':
    if (args[1]){
      switch (args[1]) {
        case 'init':
          console.log('Creates all the boilerplate necessary for making a new IF project.')
          break
        case 'compile':
          console.log('Takes your project and compiles it into a single ".js" executable.')
          break
        default:
          console.log(`Command ${args[1]} not recognized. Try help without a second argument.`)
          break
      }
      break
    }
  default:
    console.log('usage:');
    console.log('ife [command]\n')
    console.log('Commands:')
    console.log('  init - Creates a new IF project')
    console.log('  compile - Compiles your project into a node script')
    console.log('  help [command] - Prints out additional info')
}
