"use strict";

const h = require('./helpers2');

const convertBeamToLDraw = (beam) => {
    const x = beam.pos.x.value * 20;
    const y = beam.pos.y.value * 20;
    const z = beam.pos.z.value * 24;
    const angle = beam.angle.value;
    const color = 7;
    const s = Math.sin(angle);
    const c = Math.cos(angle)
    const matrix = `${c} ${s} 0 ${-s} ${c} 0 0 0 1`;
    //    const str = "1 " + color + " " + x + " " + y + " " + z + " " + matrix + " " + beam['filePath'] + "\n")
    return `1 ${color} ${x} ${y} ${z} ${matrix} beamseven.dat\n`;
};

module.exports = {
    convertBeamToLDraw: convertBeamToLDraw
};
