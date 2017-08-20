// According to the instructions, the grid can be cleared of the 
// rover's final position after it is finished.

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
    return this.matrix = matrix
  }

  addRover(rover) {
    this.activeRovers.push(rover)
  }

  // Register a rover at a position on the plateau
  registerRover(rover) {
    let {x, y} = rover.coordinates;
    // de-active the rover is coordinates are out of range!
    if (x >= this.rows || y >= this.columns) {
      console.error("Invalid input, coodinates transcend generated matrix");
      return rover.isActive = false;
    }
    // place the rover in the matrix
    this.matrix[y][x] = rover;
    return rover.isActive = true;
  }
}

module.exports = Plateau