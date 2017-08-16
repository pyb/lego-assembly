import numpy as np
import scipy.optimize
import helpers as h
import new_model as nm

relations = []
beam0_alpha = 1.0

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
        # dealing with z-coordinate
        fn_str = 'lambda V: {worldHoleZ} - {beamZ} '.format(
            beamZ = beamPos[2].to_string(),
            worldHoleZ = worldHole[2].to_string()
        )
        fn = eval(fn_str)
        relations.append(fn)

        fn_str = 'lambda V: {xbeam} + {length}*np.cos({alpha}) - {xhole}'.format(
            alpha=beam['angle'].to_string(),
            xbeam = beamPos[0].to_string(),
            length = j,
            xhole = worldHole[0].to_string())
        fn = eval(fn_str)
        relations.append(fn)

        fn_str = 'lambda V: {ybeam} + {length}*np.sin({alpha}) - {yhole}'.format(
            alpha=beam['angle'].to_string(),
            ybeam = beamPos[1].to_string(),
            length = j,
            yhole = worldHole[1].to_string())
        fn = eval(fn_str)
        relations.append(fn)

def F(V):
    return [f(V) for f in relations]

def testConstraintSolver():
    addWorldRelationToSolver(0, relations)
    addWorldRelationToSolver(1, relations)
    addWorldRelationToSolver(2, relations)
    addWorldRelationToSolver(3, relations)

    addLinkToSolver(0, 0, 3, 0)
    addLinkToSolver(3, 8, 2, 0)
    addLinkToSolver(1, 10, 2, 6)
    addLinkToSolver(0, 6, 1, 0)

    for i in range(0, 3):
        fn_str = 'lambda V: ' + nm.beams[0]['pos'][i].to_string()
        fn = eval(fn_str)
        relations.append(fn)

    fn_str = 'lambda V: ' + nm.beams[2]['pos'][2].to_string()
    fn = eval(fn_str)
    relations.append(fn)

    fn_str = 'lambda V: 1 + ' + nm.beams[1]['pos'][2].to_string()
    fn = eval(fn_str)
    relations.append(fn)

    fn_str = 'lambda V: 1 + ' + nm.beams[3]['pos'][2].to_string()
    fn = eval(fn_str)
    relations.append(fn)

    # Fix some angles
    fn_str = 'lambda V: ' + nm.beams[3]['angle'].to_string()
    fn = eval(fn_str)
    relations.append(fn)

    fn_str = 'lambda V: {angle} - {alpha} '.format(
        angle =  nm.beams[0]['angle'].to_string(),
        alpha = beam0_alpha
    )
    fn = eval(fn_str)
    relations.append(fn)

    print('relations : ', len(relations))
    print('Variables : ', h.counter)

    Values = scipy.optimize.broyden1(F, [0] * len(relations), f_tol=1e-5)
    print('Values from SciPy solver : ', Values)

testConstraintSolver()
