var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { FileChild } from "@file/file-child";
import { ParagraphProperties } from "@file/paragraph";
import { uniqueId } from "@util/convenience-functions";
import { createPictElement } from "./pict-element/pict-element";
import { createShape } from "./shape/shape";
export class Textbox extends FileChild {
    constructor(_a) {
        var { style, children } = _a, rest = __rest(_a, ["style", "children"]);
        super("hp:p");
        this.root.push(new ParagraphProperties(rest));
        this.root.push(createPictElement({
            shape: createShape({
                children: children,
                id: uniqueId(),
                style: style,
            }),
        }));
    }
}
//# sourceMappingURL=textbox.js.map