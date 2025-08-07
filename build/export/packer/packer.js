var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Stream } from "stream";
import { HwpxTemplateCompiler } from "./hwpx-template-compiler";
export const PrettifyType = {
    NONE: "",
    WITH_2_BLANKS: "  ",
    WITH_4_BLANKS: "    ",
    WITH_TAB: "\t",
};
const convertPrettifyType = (prettify) => prettify === true ? PrettifyType.WITH_2_BLANKS : prettify === false ? undefined : prettify;
export class Packer {
    static pack(file, type, prettify, overrides = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const zip = yield this.compiler.compile(file);
            return zip.generateAsync({
                type,
                mimeType: "application/hwp+zip",
                compression: "DEFLATE",
            });
        });
    }
    static toString(file, prettify, overrides = []) {
        return Packer.pack(file, "string", prettify, overrides);
    }
    static toBuffer(file, prettify, overrides = []) {
        return Packer.pack(file, "nodebuffer", prettify, overrides);
    }
    static toBase64String(file, prettify, overrides = []) {
        return Packer.pack(file, "base64", prettify, overrides);
    }
    static toBlob(file, prettify, overrides = []) {
        return Packer.pack(file, "blob", prettify, overrides);
    }
    static toArrayBuffer(file, prettify, overrides = []) {
        return Packer.pack(file, "arraybuffer", prettify, overrides);
    }
    static toStream(file, prettify, overrides = []) {
        const stream = new Stream();
        this.compiler.compile(file).then(zip => {
            zip.generateAsync({
                type: "nodebuffer",
                mimeType: "application/hwp+zip",
                compression: "DEFLATE",
            }).then((z) => {
                stream.emit("data", z);
                stream.emit("end");
            });
        });
        return stream;
    }
}
Object.defineProperty(Packer, "compiler", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: new HwpxTemplateCompiler()
});
//# sourceMappingURL=packer.js.map