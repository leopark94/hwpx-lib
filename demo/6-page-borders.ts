// Example of how to change page borders

import * as fs from "fs";
import { Document, HeadingLevel, Packer, Paragraph, Tab, TextRun } from "hwpx";

const doc = new Document({
    sections: [
        {
            properties: {
                page: {
                    margin: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                    },
                },
            },
            children: [
                new Paragraph({
                    children: [
                        new TextRun("Hello World"),
                        new TextRun({
                            text: "Foo bar",
                            bold: true,
                        }),
                        new TextRun({
                            children: [new Tab(), "Github is the best"],
                            bold: true,
                        }),
                    ],
                }),
                new Paragraph({
                    text: "Hello World",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph("Foo bar"),
                new Paragraph("Github is the best"),
            ],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("demo/6-page-borders.hwpx", buffer);
    console.log("✅ HWPX 파일 생성 완료: demo/6-page-borders.hwpx");
});
