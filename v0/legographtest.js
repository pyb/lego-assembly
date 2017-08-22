"use strict";

const cas = require("cassowary");
const dummyVar = new cas.Variable({ }); // workaround as cas generates buggy variables
const helpers = require("./helpers");
const lDraw = require("./ldrawdisplay.js");
const fs = require("fs");
const G = require("./model");
let filePath;

const addLinkToCSolver = (solver, nBrickA, nStudA, nBrickB, nHoleB) => {
    const studPos = G.bricks[nBrickA].worldStuds[nStudA];
    const holePos = G.bricks[nBrickB].worldHoles[nHoleB];
    helpers.equaliseTwoArrays(solver, studPos, holePos);
};

// refactor to reduce repititiveness
const addWorldRelationToCSolver = (solver, nBrick) => {
    const brick = G.bricks[nBrick];
    const brickPos = brick.pos;

    // process stud A and stud B
    for (let j = 0 ; j < 2 ; j+=1) {
        // stud j's X, Y, Z co-ordinates
        for (let i = 0 ; i < 3 ; i+=1) {
            solver.addConstraint(new cas.Equation(brick.worldStuds[j][i],
                                                  cas.plus(brick.localStuds[j][i], brickPos[i])));
            solver.addConstraint(new cas.Equation(brick.worldHoles[j][i],
                                                  cas.plus(brick.localHoles[j][i], brickPos[i])));
        }
    }
};

const testConstraintSolver = () => {
    const solver = new cas.SimplexSolver();

    addWorldRelationToCSolver(solver, 0);
    addWorldRelationToCSolver(solver, 1);
    addWorldRelationToCSolver(solver, 2);

//    addLinkToCSolver(solver, 0, 1, 1, 0);
//    addLinkToCSolver(solver, 1, 0, 2, 0);
//    addLinkToCSolver(solver, 1, 1, 2, 1);

    addLinkToCSolver(solver, 0, 0, 1, 0);
    addLinkToCSolver(solver, 0, 1, 1, 1);
    addLinkToCSolver(solver, 1, 1, 2, 0);

    solver.addConstraint(new cas.Equation(G.bricks[0].pos[0],
                                          0));
    solver.addConstraint(new cas.Equation(G.bricks[0].pos[1],
                                          0));
    solver.addConstraint(new cas.Equation(G.bricks[0].pos[2],
                                          0));
    solver.resolve();
};
testConstraintSolver();

// get nBrick positions from G.bricks
const brickOrigins = G.bricks.map((b) => b.pos.map((Var) => Var.value));

// [[x1, y1, z1], [x2, y2, z2], [x3, y3, z3]] -> lDraw
const brickStrings = brickOrigins.map((p) => {
    return lDraw.convertBrickToLDraw(lDraw.convertCoordinatesToLDraw(p));
});

if (process.argv.length === 2) {
    filePath = "/Users/londoner/PostRC/lego_draw/assembly.dat";
} else {
    filePath = process.argv[2];
}

const lDrawFileContents = brickStrings.reduce((acc, s) => acc.concat(s), "");

fs.writeFile(filePath, lDrawFileContents, (err) => {
    if (err) {
        console.log(err);
    }
});
