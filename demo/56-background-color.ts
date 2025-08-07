// Change background colour of whole document

import * as fs from "fs";
import { Document, Packer, Paragraph, Tab, TextRun } from "hwpx";

const doc = new Document({
    background: {
        color: "C45911",
    },
    sections: [
        {
            properties: {},
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
    fs.writeFileSync("demo/56-background-color.hwpx", buffer);
    console.log("✅ HWPX 파일 생성 완료: demo/56-background-color.hwpx");
});
