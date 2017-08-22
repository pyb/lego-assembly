"use strict";

const m = require('model2');
const h = require('helpers2');
const d = require('display2');

var model = new Model();

let functions_to_solve = [];

// beam A and beam B have the same Z
// assume beamA, beamB are Brick instances.
let addZRelation = (beamA, beamB) => {
    const zA = beamA.pos.z; // Variable
    const zB = beamB.pos.z; // Variable

    let f = (vzA, vzB) => vzA - vzB;

    let extract =
            (V) => {
                let i, vzA, vzB;

                if (zA.constant !== undefined) {
                    vzA = zA.constant;
                }
                else {
                    i = zA.index;
                    vzA = V[i];
                }

                if (zB.constant !== undefined) {
                    vzB = zB.constant;
                }
                else {
                    i = zB.index;
                    vzB = V[i];
                }
                return [vzA, vzB];
            };
};










// model.remove(beam); // destroy all connections as well

// model.add(
//     new Beam(7, ref=1234),
//     //
//          );

// beam1.connect(beam2, beam1coord); // incomplete
// beam2.connect(beam1, beam2coord); // now complete


// // Utilities aka helpers

// particular_beam = find(ref, model);



// connector1 = beam1.holes[3];
// connector2 = beam4.holes[0];
// connect(connector1, connector2);


// flag = is_complete(model); //  Are there enough known variables to resolve the positions ?
