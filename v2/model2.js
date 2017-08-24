"use strict";

const h = require('./helpers2');
const c = require('./compute');

let newRef = h.makeCounter();

class Point {
    constructor(x=new c.Variable(),
                y=new c.Variable(),
                z=new c.Variable()
               ) {
        this.x = x;
        this.y = y;
        this.z = z;
    };
};

class Block {
    constructor(ref=newRef(),
                pos=undefined,
                angle=undefined) {
        this.ref = ref;
        this.pos = pos;
        this.connectors = [];
    };
}

// build up model in terms of parts
let model = {
    parts: []
};

module.exports = {
    newRef: newRef,
    Block: Block,
    Hole: Hole,
    Connector: Connector,
    model: model
};
