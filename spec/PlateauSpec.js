describe("Plateau", function() {
  var Plateau = require('../lib/Plateau');
  var plateau;

  beforeEach(function() {
    // ...
  });

  it("should generate a 2D array with 5 columns and 5 rows", function() {
    plateau = new Plateau(5, 5);
    plateau.generate();
    expect(plateau.matrix[4][4]).toEqual(0);
    expect(plateau.matrix[5]).toBeUndefined();
  });
});
