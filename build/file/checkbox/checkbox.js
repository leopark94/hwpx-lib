import { SymbolRun } from "@file/paragraph/run/symbol-run";
import { StructuredDocumentTagContent } from "@file/table-of-contents/sdt-content";
import { StructuredDocumentTagProperties } from "@file/table-of-contents/sdt-properties";
import { XmlComponent } from "@file/xml-components";
import { CheckBoxUtil } from "./checkbox-util";
export class CheckBox extends XmlComponent {
    constructor(options) {
        var _a, _b, _c, _d;
        super("hp:ctrl");
        Object.defineProperty(this, "DEFAULT_UNCHECKED_SYMBOL", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "2610"
        });
        Object.defineProperty(this, "DEFAULT_CHECKED_SYMBOL", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "2612"
        });
        Object.defineProperty(this, "DEFAULT_FONT", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "MS Gothic"
        });
        const properties = new StructuredDocumentTagProperties(options === null || options === void 0 ? void 0 : options.alias);
        properties.addChildElement(new CheckBoxUtil(options));
        this.root.push(properties);
        const content = new StructuredDocumentTagContent();
        const checkedFont = (_a = options === null || options === void 0 ? void 0 : options.checkedState) === null || _a === void 0 ? void 0 : _a.font;
        const checkedText = (_b = options === null || options === void 0 ? void 0 : options.checkedState) === null || _b === void 0 ? void 0 : _b.value;
        const uncheckedFont = (_c = options === null || options === void 0 ? void 0 : options.uncheckedState) === null || _c === void 0 ? void 0 : _c.font;
        const uncheckedText = (_d = options === null || options === void 0 ? void 0 : options.uncheckedState) === null || _d === void 0 ? void 0 : _d.value;
        let symbolFont;
        let char;
        if (options === null || options === void 0 ? void 0 : options.checked) {
            symbolFont = checkedFont ? checkedFont : this.DEFAULT_FONT;
            char = checkedText ? checkedText : this.DEFAULT_CHECKED_SYMBOL;
        }
        else {
            symbolFont = uncheckedFont ? uncheckedFont : this.DEFAULT_FONT;
            char = uncheckedText ? uncheckedText : this.DEFAULT_UNCHECKED_SYMBOL;
        }
        const initialRenderedChar = new SymbolRun({
            char: char,
            symbolfont: symbolFont,
        });
        content.addChildElement(initialRenderedChar);
        this.root.push(content);
    }
}
//# sourceMappingURL=checkbox.js.map