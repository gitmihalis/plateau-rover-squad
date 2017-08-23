// Will generate a 2D array given max rows and columns
// that rovers will move along
// But bottom left is mapped to the coordinates  x:0 ,y:0 !!!
// matrix[0][0] = 'X';
// [[X,0,0], [0,0,0], [0,0,0]];


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

  // Place  a rover at on the Plateau's 2D array 
  registerRover(rover) {
    let {x, y} = rover.coordinates
    x -= 1
    y -= 1

    // de-active the rover if coordinates are out of range!
    if (!!this.matrix[y]  || !!this.matrix[y][x] ) {
      this.matrix[y][x] = "x; // Temporarily change to "X" from an instance of rover for display purposes
      rover.isActive = true
    } else {
      rover.isActive = false
      console.log("Error: receiver instructions outside of plateau matrix")
      return
    }
    // this.wipeRover(rover)

  }

  wipeRover(rover) {
    let {x, y} = rover.coordinates
    x -= 1
    y -= 1
    this.matrix[y][x] = 0
  }
}

module.exports = Plateau
