"use strict";

const m = require('./model2');
const h = require('./helpers2');
const c = require('./compute');
const d = require('./display');
const g = require('./geometry_relations');
const s = require('../lib/solverwrappertest');
const fs = require("fs");

let beamA;
let beamB;
let beamC;
let beamD;

const printFunctions = () => {
    g.functions_to_solve.map((f) => { console.log(f.toString()); });
};

let counter = 0;

const buildModel = () => {

    const problem = 5;

    if (problem === 2)
    {
	beamA = new m.Beam(7);
	beamB = new m.Beam(7);

	m.model.bricks = [beamA, beamB];

	g.fixBeamPosition(beamA, [0, 0, 0]);
	g.fixBeamPosition(beamB, [4, 0, 1]);

	g.linkConnectors(beamA.connectors[5], beamB.connectors[5]);

	beamA.connectors.map(g.relateLocalToWorld);
	beamB.connectors.map(g.relateLocalToWorld);
    }
    else if (problem === 3)
    {
	beamA = new m.Beam(3);
	beamB = new m.Beam(7);
	beamC = new m.Beam(7);

	m.model.bricks = [beamA, beamB, beamC];

	g.addZplus1constraint(beamA, beamB);
	g.fixBeamPosition(beamA, [0, 0, 0]);
	g.fixBeamPosition(beamC, [10, 0, 0]);

	g.fixBeamAngle(beamA, 0.8);

	g.linkConnectors(beamA.connectors[2], beamB.connectors[0]);
	g.linkConnectors(beamB.connectors[5], beamC.connectors[4]);

	beamA.connectors.map(g.relateLocalToWorld);
	beamB.connectors.map(g.relateLocalToWorld);
	beamC.connectors.map(g.relateLocalToWorld);
    }
    else if (problem === 4)
    {
	beamA = new m.Beam(7);
	beamB = new m.Beam(7);
	beamC = new m.Beam(7);
	beamD = new m.Beam(7);

	m.model.bricks = [beamA, beamB, beamC, beamD];

	g.addZplus1constraint(beamA, beamB);
	g.addEqualZconstraint(beamA, beamC);
	g.addEqualZconstraint(beamB, beamD);

	g.fixBeamPosition(beamA, [0, 0, 0]);

	g.fixBeamAngle(beamA, 0.0);
	g.fixBeamAngle(beamB, 1.0);

	g.linkConnectors(beamA.connectors[0], beamB.connectors[0]);
	g.linkConnectors(beamA.connectors[5], beamD.connectors[0]);
	g.linkConnectors(beamB.connectors[6], beamC.connectors[0]);
	g.linkConnectors(beamC.connectors[6], beamD.connectors[6]);

	beamA.connectors.map(g.relateLocalToWorld);
	beamB.connectors.map(g.relateLocalToWorld);
	beamC.connectors.map(g.relateLocalToWorld);
	beamD.connectors.map(g.relateLocalToWorld);
    }
    else if (problem === 5)
    {
	beamA = new m.Beam(11);
	beamB = new m.Beam(11);
	beamC = new m.Beam(11);
	beamD = new m.Beam(11);

	m.model.bricks = [beamA, beamB, beamC, beamD];

	g.addZplus1constraint(beamA, beamB);
	g.addEqualZconstraint(beamA, beamC);
	g.addEqualZconstraint(beamB, beamD);

	g.fixBeamPosition(beamA, [0, 0, 0]);

	g.fixBeamAngle(beamA, 0.0);
	g.fixBeamAngle(beamB, 1.0);

	g.linkConnectors(beamA.connectors[0], beamB.connectors[0]);
	g.linkConnectors(beamA.connectors[7], beamD.connectors[0]);
	g.linkConnectors(beamB.connectors[6], beamC.connectors[0]);
	g.linkConnectors(beamC.connectors[8], beamD.connectors[6]);

	beamA.connectors.map(g.relateLocalToWorld);
	beamB.connectors.map(g.relateLocalToWorld);
	beamC.connectors.map(g.relateLocalToWorld);
	beamD.connectors.map(g.relateLocalToWorld);
    }

    //    printFunctions();
    const solver = s.create_solver();
    const Nvars = c.variables.length;
    console.log(Nvars + " variables.");
    console.log(g.functions_to_solve.length + " functions.");
    const master_function = (...env) => {
	counter += 1;
        const returnValues =  g.functions_to_solve.map((f) => {
	    let retval = f(env);
	    return retval;
	});
	return returnValues;
    };
    s.init_solver(solver, master_function, Nvars);
    const a = s.solve(solver);

    const results = s.copy_arraytype(a);
    for (let i  = 0 ; i < Nvars ; i++)
    {
	c.variables[i].value = results[i];
    }
};

const convertModelToLDraw = (model) => {
    return (model.bricks.map(d.convertBeamToLDraw)).join(' ');
};

const save = (fileName) => {
    const lDrawStr = convertModelToLDraw(m.model);
    fs.writeFile(fileName, lDrawStr, (err) => {
	if (err) {
            console.log(err);
	}
    });
};

buildModel();
save('./beam_assembly.dat');

module.exports = {
    printFunctions: printFunctions,
    buildModel: buildModel,
    beamA: beamA,
    beamB: beamB
};
