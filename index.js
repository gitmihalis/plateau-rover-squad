const _ = require('lodash/array');
////////////////////////////////////////////////////////////////////
//======= Rover Dispatcher ========//
// Receives instructions from a text file and moves rovers through a
// matrix , representing a plateau that is being scanned for lifeforms!

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

  // Chunk the instrucitions so that they can be sent to the rovers 
  // and executed on...
  let instructions = _.chunk(parsed, 2)

  for (let i = 0; i < instructions.length; i++) {
    // instructions[i] //=> [ [ '1', '2', 'N' ], [ 'LMLMLMLMM' ] ]
    // Initialize the rover with the start coordiantes and then
    let [x, y, heading] = instructions[i][0] 
    const rover = new Rover(parseInt(x), parseInt(y), heading)
    // send the movement instruction 
    rover.instruction = instructions[i][1].toString()

    rover.deploy(plateau)

    // For now, we can push the rover to the plateau once it's been deployed
    // We call on them outside the loop to broadcast their final coordinates in order
    plateau.activeRovers.push(rover)
  }

  // Now we display the final coordinates of each rover in the plateau
  plateau.activeRovers.forEach( r => console.log(r.broadcastCoordinates()))

  // Uncommonent below to view the rovers in the matrix

  // console.log(`
  // - - - - - - - - 
  // x = Rover
  // 0 = empty 
  // `)
  // Reverse the matrix so it can be displayed right side up, with x 1, x 1 @ bottom left corner
  // console.log(_.reverse(plateau.matrix))
}).catch( (error) => console.error(error))