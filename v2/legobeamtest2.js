"use strict";

const m = require('./model2');
const h = require('./helpers2');
const c = require('./compute');
const g = require('./geometry_relations');
const s = require('../lib/solverwrappertest');

let beamA;
let beamB;

const printFunctions = () => {
    g.functions_to_solve.map((f) => { console.log(f.toString()); });
};

let counter = 0;

const buildModel = () => {
    beamA = new m.Beam(2);
//    beamB = new m.Beam(5);

//    g.addZplus1constraint(beamA, beamB);
    g.fixBeamPosition(beamA, [0, 0, 0]);
    g.fixBeamAngle(beamA, 0.0);
//    g.fixBeamAngle(beamB, 2.0);

//    g.linkConnectors(beamA.connectors[0], beamB.connectors[1]);

    beamA.connectors.map(g.relateLocalToWorld);
//    beamB.connectors.map(g.relateLocalToWorld);

    //    printFunctions();
    const solver = s.create_solver();
    const Nvars = c.variables.length;
    const master_function = (...env) => {
	counter += 1;
//	console.log("master function called " + counter + " times");
        return g.functions_to_solve.map((f) => {
	    let retval = f(env);
	    return retval;
	});
    };
    s.init_solver(solver, master_function, Nvars);
    const a = s.solve(solver);

    const results = s.copy_arraytype(a);
    console.log(results);
    for (let i  = 0 ; i < Nvars ; i++)
    {
	c.variables[i].value = results[i];
    }
};

buildModel();

module.exports = {
    printFunctions: printFunctions,
    buildModel: buildModel,
    beamA: beamA,
    beamB: beamB
};
