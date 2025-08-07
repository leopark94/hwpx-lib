import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
import { shortHexNumber } from "@util/values";
class CheckboxSymbolAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                val: "w14:val",
                symbolfont: "w14:font",
            }
        });
    }
}
export class CheckBoxSymbolElement extends XmlComponent {
    constructor(name, val, font) {
        super(name);
        if (font) {
            this.root.push(new CheckboxSymbolAttributes({ val: shortHexNumber(val), symbolfont: font }));
        }
        else {
            this.root.push(new CheckboxSymbolAttributes({ val }));
        }
    }
}
//# sourceMappingURL=checkbox-symbol.js.map