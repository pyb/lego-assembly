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

const range = (length) => [...Array(length).keys()];

module.exports = {
    makeCounter: makeCounter,
    range: range
};
