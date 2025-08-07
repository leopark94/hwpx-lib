import { XmlAttributeComponent } from "@file/xml-components";
export class AppPropertiesAttributes extends XmlAttributeComponent {
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
//# sourceMappingURL=app-properties-attributes.js.map