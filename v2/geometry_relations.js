"use strict";

const m = require('./model2.js');

let functions_to_solve = [];

const generateExtractFn = (...variables) =>
          (env) =>
              variables.map((v) =>
                            c.lookUp(v, env));

const makeVariablesEqual = (v1, v2) => {
    const f = (a, b) => a - b;
    const extractv1Andv2 = generateExtractFn(v1, v2);
    functions_to_solve.push((env) => f(...extractv1Andv2(env)));
};

// zA = zB
const addEqualZconstraint = (beamA, beamB) => {
    const zA = beamA.pos.z;
    const zB = beamB.pos.z;
    makeVariablesEqual(zA, zB);
};

// zA = zB + 1
const addZplus1constraint = (beamA, beamB) => {
    const zA = beamA.pos.z;
    const zB = beamB.pos.z;

    const f = (vZa, vZb) => vZa - vZb - 1;

    const extractZaAndZb = generateExtractFn(zA, zB);
    functions_to_solve.push((env) => f(...extractZaAndZb(env)));
};

// beam position = [3, 3, 0]
const fixBeamPosition = (beam, [X, Y, Z]) => {
    const p = m.makeConstantPoint(X, Y, Z);
    makeVariablesEqual(beam.x, p.x);
    makeVariablesEqual(beam.y, p.y);
    makeVariablesEqual(beam.z, p.z);
};

const fixBeamAngle = (beam, angleValue) => {
    const f = (v) => v - angleValue;
    const extractAngle = generateExtractFn(beam.angle);
    functions_to_solve.push((env) => f(...extractAngle(env)));
};

const linkConnectors = (connector1, connector2) => {
    connector1.targets = [connector2];
    connector2.targets = [connector1];
    makeVariablesEqual(connector1.worldPos.x, connector2.worldPos.x);
    makeVariablesEqual(connector1.worldPos.y, connector2.worldPos.y);
};

const relateLocalToWorld = (connector) => {
    const angle = connector.brick.angle;
    const { x: xBeam, y: yBeam, z: zBeam } = connector.brick.pos;
    const { x: xLocal, y: yLocal, z: zLocal } = connector.localPos;
    const { x: xWorld, y: yWorld, z: zWorld } = connector.worldPos;

    const f1 = (zWorld, zLocal, zBeam) => zBeam + zLocal - zWorld;
    const extractZs = generateExtractFn(zWorld, zLocal, zBeam);
    functions_to_solve.push((env) => f1(...extractZs(env)));

    const extractXYVariables = generateExtractFn(xBeam, yBeam, xLocal, yLocal, xWorld, yWorld, angle);

    const f2 = (xBeam, yBeam, xLocal, yLocal, xWorld, yWorld, angle) => (xWorld - xBeam) * Math.cos(angle) + (yWorld - yBeam) * Math.sin(angle) - xLocal;

    const f3 = (xBeam, yBeam, xLocal, yLocal, xWorld, yWorld, angle) => -(xWorld - xBeam) * Math.sin(angle) + (yWorld - yBeam) * Math.cos(angle) - yLocal;

    functions_to_solve.push((env) => f2(...extractXYVariables(env)));
    functions_to_solve.push((env) => f3(...extractXYVariables(env)));
};

module.exports = {
    relateLocalToWorld: relateLocalToWorld,
    addEqualZconstraint: addEqualZconstraint,
    addZplus1constraint: addZplus1constraint,
    fixBeamPosition: fixBeamPosition,
    linkConnectors: linkConnectors,
    fixBeamAngle: fixBeamAngle,
    functions_to_solve: functions_to_solve
};
