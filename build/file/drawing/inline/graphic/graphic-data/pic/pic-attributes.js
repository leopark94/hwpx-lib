import { XmlAttributeComponent } from "@file/xml-components";
export class PicAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                xmlns: "xmlns:pic",
            }
        });
    }
}
//# sourceMappingURL=pic-attributes.js.map