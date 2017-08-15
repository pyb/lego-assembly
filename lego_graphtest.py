import numpy as np
import scipy.optimize
import helpers as h
import model as m

relations = []

def addLinkToSolver(nBrickA, nStudA, nBrickB, nHoleB):
    studPos = m.bricks[nBrickA].worldStuds[nStudA]
    holePos = m.bricks[nBrickB].worldHoles[nHoleB]
    h.equaliseTwoLists(studPos, holePos)

def addWorldRelationToSolver(relations, nBrick):
    brick = m.bricks[nBrick]
    brickPos = brick.pos
    for j in range(0, 2):
        worldStud = brick.worldStuds[j]
        worldHole = brick.worldHoles[j]
        localStud = brick.localStuds[j]
        localHole = brick.localHoles[j]
        for i in range(0, 3):
            fn_str = 'lambda V: ' + worldStud[i].to_string() + ' - ' + localStud[i].to_string() + ' - ' + brickPos[i]
            fn = eval(fn_str)
            relations.append(fn)

def F(V):
    return [f(V) for f in relations]

def testConstraintSolver():
    addWorldRelationToSolver(relations, 0)
    addWorldRelationToSolver(relations, 1)
    addWorldRelationToSolver(relations, 2)

    addLinkToSolver(0, 1, 1, 0)
    addLinkToSolver(1, 0, 2, 0)
    addLinkToSolver(1, 1, 2, 1)

    # put first brick into [0, 0, 0]
    for i in range(0, 3):
        fn_str = 'lambda V: ' + m.bricks[0].pos[i].to_string()
        fn = eval(fn_str)
        relations.append(fn)
    V = scipy.optimize.broyden1(F, [0] * h.counter, f_tol=1e-14)
    print(V)

testConstraintSolver()
