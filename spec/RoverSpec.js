describe("Rover", function() {
  var Rover = require('../lib/Rover');
  var rover;

  beforeEach(function() {
    rover = new Rover
  });

  it("should initialize an instance of Rover", function() {
    expect(rover).toEqual(jasmine.any(Rover));
  });

  it("should rotate to 0deg given LLRRRL", function() {
    rover.rotate('L').rotate('L').rotate('R');
    rover.rotate('R').rotate('R').rotate('L');
    expect(rover.heading).toBe(0)
  })

  it("should rotate to 90deg given RRRRR", function() {
    rover.rotate('R').rotate('R').rotate('R').rotate('R').rotate('R');
    expect(rover.heading).toBe(0)
  })

  it("should rotate to 90deg given LLRRRLR", function() {
    rover.rotate('L').rotate('L').rotate('R');
    rover.rotate('R').rotate('R').rotate('L').rotate('R');
    expect(rover.heading).toBe(0)
  })

  it("should move in the direction of its heading", function() {
    rover.heading = 'S';
    rover.coordinates = {x: 2, y:2};
    rover.move();
    expect(rover.coordinates).toBe({x:2, y:1});
  })

  

});
