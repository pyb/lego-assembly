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
    'N_VSetArrayPointer_Serial': ['void', [DoubleArray, N_Vector]],
    'N_VConst_Serial': ['int', ['double', N_Vector]]
});

const libkin = ffi.Library('libsundials_kinsol', {
    'KINCreate': ['pointer', []], //   kmem = KINCreate();
    'KINInit': ['int', ['pointer', 'pointer', N_Vector]], //   flag = KINInit(kmem, func, y);
    'KINDense': ['int', ['pointer', 'int']], // flag = KINDense(kmem, NEQ)
    'KINSpgmr': ['int', ['pointer', 'int']],// (kin mem, maxl);
    'KINLapackDense': ['int', ['pointer', 'int']],
    'KINSetNumMaxIters':  ['int', ['pointer', 'long']], //flag = KINSetNumMaxIters(kin mem, mxiter);
    'KINSetFuncNormTol': ['int', ['pointer', 'double']], // (kmem, 0.001);
    'KINSetScaledStepTol': ['int', ['pointer', 'double']], // (kmem, 0.00001);
    'KINSetMaxSetupCalls': ['int', ['pointer', 'int']],
    'KINSetMaxSubSetupCalls': ['int', ['pointer', 'int']],
    'KINSetNoInitSetup': ['int', ['pointer', 'bool']],
    'KINSetPrintLevel': ['int', ['pointer', 'int']], // flag = KINSetPrintLevel(kmem, printfl);
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

let arrayInit;

const init_solver = (solver, f, N) => {
    const kmem = solver.kmem;
    let flag;
    arrayInit = new DoubleArray(N);
    const callback = wrap_master_function(f, N);
    const init_vec = libvec.N_VNew_Serial(N);
    const scale_vec = libvec.N_VNew_Serial(N);
    libvec.N_VConst_Serial(1.0, scale_vec);
    libvec.N_VConst_Serial(0.0, init_vec);

    for (let i = 0 ; i < N ; i++) {
	arrayInit[i] = Math.random();
    }
    libvec.N_VSetArrayPointer_Serial(arrayInit, init_vec);

    solver.init_vec = init_vec;
    solver.scale_vec = scale_vec;
    solver.N = N;
    solver.callback = callback;

    flag = libkin.KINInit(kmem,
                          callback,
                          init_vec);
    flag = libkin.KINSetFuncNormTol(kmem, 0.001);
//    flag = libkin.KINSetScaledStepTol(kmem, 0.00000001);
    flag = libkin.KINDense(kmem, N);
    flag = libkin.KINSetPrintLevel(kmem, 3);
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
