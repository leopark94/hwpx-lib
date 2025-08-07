import { XmlAttributeComponent } from "@file/xml-components";
export class ContentTypeAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                xmlns: "xmlns",
            }
        });
    }
}
//# sourceMappingURL=content-types-attributes.js.map