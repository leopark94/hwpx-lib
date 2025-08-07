import { XmlAttributeComponent } from "@file/xml-components";
export class GraphicFrameLockAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                xmlns: "xmlns:a",
                noChangeAspect: "noChangeAspect",
            }
        });
    }
}
//# sourceMappingURL=graphic-frame-lock-attributes.js.map