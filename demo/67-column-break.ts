// Section with 2 columns including a column break

import * as fs from "fs";
import { Document, Packer, Paragraph, ColumnBreak, TextRun } from "hwpx";

const doc = new Document({
    sections: [
        {
            properties: {
                column: {
                    space: 708,
                    count: 2,
                },
            },
            children: [
                new Paragraph({
                    children: [
                        new TextRun("This text will be in the first column."),
                        new ColumnBreak(),
                        new TextRun("This text will be in the second column."),
                    ],
                }),
            ],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("demo/67-column-break.hwpx", buffer);
    console.log("✅ HWPX 파일 생성 완료: demo/67-column-break.hwpx");
});
