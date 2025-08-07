import { XmlAttributeComponent } from "@file/xml-components";
export class TextAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { space: "xml:space" }
        });
    }
}
//# sourceMappingURL=text-attributes.js.map