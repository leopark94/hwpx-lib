import { XmlAttributeComponent } from "@file/xml-components";
export class HyperlinkAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                id: "r:id",
                history: "w:history",
                anchor: "w:anchor",
            }
        });
    }
}
//# sourceMappingURL=hyperlink-attributes.js.map