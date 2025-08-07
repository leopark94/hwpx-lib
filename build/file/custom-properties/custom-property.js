import { XmlComponent } from "@file/xml-components";
import { CustomPropertyAttributes } from "./custom-property-attributes";
export class CustomProperty extends XmlComponent {
    constructor(id, properties) {
        super("property");
        this.root.push(new CustomPropertyAttributes({
            fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
            pid: id.toString(),
            name: properties.name,
        }));
        this.root.push(new CustomPropertyValue(properties.value));
    }
}
export class CustomPropertyValue extends XmlComponent {
    constructor(value) {
        super("vt:lpwstr");
        this.root.push(value);
    }
}
//# sourceMappingURL=custom-property.js.map