function RoverError(message) {
  this.name = "RoverMalfunction"
  this.message = (message || "Invalid instruction received! Connection terminated")
}
RoverError.prototype = Error.prototype

////////////////////////////////////////////////////////////////////////////////////////
// A rover is deployed onto a plateau after being initialized with start coordinates and 
// movement instructions. It will go offline if the move instructions take it off grid

class Rover {
  constructor(x=0, y=0, heading=0) {
    this.coordinates = {x, y}
    this.heading = this.cardinalToDegree(heading)
    this.instruction = ""
    this.isActive = false
  }

  ////////////////////////////////////////////////////////////////////////////////////
  // Converion helpers for cardianal points N W S E
  cardinalToDegree(heading) {
    if (typeof heading === "number") return heading
    if (heading === "N") return 0
    if (heading === "E") return 90
    if (heading === "S") return 180
    if (heading === "W") return 270
    throw new RoverError("covert cardinal to degree fail")
  }

  degreeToCardinal(heading) {
    if (typeof heading === "string") return heading
    if (heading === 0) return "N"
    if (heading === 90) return "E"
    if (heading === 180) return "S"
    if (heading === 270) return "W"
    throw new RoverError("could not convert degree to cardinal")
  }

  ///////////////////////////////////////////////////////////////////////////////////
  // A rover needs to rotate left/right 90 degrees give `L` or `R`
  rotate(direction) {

    if ( direction !== 'L' && direction !== 'R') throw { 
      error: 'rotate', 
      message: `${direction} is not a valid direction`
    }

    if (direction == "L") this.heading -= 90
    if (direction == "R") this.heading += 90
    if (this.heading < 0 ) this.heading += 360
    if (this.heading === 360) this.heading = 0 

    return this
  }

  ////////////////////////////////////////////////////////////////////////////////////
  // Advanced the rover one space in a grid
  move(){
    let prevPosition = this.coordinates
    let newPosition = prevPosition

    switch(this.heading) {
      case 0:
        newPosition.y += 1
        break
      case 90:
        newPosition.x += 1
        break
      case 180:
        newPosition.y -= 1
        break
      case 270:
        newPosition.x -= 1
        break
      default:
        throw new RoverError("Unrecognized movement!")
    }

    this.coordinates = newPosition;
  }

  ////////////////////////////////////////////////////////////////////////////////////
  deploy(plateau) {

    plateau.wipeRover(this)

    for (let char of this.instruction ) {
      if (char !== "M") {
        this.rotate(char)
      } else {
        this.move()
      }
    }

    plateau.registerRover(this)

    return this;
  }

  broadcastCoordinates() {
    if (this.isActive == false) return 'Rover status is offline'

    let broadcast = 
    `${this.coordinates.x} ${this.coordinates.y} ${this.degreeToCardinal(this.heading)}`

    return broadcast;
  }

}

module.exports = Rover