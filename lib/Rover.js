function RoverError(message) {
  this.name = "RoverMalfunction";
  this.message = (message || "Invalid instruction received! Connection terminated");
}
RoverError.prototype = Error.prototype;


class Rover {
  constructor(x=0, y=0, heading=0) {
    this.coordinates = {x, y}
    this.heading = heading
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



}

module.exports = Rover