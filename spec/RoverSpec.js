describe("Rover", function() {
  var Rover = require('../lib/Rover')
  var Plateau = require('../lib/Plateau')
  var rover
  var plateau


  beforeEach(function() {
    rover = new Rover
    plateau = new Plateau(8, 10).generate()
  })

  it("should initialize an instance of Rover", function() {
    expect(rover).toEqual(jasmine.any(Rover))
  })

  it("should initialize with starting coordinates and a heading", function() {
    let rover2 = new Rover(2,7, 270)
    
    expect(rover.coordinates).toEqual({x: 0, y: 0})
    expect(rover2.coordinates).toEqual({x:2, y:7})
    expect(rover2.heading).toBe(270)
  })

  it("should rotate to 0deg given LLRRRL", function() {
    rover.rotate('L').rotate('L').rotate('R').rotate('R').rotate('R').rotate('L')

    expect(rover.heading).toBe(0)
  })

  it("should rotate to 90deg given RRRRR", function() {
    rover.rotate('R').rotate('R').rotate('R').rotate('R').rotate('R')

    expect(rover.heading).toBe(90)
  })

  it("should rotate to 90deg given LLRRRLR", function() {
    rover.rotate('L').rotate('L').rotate('R')
      .rotate('R').rotate('R').rotate('L').rotate('R')

    expect(rover.heading).toBe(90)
  })

  it("should move in the direction of its heading", function() {
    rover.coordinates = {x: 2, y:2}
    rover.heading = 180
    rover.move()
    
    expect(rover.coordinates).toEqual({x:2, y:1})

    rover.heading = 270
    rover.move()

    expect(rover.coordinates).toEqual({x:1, y:1})
  })

  it("should not move with an invalid heading", function() {
    rover.coordinates = {x: 2, y: 2}
    rover.heading = 80

    expect(rover.move.bind(rover, "Down")).toThrowError(/Invalid instruction/)
  })

  it("should move or rotate given a string of instruction", function() {
    rover.coordinates = {x: 2, y: 2}
    rover.heading = 0
    rover.instruction = "LMLMM"
    rover.deploy(plateau)

    expect(rover.coordinates).toEqual({x: 1, y: 0})
  })

  it("should break if it's deployed outside the plateau", function() {
    rover.coordinates = {x: 1, y: 1}
    rover.heading = 270
    rover.instruction = "MMMM"
    expect(rover.isActive).toEqual(false)
  })

  it("should log it's final coordiantes after it is deployed", function() {
    rover.coordinates = {x: 2, y: 2}
    rover.heading = 0
    rover.instruction = "LMLMM"
    rover.deploy(plateau)
    expect(rover.broadcastCoordinates()).toEqual("1 0 S")
  })

  

})
