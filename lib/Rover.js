function RoverError(message) {
  this.name = "RoverMalfunction";
  this.message = (message || "Invalid instruction received! Connection terminated");
}
RoverError.prototype = Error.prototype;

class Rover {
  constructor() {
    this.coordinates = {x: null, y: null}
    this.heading = 0
  }

  // A rover needs to rotate left/right 90 degrees give `L` or `R`
  rotate(direction) {
    let heading = this.heading;
    if (direction == "L") heading -= 90;
    if (direction == "R") heading += 90;
    if ( this.heading < 0) {
      this.heading += 360
    }
    return this
  }

  move(heading){
    let prevPosition = this.coordinates
    let nextPosition = prevPosition

    switch(heading) {
      case "N":
        nextPosition.y += 1
        break
      case "E":
        nextPosition.x += 1
        break
      case "S":
        nextPosition.y -= 1
        break
      case "W":
        nextPosition.x -= 1
        break
      default:
        throw new RoverError()
    }

    this.coordinates = nextPosition;
  }



}

module.exports = Rover