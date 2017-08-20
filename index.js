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
  // 1st line is the maximum row and column size for the plateau seperated by spaces
  // 5 5 
  // ----------------------------
  // 2nd line is start coords for a new rover X Y + its beaing
  // 1 2 N
  // 3rd line are commands for this rover
  // LMLMLMMMR
  // 4th line is start coords for a new rover
  // 5th line are commands for this rover

  console.log(`Line from file: ${line}`)
})