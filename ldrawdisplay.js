"use strict";

const fs = require("fs");
const brickOrigins = [[0, 0, 0], [0, 1, 0], [2, 3, 4]];
const fileName = "/Users/londoner/PostRC/lego_draw/assembly.dat";

const convertCoordinatesToLDraw = (point) => {
    const convertedPoint = [point[0] * 20,
                            point[1] * 24,
                            point[2] * 20];
    return convertedPoint;
};

const convertBrickToLDraw = (point) => {
    let x = point[0];
    let y = point[1];
    let z = point[2];
    const color = 7;
    const matrix = "1 0 0 0 1 0 0 0 1";
    return "1 " + color + " " + x + " " + y + " " + z + " " + matrix + " " + "3004.dat\n";
};

let lDrawStr =
          convertBrickToLDraw(convertCoordinatesToLDraw(brickOrigins[0]))
        + convertBrickToLDraw(convertCoordinatesToLDraw(brickOrigins[1]))
        + convertBrickToLDraw(convertCoordinatesToLDraw(brickOrigins[2]));

fs.writeFile(fileName, lDrawStr, (err) => {
    if (err) {
        console.log(err);
    }
});

module.exports = {
    convertBrickToLDraw: convertBrickToLDraw,
    convertCoordinatesToLDraw: convertCoordinatesToLDraw
};
