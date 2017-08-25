"use strict";

const m = require('./model2');
const h = require('./helpers2');
const c = require('./compute');
const g = require('./geometry_relations');

let beamA;
let beamB;

const printFunctions = () => {
    g.functions_to_solve.map((f) => { console.log(f.toString()); });
};

const buildModel = () => {
    beamA = new m.Beam(7);
    beamB = new m.Beam(5);

    g.addZplus1constraint(beamA, beamB);
    g.fixBeamPosition(beamA, [0, 0, 0]);
    g.fixBeamAngle(beamA, 1.0);
    g.fixBeamAngle(beamB, 2.0);

    g.linkConnectors(beamA.connectors[0], beamB.connectors[1]);

    beamA.connectors.map(g.relateLocalToWorld);
    beamB.connectors.map(g.relateLocalToWorld);

    printFunctions();
};

module.exports = {
    printFunctions: printFunctions,
    buildModel: buildModel,
    beamA: beamA,
    beamB: beamB
};
