import { XmlAttributeComponent } from "@file/xml-components";
export class FootnotesAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                id: "id",
                type: "type",
                place: "place",
                beneathText: "beneathText",
                suffix: "suffix",
                numFormat: "numFormat",
            }
        });
    }
}
//# sourceMappingURL=footnotes-attributes.js.map