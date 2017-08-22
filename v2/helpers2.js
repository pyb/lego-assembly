"use strict";

const makeCounter = () => {
    let refCounter = 0;
    const nextRef = () => {
        let ref = refCounter;
        refCounter += 1;
        return ref;
    };
    return nextRef;
};

module.exports = {
    makeCounter: makeCounter
};
