var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import JSZip from "jszip";
import { traverse } from "./traverser";
import { toJson } from "./util";
export const patchDetector = ({ data }) => __awaiter(void 0, void 0, void 0, function* () {
    const zipContent = data instanceof JSZip ? data : yield JSZip.loadAsync(data);
    const patches = new Set();
    for (const [key, value] of Object.entries(zipContent.files)) {
        if (!key.endsWith(".xml") && !key.endsWith(".rels")) {
            continue;
        }
        if (key.startsWith("word/") && !key.endsWith(".xml.rels")) {
            const json = toJson(yield value.async("text"));
            traverse(json).forEach((p) => findPatchKeys(p.text).forEach((patch) => patches.add(patch)));
        }
    }
    return Array.from(patches);
});
const findPatchKeys = (text) => {
    var _a;
    const pattern = /(?<=\{\{).+?(?=\}\})/gs;
    return (_a = text.match(pattern)) !== null && _a !== void 0 ? _a : [];
};
//# sourceMappingURL=patch-detector.js.map