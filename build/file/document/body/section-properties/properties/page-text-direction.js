import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
export const PageTextDirectionType = {
    LEFT_TO_RIGHT_TOP_TO_BOTTOM: "lrTb",
    TOP_TO_BOTTOM_RIGHT_TO_LEFT: "tbRl",
};
class PageTextDirectionAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { val: "hp:val" }
        });
    }
}
export class PageTextDirection extends XmlComponent {
    constructor(value) {
        super("hs:textDirection");
        this.root.push(new PageTextDirectionAttributes({
            val: value,
        }));
    }
}
//# sourceMappingURL=page-text-direction.js.map