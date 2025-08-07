import { XmlAttributeComponent } from "@file/xml-components";
export class NonVisualPropertiesAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                id: "id",
                name: "name",
                descr: "descr",
            }
        });
    }
}
//# sourceMappingURL=non-visual-properties-attributes.js.map