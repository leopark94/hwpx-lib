import { XmlAttributeComponent } from "@file/xml-components";
export class CustomPropertyAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                fmtid: "fmtid",
                pid: "pid",
                name: "name",
            }
        });
    }
}
//# sourceMappingURL=custom-property-attributes.js.map