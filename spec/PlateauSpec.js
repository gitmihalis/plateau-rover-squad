describe("Plateau", function() {
  var Plateau = require('../lib/Plateau');
  var Rover = require('../lib/Rover');
  var plateau;
  var rover;

  beforeEach(function() {
    // ...
  });

  it("should generate a 2D array with 5 columns and 5 rows", function() {
    plateau = new Plateau(5, 5).generate();
    expect(plateau.matrix[4][4]).toEqual(0);
    expect(plateau.matrix[5]).toBeUndefined();
  });

  it("can add a Rover to the matrix", function() {
    plateau = new Plateau(3, 3).generate();
    rover = new Rover();
    plateau.addRover(rover)
    plateau.addRover(rover)
    expect(plateau.activeRovers).toEqual([rover, rover]);
  }) 
});
