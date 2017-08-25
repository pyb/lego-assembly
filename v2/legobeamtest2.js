"use strict";

const m = require('./model2');
const h = require('./helpers2');
const c = require('./compute');
const g = require('./geometry_relations');

const printFunctions = () => {
    g.functions_to_solve.map((f) => { console.log(f.toString); });
};

const buildModel () => {
    const beamA = new m.Beam(7);
    const beamB = new m.Beam(5);

    // add six relations




};
