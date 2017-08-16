import numpy as np

def convert_beam_to_ldraw(beam):
    x = beam['pos'][0].value * 20
    y = beam['pos'][1].value * 24
    z = beam['pos'][2].value * 20
    angle = beam['angle'].value

    color = 7
    matrix = "{c} {s} 0 {ms} {c} 0 0 0 1".format(
        c = np.cos(angle),
        s = np.sin(angle),
        ms = -np.sin(angle)
        )
    return ("1 " + str(color) + " " + str(x) + " " + str(y) + " " + str(z) + " " + str(matrix) + " " + beam['filePath'] + "\n")

def convert_coords_to_ldraw(point):
    converted_point = [point[0] * 20, point[1] * 24, point[2] * 20]
    return converted_point
