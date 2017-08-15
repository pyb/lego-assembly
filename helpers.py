counter = 0

class Variable:
    def __init__(self):
        global counter
        self._index = counter
        counter += 1
    def get_index(self):
        return self._index

    def to_string(self):
        return 'V[ ' + str(self._index) + ']'

def createVarPos():
    x = Variable()
    y = Variable()
    z = Variable()
    return [x, y, z]

def equaliseTwoVars(x, y, relations):
    fn_str = 'lambda V: ' + x.to_string() + ' - ( ' + y.to_string() + ')'
    print (fn_str)
    fn = eval(fn_str)
    relations.append(fn)

def equaliseTwoLists(xs, ys, relations):
    l = len(xs)
    for i in range(0, l):
        equaliseTwoVars(xs[i], ys[i], relations)
