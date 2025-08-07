import { FileChild } from "@file/file-child";
import { Paragraph } from "@file/paragraph";
import { Run } from "@file/paragraph/run";
import { Begin, End, Separate } from "@file/paragraph/run/field";
import { FieldInstruction } from "./field-instruction";
import { StructuredDocumentTagContent } from "./sdt-content";
import { StructuredDocumentTagProperties } from "./sdt-properties";
export class TableOfContents extends FileChild {
    constructor(alias = "Table of Contents", properties) {
        super("hp:ctrl");
        this.root.push(new StructuredDocumentTagProperties(alias));
        const content = new StructuredDocumentTagContent();
        const beginParagraph = new Paragraph({
            children: [
                new Run({
                    children: [new Begin(true), new FieldInstruction(properties), new Separate()],
                }),
            ],
        });
        content.addChildElement(beginParagraph);
        const endParagraph = new Paragraph({
            children: [
                new Run({
                    children: [new End()],
                }),
            ],
        });
        content.addChildElement(endParagraph);
        this.root.push(content);
    }
}
//# sourceMappingURL=table-of-contents.js.map