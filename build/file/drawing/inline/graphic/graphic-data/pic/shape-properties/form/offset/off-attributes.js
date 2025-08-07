import { XmlAttributeComponent } from "@file/xml-components";
export class OffsetAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                x: "x",
                y: "y",
            }
        });
    }
}
//# sourceMappingURL=off-attributes.js.map