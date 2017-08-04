// helper fn
const cas = require("cassowary");
const addArraysOfSameSize = (xs, ys) => {
    let result = [];
    for (let i = 0; i < xs.length; i += 1) {
        result.push(xs[i] + ys[i]);
    }
    return result;
};

// helper fn 2
const createCVarPos = () => {
    const x = cas.Variable({ });
    const y = cas.Variable({ });
    const z = cas.Variable({ });
    return [x, y, z];
};

exports.module = { addArraysOfSameSize: addArraysOfSameSize,
                   createCVarPos: createCVarPos
                 };
