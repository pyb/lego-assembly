"use strict";

const helpers = require("./helpers");

// graph representation of Lego bricks
module.exports = {
    bricks: [{ ref: 0,
               pos: [0, 0, 0],
               angle: 0,
               localStuds: [[0, -1, 0], [1, -1, 0]],
               localHoles: [[0, 0, 0], [1, 0, 0]],
               worldStuds: [helpers.createCVarPos(), helpers.createCVarPos()],
               worldHoles: [helpers.createCVarPos(), helpers.createCVarPos()]
             },
             { ref: 1,
               pos: helpers.createCVarPos(),
               angle: 0,
               localStuds: [[0, -1, 0], [1, -1, 0]],
               localHoles: [[0, 0, 0], [1, 0, 0]],
               worldStuds: [helpers.createCVarPos(), helpers.createCVarPos()],
               worldHoles: [helpers.createCVarPos(), helpers.createCVarPos()]
             },
             { ref: 2,
               pos: helpers.createCVarPos(),
               angle: 0,
               localStuds: [[0, -1, 0], [1, -1, 0]],
               localHoles: [[0, 0, 0], [1, 0, 0]],
               worldStuds: [helpers.createCVarPos(), helpers.createCVarPos()],
               worldHoles: [helpers.createCVarPos(), helpers.createCVarPos()]
             }]
};
