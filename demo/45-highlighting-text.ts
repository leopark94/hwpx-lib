// Highlighting text

import * as fs from "fs";
import { AlignmentType, Document, Header, Packer, Paragraph, TextRun } from "hwpx";

const doc = new Document({
    sections: [
        {
            headers: {
                default: new Header({
                    children: [
                        new Paragraph({
                            alignment: AlignmentType.RIGHT,
                            children: [
                                new TextRun({
                                    text: "Hello World",
                                    color: "FF0000",
                                    bold: true,
                                    size: 24,
                                    font: {
                                        name: "Garamond",
                                    },
                                    highlight: "yellow",
                                }),
                            ],
                        }),
                    ],
                }),
            },
            children: [],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("demo/45-highlighting-text.hwpx", buffer);
    console.log("✅ HWPX 파일 생성 완료: demo/45-highlighting-text.hwpx");
});
