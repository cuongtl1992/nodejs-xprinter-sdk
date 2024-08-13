const ffi = require('ffi-napi');
const ref = require('ref-napi');
const path = require('path');
const os = require('os');
const wchar = require('ref-wchar-napi');
const {
    load,
    DataType,
    open,
    close,
    arrayConstructor,
    define,
} = require('ffi-rs');

// Determine the architecture
const arch = os.arch(); // 'x64' or 'ia32'
let dllPath;

if (arch === 'x64') {
    dllPath = path.join(__dirname, 'dll', 'x64', 'printer.sdk.dll');
} else if (arch === 'ia32') {
    dllPath = path.join(__dirname, 'dll', 'x86', 'printer.sdk.dll');
} else {
    throw new Error(`Unsupported architecture: ${arch}`);
}

open({
    library: 'printer.sdk',
    path: dllPath,
});

const printer = define({
    InitPrinter: {
        library: 'printer.sdk',
        retType: DataType.Pointer,
        paramsType: [DataType.String],
    },
    ReleasePrinter: {
        library: 'printer.sdk',
        retType: DataType.I32,
        paramsType: [DataType.Pointer],
    },
    OpenPort: {
        library: 'printer.sdk',
        retType: DataType.I32,
        paramsType: [DataType.Pointer, DataType.StringArray],
    },
    ClosePort: {
        library: 'printer.sdk',
        retType: DataType.I32,
        paramsType: [DataType.Pointer],
    },
    WriteData: {
        library: 'printer.sdk',
        retType: DataType.I32,
        paramsType: [DataType.Pointer, DataType.Pointer, DataType.I32],
    },
    ReadData: {
        library: 'printer.sdk',
        retType: DataType.I32,
        paramsType: [DataType.Pointer, DataType.Pointer, DataType.Pointer],
    },
    PrintImage: {
        library: 'printer.sdk',
        retType: DataType.I32,
        paramsType: [DataType.Pointer, DataType.StringArray, DataType.I32],
    },
});

module.exports = printer;
