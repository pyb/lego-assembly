const cas = require("cassowary");
const H = require("helpers");
let bricks = [{ ref: 0,
                pos: [0, 0, 0],
                angle: 0,
                localStuds: [[0, -1, 0], [1, -1, 0]],
                localHoles: [[0, 0, 0], [1, 0, 0]],
                worldStuds: [H.createCVarPos(), H.createCVarPos()],
                worldHoles: [H.createCVarPos(), H.createCVarPos()]
              },
              { ref: 1,
                pos: H.createCVarPos(),
                angle: 0,
                localStuds: [[0, -1, 0], [1, -1, 0]],
                localHoles: [[0, 0, 0], [1, 0, 0]],
                worldStuds: [H.createCVarPos(), H.createCVarPos()],
                worldHoles: [H.createCVarPos(), H.createCVarPos()]
              },
              { ref: 2,
                pos: H.createCVarPos(),
                angle: 0,
                localStuds: [[0, -1, 0], [1, -1, 0]],
                localHoles: [[0, 0, 0], [1, 0, 0]],
                worldStuds: [H.createCVarPos(), H.createCVarPos()],
                worldHoles: [H.createCVarPos(), H.createCVarPos()]
              }];

