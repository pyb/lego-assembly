"use strict";

// graph representation of Lego bricks
const helpers = require("./helpers");

module.exports = {
    bricks: [{ ref: 0,
               pos: [0, 0, 0],
               angle: 0,
               localStuds: [[0, -1, 0], [1, -1, 0]],
               localhelpersoles: [[0, 0, 0], [1, 0, 0]],
               worldStuds: [helpers.createCVarPos(), H.createCVarPos()],
               worldhelpersoles: [H.createCVarPos(), H.createCVarPos()]
             },
             { ref: 1,
               pos: helpers.createCVarPos(),
               angle: 0,
               localStuds: [[0, -1, 0], [1, -1, 0]],
               localhelpersoles: [[0, 0, 0], [1, 0, 0]],
               worldStuds: [helpers.createCVarPos(), H.createCVarPos()],
               worldhelpersoles: [H.createCVarPos(), H.createCVarPos()]
             },
             { ref: 2,
               pos: helpers.createCVarPos(),
               angle: 0,
               localStuds: [[0, -1, 0], [1, -1, 0]],
               localhelpersoles: [[0, 0, 0], [1, 0, 0]],
               worldStuds: [helpers.createCVarPos(), H.createCVarPos()],
               worldhelpersoles: [H.createCVarPos(), H.createCVarPos()]
             }]
};
