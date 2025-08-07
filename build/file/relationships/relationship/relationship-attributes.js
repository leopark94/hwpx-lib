import { XmlAttributeComponent } from "@file/xml-components";
export class RelationshipAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                id: "Id",
                type: "Type",
                target: "Target",
                targetMode: "TargetMode",
            }
        });
    }
}
//# sourceMappingURL=relationship-attributes.js.map