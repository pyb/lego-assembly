import helpers as h

def createAbeam(ref, filePath, nHoles):
    beam = {
        'ref': ref,
        'filePath': filePath,
        'nHoles': nHoles,
        'pos': h.createVarPos(),
        'angle': h.Variable(),
        'localHoles': [[i, 0, 0] for i in range(nHoles)],
        'worldHoles': [h.createVarPos() for i in range(nHoles)]
    }
    return beam

beams = [createAbeam(0, 'beamseven.dat', 7),
         createAbeam(1, 'beameleven.dat', 11),
         createAbeam(2, 'beameleven.dat', 7),
         createAbeam(3, 'beameleven.dat', 11)]
