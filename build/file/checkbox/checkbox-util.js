import { CheckBoxSymbolElement } from "@file/checkbox/checkbox-symbol";
import { XmlComponent } from "@file/xml-components";
export class CheckBoxUtil extends XmlComponent {
    constructor(options) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        super("hp:checkbox");
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
        const value = (options === null || options === void 0 ? void 0 : options.checked) ? "1" : "0";
        let symbol;
        let font;
        this.root.push(new CheckBoxSymbolElement("hp:checked", value));
        symbol = ((_a = options === null || options === void 0 ? void 0 : options.checkedState) === null || _a === void 0 ? void 0 : _a.value) ? (_b = options === null || options === void 0 ? void 0 : options.checkedState) === null || _b === void 0 ? void 0 : _b.value : this.DEFAULT_CHECKED_SYMBOL;
        font = ((_c = options === null || options === void 0 ? void 0 : options.checkedState) === null || _c === void 0 ? void 0 : _c.font) ? (_d = options === null || options === void 0 ? void 0 : options.checkedState) === null || _d === void 0 ? void 0 : _d.font : this.DEFAULT_FONT;
        this.root.push(new CheckBoxSymbolElement("hp:checkedState", symbol, font));
        symbol = ((_e = options === null || options === void 0 ? void 0 : options.uncheckedState) === null || _e === void 0 ? void 0 : _e.value) ? (_f = options === null || options === void 0 ? void 0 : options.uncheckedState) === null || _f === void 0 ? void 0 : _f.value : this.DEFAULT_UNCHECKED_SYMBOL;
        font = ((_g = options === null || options === void 0 ? void 0 : options.uncheckedState) === null || _g === void 0 ? void 0 : _g.font) ? (_h = options === null || options === void 0 ? void 0 : options.uncheckedState) === null || _h === void 0 ? void 0 : _h.font : this.DEFAULT_FONT;
        this.root.push(new CheckBoxSymbolElement("hp:uncheckedState", symbol, font));
    }
}
//# sourceMappingURL=checkbox-util.js.map