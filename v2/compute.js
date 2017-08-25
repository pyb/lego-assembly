"use strict";

const h = require('./helpers2');

// Relation object contains a function, as well as all the variables involved (name and location in the model and / or in the master list of all variables)

// Use extractor functions to compose with relations, to obtain relevant variables from the master array of all variables.

let nextIndex = h.makeCounter();

class Variable {
    constructor(index=undefined,
                value=undefined,
                name=undefined,
                constant=undefined) {
        this.index = index;
        this.value = value; // filled after solving with general non-linear solver
        this.name = name;
        this.constant = constant;
        if (!constant && !this.index) {
            this.index = nextIndex();
        }
        // ....
    };
};

// lookUp utility
const lookUp = (variable, env) => {
    let value;
    let index;
    if (variable.constant !== undefined) {
        value = variable.constant;
    }
    else {
        index = variable.index;
        value = env[index];
    }
    return value;
};

module.exports = {
    Variable: Variable,
    lookUp: lookUp,
    nextIndex: nextIndex,
    variables: variables,
    constants: constants
};
