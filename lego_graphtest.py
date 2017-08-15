import numpy as np
import scipy.optimize
import helpers as h
import model as m

relations = []

def addLinkToSolver(nBrickA, nStudA, nBrickB, nHoleB):
    studPos = m.bricks[nBrickA]['worldStuds'][nStudA]
    holePos = m.bricks[nBrickB]['worldHoles'][nHoleB]
    h.equaliseTwoLists(studPos, holePos, relations)

def addWorldRelationToSolver(relations, nBrick):
    brick = m.bricks[nBrick]
    brickPos = brick['pos']
    for j in range(0, 2):
        worldStud = brick['worldStuds'][j]
        worldHole = brick['worldHoles'][j]
        localStud = brick['localStuds'][j]
        localHole = brick['localHoles'][j]
        for i in range(0, 3):
            fn_str = 'lambda V: ' + worldStud[i].to_string() + ' - ( ' + str(localStud[i]) + ' ) - ( ' + brickPos[i].to_string() + ')'
            print (fn_str)
            fn = eval(fn_str)
            relations.append(fn)
            fn_str = 'lambda V: ' + worldHole[i].to_string() + ' - ( ' + str(localHole[i]) + ' ) - ( ' + brickPos[i].to_string() + ')'
            print (fn_str)
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

    # put first bric k into [0, 0, 0]
    for i in range(0, 3):
        fn_str = 'lambda V: ' + m.bricks[0]['pos'][i].to_string()
        print (fn_str)
        fn = eval(fn_str)
        relations.append(fn)
    print('counter :', h.counter)
    print('relations : ', len(relations))
    Values = scipy.optimize.broyden1(F, [0] * len(relations), f_tol=1e-5)
    Values_rounded = list(map(
        lambda x: round(x, 3),
        Values
    ))
    print(Values_rounded)

    brick1pos_var = m.bricks[1]['pos']
    brick1posx_val =  Values_rounded[brick1pos_var[0].get_index()]
    brick1posy_val =  Values_rounded[brick1pos_var[1].get_index()]
    brick1posz_val =  Values_rounded[brick1pos_var[2].get_index()]
    print('brick one position: ', [brick1posx_val, brick1posy_val, brick1posz_val])

    brick2pos_var = m.bricks[2]['pos']
    brick2posx_val =  Values_rounded[brick2pos_var[0].get_index()]
    brick2posy_val =  Values_rounded[brick2pos_var[1].get_index()]
    brick2posz_val =  Values_rounded[brick2pos_var[2].get_index()]
    print('brick two position: ', [brick2posx_val, brick2posy_val, brick2posz_val])

testConstraintSolver()
