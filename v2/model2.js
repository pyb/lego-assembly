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

const makeConstantPoint = (X, Y, Z) => {
    const p = new Point();
    p.x.constant = X;
    p.y.constant = Y;
    p.z.constant = Z;
    return p;
};

// connectorType is always 'hole'
class Connector {
    constructor (connectorType,
                 brick,
                 localPos,
                 worldPos=new Point()
                ) {
        this.targets = []; // list of connectors that Connector goes into
        this.localPos = localPos,
        this.worldPos = worldPos,
        this.type = connectorType;
        this.brick = brick;
    };
    get bound() {
        return !(this.targets.length === 0);
    };
};

class Brick {
    constructor(ref=newRef()) {
        this.ref = ref;
        this.angle = new c.Variable();
        this.pos = new Point();
        this.connectors = this.generateConnectors();
    };
}

class Beam extends Brick {
    constructor(length) {
        this.length = length;
    }
    generateConnectors() {
        const iter = range(this.length);
        return iter.map((i) => {
            const p = makeConstantPoint(i, 0, 0);
            return new Connector("hole", this, p);
        });
    };
}

// build up model in terms of parts
let model = {
    bricks: [], // =>
    connectors: []
};

module.exports = {
    newRef: newRef,
    Brick: Brick,
    Connector: Connector,
    model: model
};
