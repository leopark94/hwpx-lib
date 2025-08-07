import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
export const SectionType = {
    NEXT_PAGE: "nextPage",
    NEXT_COLUMN: "nextColumn",
    CONTINUOUS: "continuous",
    EVEN_PAGE: "evenPage",
    ODD_PAGE: "oddPage",
};
export class SectionTypeAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                val: "hp:val",
            }
        });
    }
}
export class Type extends XmlComponent {
    constructor(value) {
        super("hs:type");
        this.root.push(new SectionTypeAttributes({ val: value }));
    }
}
//# sourceMappingURL=section-type.js.map