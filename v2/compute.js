"use strict";

const h = require('./helpers2');

// Relation object contains a function, as well as all the variables involved (name and location in the model and / or in the master list of all variables)

// Use extractor functions to compose with relations, to obtain relevant variables from the master array of all variables.
// closure fn
const nextIndex = h.makeCounter();
const variables = [];
const constants = [];

class Variable {
    constructor(name=undefined,
                value=undefined,
                index=undefined,
                constant=undefined) {
        this.index = index;
        this.value = value; // filled after solving with general non-linear solver
        this.name = name;
        this.constant = constant;
        if (!constant && !this.index) {
            this.index = nextIndex();
        }
        else if (this.constant) {
            constants.push(this);
        }
        else {
            variables.push(this);
        }
    };
};

const lookUp = (variable, env) => variable.constant || env[variable.index];

module.exports = {
    Variable: Variable,
    lookUp: lookUp,
    nextIndex: nextIndex,
    variables: variables,
    constants: constants
};
