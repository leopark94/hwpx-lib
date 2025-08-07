import { XmlAttributeComponent } from "@file/xml-components";
export class CustomPropertiesAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                xmlns: "xmlns",
                vt: "xmlns:vt",
            }
        });
    }
}
//# sourceMappingURL=custom-properties-attributes.js.map