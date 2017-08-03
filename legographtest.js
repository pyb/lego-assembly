// let bricks = [{ ref: 0, pos: [0, 0, 0], angle: 0,
//                 studs: [{hole: null}, {hole: null}],
//                 holes: [{stud: null}, {stud: null}]},
//               { ref: 1, pos: undefined, angle: 0,
//                 studs: [{hole: null}, {hole: null}],
//                 holes: [{stud: null}, {stud: null}]},
//               { ref: 2, pos: undefined, angle: 0,
//                 studs: [{hole: null}, {hole: null}],
//                 holes: [{stud: null}, {stud: null}]}
//              ];
// //const links = [{ fromPart: 0, toPart: 1, path: [ ] }, {}, {}];

// const linkBricks = (nbrick1, stud_id, nbrick2, hole_id) => {
//     const brick1 = bricks[nbrick1];
//     const brick2 = bricks[nbrick2];
//     brick1.studs[stud_id] = brick2.holes[hole_id];
//     brick2.holes[hole_id] = brick1.studs[stud_id];
// };

// linkBricks(0, 1, 1, 0);
// linkBricks(1, 0, 2, 0);
// linkBricks(1, 1, 2, 1);

// console.log(bricks);
let bricks = [{ ref: 0,
                pos: [0, 0, 0],
                angle: 0,
                localStuds: [[0, -1, 0], [1, -1, 0]],
                localHoles: [[0, 0, 0], [1, 0, 0]],
                worldStuds: [],
                worldHoles: []
              },
              { ref: 1,
                pos: undefined,
                angle: 0,
                localStuds: [[0, -1, 0], [1, -1, 0]],
                localHoles: [[0, 0, 0], [1, 0, 0]],
                worldStuds: [],
                worldHoles: []
              },
              { ref: 2,
                pos: undefined,
                angle: 0,
                localStuds: [[0, -1, 0], [1, -1, 0]],
                localHoles: [[0, 0, 0], [1, 0, 0]],
                worldStuds: [],
                worldHoles: []
              }];

const addArrays = (xs, ys) => {
    return [xs[0] + ys[0],
            xs[1] + ys[1],
            xs[2] + ys[2]];
};

const computeStudPos = (nBrick) => {
    let brick = bricks[nBrick];
    let pos = brick.pos;
    if (brick.pos === undefined) {
        return;
    } else {
        brick.worldHoles = brick.localHoles;
        brick.worldHoles = brick.worldHoles.map((hole) => {
            return addArrays(hole, pos);
        });
        brick.worldStuds = brick.localStuds;
        brick.worldStuds = brick.worldStuds.map((stud) => {
            return addArrays(stud, pos);
        });
    };
};

// console.log(addArrays([1, 1, 1], [2, 4 ,6]));
bricks[2].pos = [2, 4, 6];

console.log("Before");
console.log(bricks[2]);
computeStudPos(2);
console.log("After ");
console.log(bricks[2]);
