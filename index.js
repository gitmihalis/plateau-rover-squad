const Plateau = require('./lib/Plateau')
const Rover = require('./lib/Rover')

// Supply input data to your rovers via a text file specified in the command line.
const fs = require('fs')
const readline = require('readline')
const file = process.argv[2]

const rl = readline.createInterface({
  input: fs.createReadStream(file)
})

// Parse the list of commands
const parseInstructions = new Promise( (resolve, reject) => {
  let parsed = []
  rl.on('line', (line) => parsed.push(line))
  rl.on('close', () => {
    parsed = parsed.map( (x) => {
      return x.split(/\s+/)
    })
    resolve(parsed)
  })
})

// Run the app after we get our instructions
parseInstructions.then( (lines) => {
  
  console.log(lines)
})
.catch( (error) => console.error(error))