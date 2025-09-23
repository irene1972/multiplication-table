"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
let outputMessage = '';
const base = 5;
const headerMessage = `
---------------------------------
        Tabla del ${base}
---------------------------------\n
`;
for (let i = 1; i <= 10; i++) {
    outputMessage += `${base} * ${i}= ${base * i}\n`;
}
outputMessage = headerMessage + outputMessage;
//console.log(outputMessage);
const outputPath = `outputs`;
fs_1.default.mkdirSync(outputPath, { recursive: true });
fs_1.default.writeFileSync(`${outputPath}/tabla-${base}.txt`, outputMessage);
console.log('File created');
