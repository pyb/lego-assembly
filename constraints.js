// API exposed by the cassowaray obj
"use strict";

const cas = require("cassowary");
const solver = new cas.SimplexSolver();
const x = new cas.Variable({ value: 1000 });
const eq2 = new cas.Equation(x, 42);
solver.addConstraint(eq2);
solver.resolve();
console.log(x.value);
