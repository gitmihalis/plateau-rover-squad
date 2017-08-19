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
  registerRover(rover, position) {
    
  }
}

module.exports = Plateau