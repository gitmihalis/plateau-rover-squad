describe("Rover", function() {
  var Rover = require('../lib/Rover');
  var rover;

  beforeEach(function() {
    // ...
  });

  it("should initialize an instance of Rover", function() {
    rover = new Rover;
    expect(rover).toEqual(jasmine.any(Rover));
  });

  it("should rotate to 0deg given LLRRRL", function() {
    rover = new Rover;
    rover.rotate('L').rotate('L').rotate('R');
    rover.rotate('R').rotate('R').rotate('L');
    expect(rover.heading).toBe(0)
  })

  it("should rotate to 90deg given RRRRR", function() {
    rover = new Rover;
    rover.rotate('R').rotate('R').rotate('R').rotate('R').rotate('R');
    expect(rover.heading).toBe(0)
  })

  it("should rotate to 90deg given LLRRRLR", function() {
    rover = new Rover;
    rover.rotate('L').rotate('L').rotate('R');
    rover.rotate('R').rotate('R').rotate('L').rotate('R');
    expect(rover.heading).toBe(0)
  })

  

});
