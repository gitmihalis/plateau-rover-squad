function RoverError(message) {
  this.name = "RoverMalfunction";
  this.message = (message || "Invalid instruction received! Connection terminated");
}
RoverError.prototype = Error.prototype;


class Rover {
  constructor(x=0, y=0) {
    this.coordinates = {x, y}
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
    let newPosition = prevPosition

    switch(heading) {
      case "N":
        newPosition.y += 1
        break
      case "E":
        newPosition.x += 1
        break
      case "S":
        newPosition.y -= 1
        break
      case "W":
        newPosition.x -= 1
        break
      default:
        throw new RoverError()
    }

    this.coordinates = newPosition;
  }



}

module.exports = Rover