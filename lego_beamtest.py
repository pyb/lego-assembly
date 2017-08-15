import numpy as np
import scipy.optimize
import helpers as h
import new_model as nm

relations = []

def addLinkToSolver(nBeamA, nHoleA, nBeamB, nHoleB):
    holeApos = nm.beams[nBeamA]['worldHoles'][nHoleA]
    holeBpos = nm.beams[nBeamB]['worldHoles'][nHoleB]
    h.equaliseTwoVars(holeApos[0], holeBpos[0], relations)
    h.equaliseTwoVars(holeApos[1], holeBpos[1], relations)

def addWorldRelationToSolver(nBeam, relations):
    beam = nm.beams[nBeam]
    beamPos = beam['pos']
    for j in range(0, beam['nHoles']):
        worldHole = beam['worldHoles'][j]
        localHole = beam['localHoles'][j]

        fn_str = 'lambda V:' + worldHole[2].to_string() + ' - ' + beamPos[2].to_string()
        fn = eval(fn_str)
        relations.append(fn)

        fn_str = 'lambda V: {xbeam} + {l}*cos({alpha}) - {xhole}'.format(
            alpha=beam['angle'],
            xbeam = beamPos[0],
            l = j,
            xhole = worldHole[0])
        fn = eval(fn_str)
        relations.append(fn)

        fn_str = 'lambda V: {ybeam} + {l}*sin({alpha}) - {yhole}'.format(
            alpha=beam['angle'],
            ybeam = beamPos[1],
            l = j,
            yhole = worldHole[1])
        fn = eval(fn_str)
        relations.append(fn)
