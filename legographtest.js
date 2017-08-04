"use strict";

const cas = require("cassowary");
const H = require("./helpers");
const G = require("./model");

const addLinkToCSolver = (solver, nBrickA, nStudA, nBrickB, nHoleB) => {
    const studPos = G.bricks[nBrickA].worldStuds[nStudA];
    const holePos = G.bricks[nBrickB].worldHoles[nHoleB];
    H.equaliseTwoArrays(solver, studPos, holePos);
};

const addWorldRelationToCSolver = (solver, nBrick) => {
    const brick = G.bricks[nBrick];
    const studAw = brick.worldStuds[0];
    const studAb = brick.localStuds[0];
    const studBw = brick.worldStuds[1];
    const studBb = brick.localStuds[1];

    const holeAw = brick.worldHoles[0];
    const holeAb = brick.localHoles[0];
    const holeBw = brick.worldHoles[1];
    const holeBb = brick.localHoles[1];

    const brickPos = brick.pos;

    solver.addConstraint(new cas.Equation(studAw[0],
                                          cas.plus(studAb[0], brickPos[0])));
    solver.addConstraint(new cas.Equation(studAw[1],
                                          cas.plus(studAb[1], brickPos[1])));
    solver.addConstraint(new cas.Equation(studAw[2],
                                          cas.plus(studAb[2], brickPos[2])));

    solver.addConstraint(new cas.Equation(studBw[0],
                                          cas.plus(studBb[0], brickPos[0])));
    solver.addConstraint(new cas.Equation(studBw[1],
                                          cas.plus(studBb[1], brickPos[1])));
    solver.addConstraint(new cas.Equation(studBw[2],
                                          cas.plus(studBb[2], brickPos[2])));

    solver.addConstraint(new cas.Equation(holeAw[0],
                                          cas.plus(holeAb[0], brickPos[0])));
    solver.addConstraint(new cas.Equation(holeAw[1],
                                          cas.plus(holeAb[1], brickPos[1])));
    solver.addConstraint(new cas.Equation(holeAw[2],
                                          cas.plus(holeAb[2], brickPos[2])));

    solver.addConstraint(new cas.Equation(holeBw[0],
                                          cas.plus(holeBb[0], brickPos[0])));
    solver.addConstraint(new cas.Equation(holeBw[1],
                                          cas.plus(holeBb[1], brickPos[1])));
    solver.addConstraint(new cas.Equation(holeBw[2],
                                          cas.plus(holeBb[2], brickPos[2])));
};

const testStuff = () => {
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

testStuff();
