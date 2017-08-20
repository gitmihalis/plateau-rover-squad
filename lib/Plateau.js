// Will generate a 2D array given max rows and columns
// that rovers will move along
// But bottom left is mapped to the coordinates  x:0 ,y:0 !!!
// [[0,0,0],
//  [0,0,0],
//  [X,0,0]];
// matrix[matrix.length - 1][0] = 'X';

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
