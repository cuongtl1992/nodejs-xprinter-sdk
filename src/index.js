const ffi = require('ffi-napi');
const ref = require('ref-napi');
const path = require('path');
const os = require('os');
const wchar = require('ref-wchar-napi');

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

// Define the data types
const int = ref.types.int;
const intPtr = ref.refType(int);
const charPtr = ref.refType(ref.types.char);
const TCHAR = wchar.string;
const ucharPtr = ref.refType(ref.types.uchar);
const uint = ref.types.uint;
const uintPtr = ref.refType(uint);

// Load the DLL
const printer = ffi.Library(dllPath, {
    InitPrinter: [intPtr, [TCHAR]], 
    ReleasePrinter: [int, [intPtr]],
    OpenPort: [int, [intPtr, TCHAR]],
    ClosePort: [int, [intPtr]],
    WriteData: [int, [intPtr, ucharPtr, uint]],
    ReadData: [int, [intPtr, ucharPtr, uintPtr]],
    PrintImage: [int, [intPtr, charPtr, int]]
});

module.exports = printer;