"use strict";

const cas = require("cassowary");
const H = require("./helpers");
const G = require("./model");

const addLinkToCSolver = (solver, nBrickA, nStudA, nBrickB, nHoleB) => {
    const studPos = G.bricks[nBrickA].worldStuds[nStudA];
    const holePos = G.bricks[nBrickB].worldHoles[nHoleB];
    H.equaliseTwoArrays(solver, studPos, holePos);
};

// refactor to reduce repititiveness
const addWorldRelationToCSolver = (solver, nBrick) => {
    const brick = G.bricks[nBrick];

    const worldStudA = brick.worldStuds[0];
    const localStudA = brick.localStuds[0];
    const worldStudB = brick.worldStuds[1];
    const localStudB = brick.localStuds[1];

    const worldHoleA = brick.worldHoles[0];
    const localHoleA = brick.localHoles[0];
    const worldHoleB = brick.worldHoles[1];
    const localHoleB = brick.localHoles[1];

    const brickPos = brick.pos;

    // stud A's X, Y, Z co-ordinates
    solver.addConstraint(new cas.Equation(worldStudA[0],
                                          cas.plus(localStudA[0], brickPos[0])));
    solver.addConstraint(new cas.Equation(worldStudA[1],
                                          cas.plus(localStudA[1], brickPos[1])));
    solver.addConstraint(new cas.Equation(worldStudA[2],
                                          cas.plus(localStudA[2], brickPos[2])));
    // stud B's X, Y, Z co-ordinates
    solver.addConstraint(new cas.Equation(worldStudB[0],
                                          cas.plus(localStudB[0], brickPos[0])));
    solver.addConstraint(new cas.Equation(worldStudB[1],
                                          cas.plus(localStudB[1], brickPos[1])));
    solver.addConstraint(new cas.Equation(worldStudB[2],
                                          cas.plus(localStudB[2], brickPos[2])));

    // hole A's X, Y, Z co-ordinates
    solver.addConstraint(new cas.Equation(worldHoleA[0],
                                          cas.plus(localHoleA[0], brickPos[0])));
    solver.addConstraint(new cas.Equation(worldHoleA[1],
                                          cas.plus(localHoleA[1], brickPos[1])));
    solver.addConstraint(new cas.Equation(worldHoleA[2],
                                          cas.plus(localHoleA[2], brickPos[2])));

    // hole B's X, Y, Z co-ordinates
    solver.addConstraint(new cas.Equation(worldHoleB[0],
                                          cas.plus(localHoleB[0], brickPos[0])));
    solver.addConstraint(new cas.Equation(worldHoleB[1],
                                          cas.plus(localHoleB[1], brickPos[1])));
    solver.addConstraint(new cas.Equation(worldHoleB[2],
                                          cas.plus(localHoleB[2], brickPos[2])));
};

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
