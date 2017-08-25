var myrepl = require("repl").start('$ ');
myrepl.context['h'] = require('./helpers2');
myrepl.context['m'] = require('./model2');
myrepl.context['c'] = require('./compute');
myrepl.context['l'] = require('./legobeamtest2.js');
