const ref = require('ref');
const ArrayType = require('ref-array');
const ffi = require('ffi');

const DoubleArray = ArrayType('double');
const Generic_NVector = ref.types.void;
const N_Vector = ref.refType(Generic_NVector);

const libklu = ffi.Library('libklu',  {});
const liblapack = ffi.Library('liblapack', {});

const libvec = ffi.Library('libsundials_nvecserial', {
    'N_VNew_Serial' : [N_Vector, ['long']],
    'N_VGetArrayPointer_Serial': [DoubleArray, [N_Vector]],
    'N_VConst_Serial': ['int', ['double', N_Vector]]
});

const libkin = ffi.Library('libsundials_kinsol', {
    'KINCreate': ['pointer', []], //   kmem = KINCreate();
    'KINInit': ['int', ['pointer', 'pointer', N_Vector]], //   flag = KINInit(kmem, func, y);
    'KINDense': ['int', ['pointer', 'int']], // flag = KINDense(kmem, NEQ)
    'KINSetFuncNormTol': ['int', ['pointer', 'double']], // (kmem, 0.001);
    'KINSetMaxSetupCalls': ['int', ['pointer', 'int']],
    'KINSetMaxSubSetupCalls': ['int', ['pointer', 'int']],
    'KINSol': ['int', ['pointer', N_Vector, 'int', N_Vector, N_Vector]] // flag = KINSol(kin_mem, u, strategy, u scale, f scale);
});

const wrap_master_function = (f, N) => {
    return ffi.Callback(
        'int',
        [N_Vector, N_Vector, 'pointer'],
        function(vin, vout, unused ) {
            const array_vin = libvec.N_VGetArrayPointer_Serial(vin);
            array_vin.length = N;
            const array_vout = libvec.N_VGetArrayPointer_Serial(vout);
            array_vout.length = N;
            const result = f.apply(this, array_vin);

            for (let i = 0 ; i < N ; i++) {
                array_vout[i] = result[i];
            }
            return 0;
        });
};

const create_solver = () => {
    const kmem = libkin.KINCreate();
    return ({
        kmem: kmem,
        init_mem: undefined,
        scale_vec: undefined,
        N: undefined,
        callback: undefined
    });
};

const init_solver = (solver, f, N) => {
    const kmem = solver.kmem;
    let flag;
    const callback = wrap_master_function(f, N);
    const init_vec = libvec.N_VNew_Serial(N);
    const scale_vec = libvec.N_VNew_Serial(N);
    libvec.N_VConst_Serial(1.0, scale_vec);
    libvec.N_VConst_Serial(1.0, init_vec);

    solver.init_vec = init_vec;
    solver.scale_vec = scale_vec;
    solver.N = N;
    solver.callback = callback;
    // start-up
    flag = libkin.KINInit(kmem,
                          callback,
                          init_vec);
    flag = libkin.KINSetFuncNormTol(kmem, 0.001);
    flag = libkin.KINDense(kmem, N);
    if (flag !== 0) {
        throw 'memory fail';
    }
    // manual instructions/example
    const mset = 1;
    flag = libkin.KINSetMaxSetupCalls(kmem, mset);
    const msubset = 1;
    flag = libkin.KINSetMaxSubSetupCalls(kmem, msubset);
    return (solver);
};

const solve = (solver) => {
    const init_vec = solver.init_vec;
    const flag = libkin.KINSol(
        solver.kmem,
        solver.init_vec,
        0, // default strategy
        solver.scale_vec,
        solver.scale_vec
    );
    const array_vin = libvec.N_VGetArrayPointer_Serial(init_vec);
    array_vin.length = solver.N;
    return array_vin;
};

// const ALPHA_CONSTRAINT = 1.0;  // radians

// const f = (alpha, beta, gamma) => {
//     const y0 = 6 * Math.cos(alpha) + 10 * Math.cos(gamma) -6 * Math.cos(beta)-8;
//     const y1 = 6 * Math.sin(alpha) + 10 * Math.sin(gamma) -6 * Math.sin(beta);
//     const y2 = alpha - ALPHA_CONSTRAINT;
//     return [y0, y1, y2];
// };

const copy_arraytype = (a) => {
    const n = a.length;
    const arr = new Array(n);
    for (i = 0 ; i < n ; i++)
    {
        arr[i] = a[i];
    }
    return arr;
};

module.exports = {
    copy_arraytype: copy_arraytype,
    solve: solve,
    init_solver: init_solver,
    create_solver: create_solver
};

// solver = create_solver();
// init_solver(solver, f, 3);
// const a = solve(solver);

// console.log(copy_arraytype(a));
// console.log('alpha : ',  a[0]);
// console.log('beta :' , a[1]);
// console.log('gamma :', a[2]);
