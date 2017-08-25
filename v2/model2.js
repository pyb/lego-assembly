"use strict";

const h = require('./helpers2');
const c = require('./compute');

let newRef = h.makeCounter();

class Point {
    constructor(name=undefined, constant=undefined) {
        this.x = new c.Variable(name + ' x', undefined, undefined, constant);
        this.y = new c.Variable(name + ' y', undefined, undefined, constant);
        this.z = new c.Variable(name + ' z', undefined, undefined, constant);
    };
};

const makeConstantPoint = (X, Y, Z) => {
    const name = 'constant point ' + [X, Y, Z];
    const p = new Point(name, true);
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
                 worldPos
                ) {
                    this.targets = [];
                    if (worldPos === undefined) {
                        this.worldPos = new Point('constructor worldPos ', false);
                    };
                    this.localPos = localPos,
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
        let name = 'angle ' + ref;
        this.angle = new c.Variable(name, undefined, undefined, false);
        this.pos = new Point(name, false);
    };
}

class Beam extends Brick {
    constructor(length) {
        super();
        this.length = length;
        this.connectors = this.generateConnectors();
    }
    generateConnectors() {
        const iter = h.range(this.length);
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
    Beam: Beam,
    Connector: Connector,
    model: model,
    makeConstantPoint: makeConstantPoint
};
