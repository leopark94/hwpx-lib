import { XmlAttributeComponent } from "@file/xml-components";
export class ExtentsAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                cx: "cx",
                cy: "cy",
            }
        });
    }
}
//# sourceMappingURL=extents-attributes.js.map