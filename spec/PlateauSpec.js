describe("Plateau", function() {
  var Plateau = require('../lib/Plateau');
  var Rover = require('../lib/Rover');
  var plateau;
  var rover;

  beforeEach(function() {
    plateau = new Plateau(5, 5).generate();
  });

  it("should generate a 2D array with 5 columns and 5 rows", function() {
    expect(plateau.matrix[4][4]).toEqual(0);
    expect(plateau.matrix[5]).toBeUndefined();
  });

  it("should add a Rover to a list of activeRovers", function() {
    rover = new Rover();
    plateau.addRover(rover)
    plateau.addRover(rover)
    expect(plateau.activeRovers).toEqual([rover, rover]);
  })

  it("should register a rover on the matrix according to it's coordinates", function() {
    rover = new Rover();
    rover.coordinates = {x: 1, y: 2};
    rover.heading = "N";
    plateau.registerRover(rover);
    expect(plateau.matrix[2][1]).toBe(rover)
  });
});
