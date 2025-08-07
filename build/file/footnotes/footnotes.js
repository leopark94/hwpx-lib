import { XmlComponent } from "@file/xml-components";
import { LineRuleType, Paragraph } from "../paragraph";
import { Footnote, FootnoteType } from "./footnote/footnote";
import { ContinuationSeperatorRun } from "./footnote/run/continuation-seperator-run";
import { SeperatorRun } from "./footnote/run/seperator-run";
import { FootnotesAttributes } from "./footnotes-attributes";
export class FootNotes extends XmlComponent {
    constructor() {
        super("hh:footnoteShape");
        this.root.push(new FootnotesAttributes({
            id: "0",
            type: "footnote",
        }));
        const begin = new Footnote({
            id: -1,
            type: FootnoteType.SEPERATOR,
            children: [
                new Paragraph({
                    spacing: {
                        after: 0,
                        line: 240,
                        lineRule: LineRuleType.AUTO,
                    },
                    children: [new SeperatorRun()],
                }),
            ],
        });
        this.root.push(begin);
        const spacing = new Footnote({
            id: 0,
            type: FootnoteType.CONTINUATION_SEPERATOR,
            children: [
                new Paragraph({
                    spacing: {
                        after: 0,
                        line: 240,
                        lineRule: LineRuleType.AUTO,
                    },
                    children: [new ContinuationSeperatorRun()],
                }),
            ],
        });
        this.root.push(spacing);
    }
    createFootNote(id, paragraph) {
        const footnote = new Footnote({
            id: id,
            children: paragraph,
        });
        this.root.push(footnote);
    }
}
//# sourceMappingURL=footnotes.js.map