import { XmlAttributeComponent } from "@file/xml-components";
export class PresetGeometryAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                prst: "prst",
            }
        });
    }
}
//# sourceMappingURL=preset-geometry-attributes.js.map