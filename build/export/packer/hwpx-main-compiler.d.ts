import JSZip from "jszip";
import { IXmlifyedFile } from "./next-compiler";
import { PrettifyType } from "./packer";
import { File } from "@file/file";
import { HwpxCompilerBase } from "./hwpx-compiler-base";
export declare class HwpxMainCompiler extends HwpxCompilerBase {
    constructor();
    compile(file: File, prettifyType?: (typeof PrettifyType)[keyof typeof PrettifyType], overrides?: readonly IXmlifyedFile[]): JSZip;
}
