import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
class WrapTopAndBottomAttributes extends XmlAttributeComponent {
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
export class WrapTopAndBottom extends XmlComponent {
    constructor(margins = {
        top: 0,
        bottom: 0,
    }) {
        super("wp:wrapTopAndBottom");
        this.root.push(new WrapTopAndBottomAttributes({
            distT: margins.top,
            distB: margins.bottom,
        }));
    }
}
//# sourceMappingURL=wrap-top-and-bottom.js.map