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

def equaliseTwoVars(x, y):
    fn_str = 'lambda V: ' + x.to_string() + ' - ( ' + y.to_string() + ')'
    print (fn_str)
    return eval(fn_str)
   

def equaliseTwoLists(xs, ys, relations):
    relations.extend(equaliseTwoVars(x, y) for x, y in zip(xs, ys))
   
