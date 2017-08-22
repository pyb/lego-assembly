const h = require('./helpers2');
const c = require('./compute');

let newRef = h.makeCounter();

class Connector {
    constructor (ref=newRef(), pos=undefined) {
        this.links = []; // list of connectors
        this.pos = pos;
        this.ref = ref;
    };
    get bound() {
        return !(this.links.length === 0);
    };
};

class Hole extends Connector {

};

class Location {
    constructor( x=new c.Variable(),
                 y=new c.Variable(),
                 z=new c.Variable() ) {
        this.x = x;
        this.y = y;
        this.z = z;
    };
};

class Brick {
    constructor(ref=newRef(), pos=undefined, angle=undefined) {
        this.ref = ref;
        this.pos = pos;
        this.connectors = [];
    };
}

let model = {
    parts: []
};

module.exports = {
    newRef: newRef,
    Brick: Brick,
    Hole: Hole,
    Connector: Connector,
    model: model
};
