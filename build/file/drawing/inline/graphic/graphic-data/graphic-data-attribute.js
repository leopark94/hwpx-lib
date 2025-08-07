import { XmlAttributeComponent } from "@file/xml-components";
export class GraphicDataAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                uri: "uri",
            }
        });
    }
}
//# sourceMappingURL=graphic-data-attribute.js.map