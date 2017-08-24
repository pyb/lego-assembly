var myrepl = require("repl").start('$ ');
myrepl.context['h'] = require('./helpers2');
myrepl.context['m'] = require('./model2');
