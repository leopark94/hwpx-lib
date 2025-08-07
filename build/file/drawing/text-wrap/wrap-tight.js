import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
class WrapTightAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                distT: "distT",
                distB: "distB",
            }
        });
    }
}
export class WrapTight extends XmlComponent {
    constructor(margins = {
        top: 0,
        bottom: 0,
    }) {
        super("wp:wrapTight");
        this.root.push(new WrapTightAttributes({
            distT: margins.top,
            distB: margins.bottom,
        }));
    }
}
//# sourceMappingURL=wrap-tight.js.map