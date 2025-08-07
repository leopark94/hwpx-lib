import { XmlAttributeComponent } from "@file/xml-components";
export class PicLocksAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                noChangeAspect: "noChangeAspect",
                noChangeArrowheads: "noChangeArrowheads",
            }
        });
    }
}
//# sourceMappingURL=pic-locks-attributes.js.map