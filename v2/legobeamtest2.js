"use strict";

const m = require('./model2');
const h = require('./helpers2');
const d = require('./display2');
const c = require('./compute');

let functions_to_solve = [];

// let extractZaAndZb = (env) => {
//     let vZa = c.lookUp(zA, env);
//     let vZb = c.lookUp(zB, env);
//     return [vZa, vZb];
// };

const generateExtractFn = (...variables) =>
          (env) =>
              variables.map((v) =>
                            c.lookUp(v, env));

let addEqualZconstraint = (beamA, beamB) => {
    const zA = beamA.pos.z;
    const zB = beamB.pos.z;

    const f = (vZa, vZb) => vZa - vZb;

    const extractZaAndZb = generateExtractFn(zA, zB);
    functions_to_solve.push((env) => f(...extractZaAndZb(env)));
};

