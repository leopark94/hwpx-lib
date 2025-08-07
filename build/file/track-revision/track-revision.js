import { XmlAttributeComponent } from "@file/xml-components";
export class ChangeAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                id: "hp:id",
                author: "hp:author",
                date: "hp:date",
            }
        });
    }
}
//# sourceMappingURL=track-revision.js.map