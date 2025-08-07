// Example of making content of section vertically aligned

import * as fs from "fs";
import { Document, Packer, Paragraph, VerticalAlignSection, TextRun, Tab } from "hwpx";

const doc = new Document({
    sections: [
        {
            properties: {
                verticalAlign: VerticalAlignSection.CENTER,
            },
            children: [
                new Paragraph({
                    children: [
                        new TextRun("Hello World"),
                        new TextRun({
                            text: "Foo Bar",
                            bold: true,
                        }),
                        new TextRun({
                            children: [new Tab(), "Github is the best"],
                            bold: true,
                        }),
                    ],
                }),
            ],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("demo/48-vertical-align.hwpx", buffer);
    console.log("✅ HWPX 파일 생성 완료: demo/48-vertical-align.hwpx");
});
