let makeCounter = () => {
    var refCounter = 0;

    let nextRef = () => {
        let ref = refCounter;
        refCounter += 1;
        return ref;
    };
    return nextRef;
};

module.exports = {
    makeCounter: makeCounter
};
