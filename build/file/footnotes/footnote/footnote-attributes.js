import { XmlAttributeComponent } from "@file/xml-components";
export class FootnoteAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                type: "hp:type",
                id: "hp:id",
            }
        });
    }
}
//# sourceMappingURL=footnote-attributes.js.map