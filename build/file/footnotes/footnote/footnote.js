import { XmlComponent } from "@file/xml-components";
import { FootnoteAttributes } from "./footnote-attributes";
import { FootnoteRefRun } from "./run/footnote-ref-run";
export const FootnoteType = {
    SEPERATOR: "separator",
    CONTINUATION_SEPERATOR: "continuationSeparator",
};
export class Footnote extends XmlComponent {
    constructor(options) {
        super("hh:footnote");
        this.root.push(new FootnoteAttributes({
            type: options.type,
            id: options.id,
        }));
        for (let i = 0; i < options.children.length; i++) {
            const child = options.children[i];
            if (i === 0) {
                child.addRunToFront(new FootnoteRefRun());
            }
            this.root.push(child);
        }
    }
}
//# sourceMappingURL=footnote.js.map