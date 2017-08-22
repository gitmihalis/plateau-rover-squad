// TODO [] fix X and Y rover.coordinates dont represent plateau coordiantes starting
//         from 0, 0

function RoverError(message) {
  this.name = "RoverMalfunction"
  this.message = (message || "Invalid instruction received! Connection terminated")
}
RoverError.prototype = Error.prototype


class Rover {
  constructor(x=0, y=0, heading=0) {
    this.coordinates = {x, y}
    this.heading = this.cardinalToDegree(heading)
    this.instruction = ""
  }

  ////////////////////////////////////////////////////////////////////////////////////
  cardinalToDegree(heading) {
    if (heading === "N") return 0
    if (heading === "E") return 90
    if (heading === "S") return 180
    if (heading === "W") return 270
    throw { error: "Rover", message: "Could not convert cardinal heading to degree "}
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
        throw new RoverError()
    }

    this.coordinates = newPosition;
  }

  ////////////////////////////////////////////////////////////////////////////////////
  deploy() {
    for (let char of this.instruction ) {
      if (char !== "M") {
        this.rotate(char)
      } else {
        this.move()
      }
    }
  }



}

module.exports = Rover