"use strict";

const cas = require("cassowary");

const addArraysOfSameSize = (xs, ys) => {
    return xs.map((_, i) => xs[i] + ys[i]);
};

const createCVarPos = () => {
    const x = new cas.Variable({ });
    const y = new cas.Variable({ });
    const z = new cas.Variable({ });
    return [x, y, z];
};

const equaliseTwoArrays = (solver, xs, ys) => {
    xs.map((_, i) => {
        const eq = new cas.Equation(xs[i], ys[i]);
        solver.addConstraint(eq);
    });
};

module.exports = {
    addArraysOfSameSize: addArraysOfSameSize,
    createCVarPos: createCVarPos,
    equaliseTwoArrays: equaliseTwoArrays
};
