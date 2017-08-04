"use strict";

// helper fn
const cas = require("cassowary");
const addArraysOfSameSize = (xs, ys) => {
    let result = [];
    for (let i = 0; i < xs.length; i += 1) {
        result.push(xs[i] + ys[i]);
    }
    return result;
};

// helper fn 2
const createCVarPos = () => {
    const x = new cas.Variable({ });
    const y = new cas.Variable({ });
    const z = new cas.Variable({ });
    return [x, y, z];
};

const equaliseTwoArrays = (solver, xs, ys) => {
    for (let i = 0 ; i < 3 ; i++) {
        const eq = new cas.Equation(xs[i], ys[i]);
        solver.addConstraint(eq);
    };
};

module.exports = {
    addArraysOfSameSize: addArraysOfSameSize,
    createCVarPos: createCVarPos,
    equaliseTwoArrays: equaliseTwoArrays
};
