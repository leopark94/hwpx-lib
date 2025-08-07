import { Run } from "@file/paragraph/run";
import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
export class FootNoteReferenceRunAttributes extends XmlAttributeComponent {
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
export class FootnoteReference extends XmlComponent {
    constructor(id) {
        super("hp:footnoteRef");
        this.root.push(new FootNoteReferenceRunAttributes({
            id: id,
        }));
    }
}
export class FootnoteReferenceRun extends Run {
    constructor(id) {
        super({ style: "FootnoteReference" });
        this.root.push(new FootnoteReference(id));
    }
}
//# sourceMappingURL=reference-run.js.map