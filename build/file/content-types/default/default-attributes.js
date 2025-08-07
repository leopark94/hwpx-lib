import { XmlAttributeComponent } from "@file/xml-components";
export class DefaultAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                contentType: "ContentType",
                extension: "Extension",
            }
        });
    }
}
//# sourceMappingURL=default-attributes.js.map