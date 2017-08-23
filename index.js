const _array = require('lodash/array');
////////////////////////////////////////////////////////////////////
// Rover Dispatcher ... 
// Receives instructions from a text file and moves rovers through a
// matrix , representing a plateau that is being scanned for lifeforms!
//
// TODO
// [x] initiate a rover with an instruction

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

  // Remove and apply the first instruction for the Plateau
  const plateauParams = parsed.splice(0,1)[0]
    .map( param => parseInt(param))

  //////////////////////////////////////////////////////
  // initialize the plateau and generate the matrix
  const plateau = new Plateau(plateauParams[1], plateauParams[0]).generate()

  // chunk the instrucitions so that they can be delivered to the rovers 
  // and executed...
  let instructions = _array.chunk(parsed, 2)

  for (let i = 0; i < instructions.length; i++) {
    // instructions[i] //=> [ [ '1', '2', 'N' ], [ 'LMLMLMLMM' ] ]
    // Initialize the rover with the start coordiantes
    // Pass the movement instruction 

    let [x, y, heading] = instructions[i][0] 
    const rover = new Rover(parseInt(x), parseInt(y), heading)

    rover.instruction = instructions[i][1].toString()

    rover.deploy()

    // For now, we can push the rover to the plateau once it's been deployed
    plateau.activeRovers.push(rover)
  }

  // Now we display the final coordinates of each rover in the plateau
  plateau.activeRovers.forEach( r => console.log(r.broadcastCoordinates()))

})
.catch( (error) => console.error(error))