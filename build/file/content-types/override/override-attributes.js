import { XmlAttributeComponent } from "@file/xml-components";
export class OverrideAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                contentType: "ContentType",
                partName: "PartName",
            }
        });
    }
}
//# sourceMappingURL=override-attributes.js.map