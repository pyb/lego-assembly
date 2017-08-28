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

const printFunctions = () => {
    g.functions_to_solve.map((f) => { console.log(f.toString()); });
};

let counter = 0;

const buildModel = () => {
    beamA = new m.Beam(3);
    beamB = new m.Beam(3);
    m.model.bricks = [beamA, beamB];

    g.addZplus1constraint(beamA, beamB);
    g.fixBeamPosition(beamA, [0, 0, 0]);
    g.fixBeamAngle(beamA, 1.0);
    g.fixBeamAngle(beamB, 2.0);

    g.linkConnectors(beamA.connectors[0], beamB.connectors[1]);

    beamA.connectors.map(g.relateLocalToWorld);
    beamB.connectors.map(g.relateLocalToWorld);

    const solver = s.create_solver();
    const Nvars = c.variables.length;
    const master_function = (...env) => {
        counter += 1;
        return g.functions_to_solve.map((f) => {
            let retval = f(env);
            return retval;
	      });
    };
    s.init_solver(solver, master_function, Nvars);
    const a = s.solve(solver);

    const results = s.copy_arraytype(a);
    for (let i  = 0 ; i < Nvars ; i++) {
        c.variables[i].value = results[i];
    }
};

const convertModelToLDraw = (model) => (model.bricks.map(d.convertBeamToLDraw)).join(' ');

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
