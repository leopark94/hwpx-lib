import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
class RunFontAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                ascii: "w:ascii",
                cs: "w:cs",
                eastAsia: "w:eastAsia",
                hAnsi: "w:hAnsi",
                hint: "w:hint",
                hangul: "hangul",
                latin: "latin",
                hanja: "hanja",
                japanese: "japanese",
                other: "other",
                symbol: "symbol",
                user: "user",
            }
        });
    }
}
export class RunFonts extends XmlComponent {
    constructor(nameOrAttrs, hint) {
        super("hh:fontRef");
        if (typeof nameOrAttrs === "string") {
            const name = nameOrAttrs;
            this.root.push(new RunFontAttributes({
                hangul: "1",
                latin: "1",
                hanja: "1",
                japanese: "1",
                other: "1",
                symbol: "1",
                user: "1",
            }));
        }
        else {
            const attrs = nameOrAttrs;
            this.root.push(new RunFontAttributes(attrs));
        }
    }
}
//# sourceMappingURL=run-fonts.js.map