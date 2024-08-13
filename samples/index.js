const sdk = require('node-xprinter-sdk');


printer = sdk.InitPrinter("");

sdk.OpenPort(printer, ["USB:"]);

sdk.WriteData(printer, "Hello, World!", 13);

sdk.ClosePort(printer);

sdk.ReleasePrinter(printer);
