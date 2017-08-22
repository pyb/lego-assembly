filename = "/Users/londoner/PostRC/lego_draw/assemblypy.dat";
brick_origins = [[0, 0, 0], [0, 1, 0], [2, 3, 4]]

def convert_brick_to_ldraw(brick):
    x = brick[0]
    y = brick[1]
    z = brick[2]
    color = 7
    matrix = "1 0 0 0 1 0 0 0 1"
    return ("1 " + str(color) + " " + str(x) + " " + str(y) + " " + str(z) + " " + str(matrix) + " " + "3004.dat\n")

def convert_coords_to_ldraw(point):
    converted_point = [point[0] * 20, point[1] * 24, point[2] * 20]
    return converted_point

ldraw_str = convert_brick_to_ldraw(convert_coords_to_ldraw(brick_origins[0])) + convert_brick_to_ldraw(convert_coords_to_ldraw(brick_origins[1])) + convert_brick_to_ldraw(convert_coords_to_ldraw(brick_origins[2]))

file = open(filename, "w")
file.write(ldraw_str)
file.close()
