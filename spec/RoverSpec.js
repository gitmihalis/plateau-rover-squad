describe("Rover", function() {
  var Rover = require('../lib/Rover')
  var rover

  beforeEach(function() {
    rover = new Rover
  })

  it("should initialize an instance of Rover", function() {
    expect(rover).toEqual(jasmine.any(Rover))
    
  })

  it("should initialize with starting coordinates and a heading", function() {
    let rover2 = new Rover(2,7)
    expect(rover.coordinates).toEqual({x: 0, y: 0})
    expect(rover2.coordinates).toEqual({x:2, y:7})
    expect(rover2.heading).toBe(270)
  })

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
    rover.coordinates = {x: 2, y:2};
    rover.move("S");
    expect(rover.coordinates).toEqual({x:2, y:1});
    rover.move("W");
    expect(rover.coordinates).toEqual({x:1, y:1});
  })

  it("should not move with an invalid heading", function() {
    rover.coordinates = {x: 2, y: 2};
    expect(rover.move.bind(rover, "Down")).toThrowError(/Invalid instruction/);
  })

  

});
