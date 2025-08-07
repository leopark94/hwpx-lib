import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
class MathDegreeHideAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { hide: "m:val" }
        });
    }
}
export class MathDegreeHide extends XmlComponent {
    constructor() {
        super("m:degHide");
        this.root.push(new MathDegreeHideAttributes({ hide: 1 }));
    }
}
//# sourceMappingURL=math-degree-hide.js.map