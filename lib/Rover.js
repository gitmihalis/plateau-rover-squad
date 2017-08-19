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

}

module.exports = Rover