import { XmlAttributeComponent } from "@file/xml-components";
export class ShapePropertiesAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                bwMode: "bwMode",
            }
        });
    }
}
//# sourceMappingURL=shape-properties-attributes.js.map