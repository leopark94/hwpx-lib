import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
export const HeaderFooterReferenceType = {
    DEFAULT: "default",
    FIRST: "first",
    EVEN: "even",
};
class FooterReferenceAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                type: "hp:type",
                id: "r:id",
            }
        });
    }
}
export const HeaderFooterType = {
    HEADER: "hs:headerReference",
    FOOTER: "hs:footerReference",
};
export class HeaderFooterReference extends XmlComponent {
    constructor(type, options) {
        super(type);
        this.root.push(new FooterReferenceAttributes({
            type: options.type || HeaderFooterReferenceType.DEFAULT,
            id: `rId${options.id}`,
        }));
    }
}
//# sourceMappingURL=header-footer-reference.js.map