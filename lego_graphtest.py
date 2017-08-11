import numpy as np
import scipy.optimize

alpha_value = 1.0

def F(x):
    alpha = alpha_value
    beta = x[0]
    gamma = x[1]
    f1 = 6 * np.cos(alpha) + 10 * np.cos(gamma) - 6 * np.cos(beta) - 8
    f2 = 6 * np.sin(alpha) + 10 * np.sin(gamma) - 6 * np.sin(beta)
    return [f1, f2]

x = scipy.optimize.broyden1(F, [0, 0], f_tol=1e-14)
print(x)
