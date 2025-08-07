import { XmlComponent } from "@file/xml-components";
import { CustomPropertiesAttributes } from "./custom-properties-attributes";
import { CustomProperty } from "./custom-property";
export class CustomProperties extends XmlComponent {
    constructor(properties) {
        super("Properties");
        Object.defineProperty(this, "nextId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "properties", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        this.root.push(new CustomPropertiesAttributes({
            xmlns: "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
            vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes",
        }));
        this.nextId = 2;
        for (const property of properties) {
            this.addCustomProperty(property);
        }
    }
    prepForXml(context) {
        this.properties.forEach((x) => this.root.push(x));
        return super.prepForXml(context);
    }
    addCustomProperty(property) {
        this.properties.push(new CustomProperty(this.nextId++, property));
    }
}
//# sourceMappingURL=custom-properties.js.map