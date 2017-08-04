// API exposed by the cassowaray obj
const c = require("cassowary");
const solver = new c.SimplexSolver();
const x = new c.Variable({ value: 1000 });
const eq2 = new c.Equation(x, 42);
solver.addConstraint(eq2);
solver.resolve();
console.log(x.value);
