"use strict";

const cas = require("cassowary");
const helpers = require("./helpers");
const G = require("./model");

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
}

const testConstraintSolver = () => {
    const solver = new cas.SimplexSolver();

    addWorldRelationToCSolver(solver, 0);
    addWorldRelationToCSolver(solver, 1);
    addWorldRelationToCSolver(solver, 2);

    addLinkToCSolver(solver, 0, 1, 1, 0);
    addLinkToCSolver(solver, 1, 0, 2, 0);
    addLinkToCSolver(solver, 1, 1, 2, 1);

    solver.resolve();

    console.log("Brick 0 position : ", G.bricks[0].pos);
    console.log("Brick 1 position : ", G.bricks[1].pos);
    console.log("Brick 2 position : ", G.bricks[2].pos);
};
testConstraintSolver();
