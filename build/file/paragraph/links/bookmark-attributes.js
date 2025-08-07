import { XmlAttributeComponent } from "@file/xml-components";
export class BookmarkStartAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                id: "hp:id",
                name: "hh:name",
            }
        });
    }
}
export class BookmarkEndAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                id: "hp:id",
            }
        });
    }
}
//# sourceMappingURL=bookmark-attributes.js.map