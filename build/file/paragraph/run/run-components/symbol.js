import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
class SymbolAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                char: "w:char",
                symbolfont: "hh:font",
            }
        });
    }
}
export class Symbol extends XmlComponent {
    constructor(char = "", symbolfont = "Wingdings") {
        super("w:sym");
        this.root.push(new SymbolAttributes({ char: char, symbolfont: symbolfont }));
    }
}
//# sourceMappingURL=symbol.js.map