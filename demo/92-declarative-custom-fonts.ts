// Simple example to add text to a document

import * as fs from "fs";
import { Document, Packer, Paragraph, Tab, TextRun } from "hwpx";

const font = fs.readFileSync("./demo/assets/Pacifico.ttf");

const doc = new Document({
    styles: {
        default: {
            document: {
                run: {
                    font: "Pacifico",
                },
            },
        },
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
                            size: 40,
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
    fonts: [{ name: "Pacifico", data: font, characterSet: "00" }],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("demo/92-declarative-custom-fonts.hwpx", buffer);
    console.log("✅ HWPX 파일 생성 완료: demo/92-declarative-custom-fonts.hwpx");
});
