const Plateau = require('./lib/Plateau')
const Rover = require('./lib/Rover')

// Supply input data to your rovers via a text file specified in the command line.
const fs = require('fs')
const readline = require('readline')
const file = process.argv[2]

const rl = readline.createInterface({
  input: fs.createReadStream(file)
})

rl.on('line', (line) => {
  console.log(`Line from file: ${line}`)
})