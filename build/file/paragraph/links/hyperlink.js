import { XmlComponent } from "@file/xml-components";
import { uniqueId } from "@util/convenience-functions";
import { HyperlinkAttributes } from "./hyperlink-attributes";
export const HyperlinkType = {
    INTERNAL: "INTERNAL",
    EXTERNAL: "EXTERNAL",
};
export class ConcreteHyperlink extends XmlComponent {
    constructor(children, relationshipId, anchor) {
        super("hp:hyperlink");
        Object.defineProperty(this, "linkId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.linkId = relationshipId;
        const props = {
            history: 1,
            anchor: anchor ? anchor : undefined,
            id: !anchor ? `rId${this.linkId}` : undefined,
        };
        const attributes = new HyperlinkAttributes(props);
        this.root.push(attributes);
        children.forEach((child) => {
            this.root.push(child);
        });
    }
}
export class InternalHyperlink extends ConcreteHyperlink {
    constructor(options) {
        super(options.children, uniqueId(), options.anchor);
    }
}
export class ExternalHyperlink extends XmlComponent {
    constructor(options) {
        super("w:externalHyperlink");
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
    }
}
//# sourceMappingURL=hyperlink.js.map