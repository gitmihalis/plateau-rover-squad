class Plateau {
  constructor(rows, columns) {
    this.matrix = null
    this.rows = rows
    this.columns = columns
    this.activeRovers = []
  }

  generate() {
    let matrix = []
    for(let i=0; i < this.columns; i++){
      matrix[i] = []
      for(let j=0; j < this.rows; j++ ){
        matrix[i][j] = 0
      }
    }
    this.matrix = matrix
    return this;
  }

  addRover(rover) {
    this.activeRovers.push(rover)
  }

  // Register a rover at a position on the plateau
  registerRover(rover) {
    let coords = rover.coordinates;
    // de-active the rover is coordinates are out of range!
    if (coords.x >= this.rows || coords.y >= this.columns) {
      console.error("Invalid input, coodinates transcend generated matrix");
      rover.isActive = false;
      return;
    }
    // place the rover in the matrix
    this.matrix[coords.y][coords.x] = rover;
    return rover.isActive = true;
  }
}

module.exports = Plateau