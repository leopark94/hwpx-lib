import { XmlAttributeComponent } from "@file/xml-components";
export class HeaderAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                type: "type",
                id: "id",
                width: "width",
                height: "height",
                textWrap: "textWrap",
                numberingRestartLocation: "numberingRestartLocation",
            }
        });
    }
}
//# sourceMappingURL=header-attributes.js.map