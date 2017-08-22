////////////////////////////////////////////////////////////////////
// Rover Dispatcher ... 
// Receives instructions from a text file and moves rovers through a
// matrix , representing a plateau that is being scanned for lifeforms!
//
// TODO
// [ ] initiate a rover with an instruction
// [ ] Create a helper to alternate between generating a rover and moving that rover

// new Plateau takes ( rows, columns ) as args 
const Plateau = require('./lib/Plateau')

// new Rover takes (x, y) as args
const Rover = require('./lib/Rover')

// Establish instructions from text file
const fs = require('fs')
const readline = require('readline')
const file = process.argv[2]

// Create a readable stream of our input file
const rl = readline.createInterface({
  input: fs.createReadStream(file)
})


////////////////////////////////////////////////////////
// Parse the sets of commands from our readable Stream
//
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


////////////////////////////////////////////////////////////////////////////
// Crete the plateau and dispatch the rovers AFTER we get our instructions
//
parseInstructions.then( (parsed) => {
  // que up the rovers and their instructions
  const que = []

  const plateauParams = parsed.splice(0,1)[0]
    .map( param => parseInt(param))
  //////////////////////////////////////////////////////
  // initialize the plateau and generate the matrix
  //
  const plateau = new Plateau(plateauParams[1], plateauParams[0]).generate()

  for ( let instruction of parsed ) {
    que.push(instruction)
  }

  console.log(que)

  





  // for (let i = 0; i < instructions.length; i++) {
  //   // starting coordinates are first set of an alterating instruction list `[3, 4, S]`
  //   if (i % 2 === 0) {
  //     let [x, y, heading] = instructions[i]
  //     // initialize and add to the plateau
  //     plateau.addRover(new Rover(x, y, heading))

  //   } else {
  //     let instruction = instructions[i].toString()

  //   }
  // }
  
})
.catch( (error) => console.error(error))