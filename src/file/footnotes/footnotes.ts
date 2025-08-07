import { XmlComponent } from "@file/xml-components";

import { LineRuleType, Paragraph } from "../paragraph";
import { Footnote, FootnoteType } from "./footnote/footnote";
import { ContinuationSeperatorRun } from "./footnote/run/continuation-seperator-run";
import { SeperatorRun } from "./footnote/run/seperator-run";
import { FootnotesAttributes } from "./footnotes-attributes";

export class FootNotes extends XmlComponent {
    public constructor() {
        // HWPX에서는 footnoteShape로 처리
        super("hh:footnoteShape");

        // HWPX 각주 속성 설정
        this.root.push(
            new FootnotesAttributes({
                id: "0",
                type: "footnote",
            }),
        );

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

    public createFootNote(id: number, paragraph: readonly Paragraph[]): void {
        const footnote = new Footnote({
            id: id,
            children: paragraph,
        });

        this.root.push(footnote);
    }
}
