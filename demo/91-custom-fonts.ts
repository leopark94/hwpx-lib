// Simple example to add text to a document

import * as fs from "fs";
import { CharacterSet, Document, Packer, Paragraph, Tab, TextRun } from "hwpx";

const font = fs.readFileSync("./demo/assets/Pacifico.ttf");

const doc = new Document({
    sections: [
        {
            properties: {},
            children: [
                new Paragraph({
                    run: {
                        font: "Pacifico",
                    },
                    children: [
                        new TextRun("Hello World"),
                        new TextRun({
                            text: "Foo Bar",
                            bold: true,
                            size: 40,
                            font: "Pacifico",
                        }),
                        new TextRun({
                            children: [new Tab(), "Github is the best"],
                            bold: true,
                            font: "Pacifico",
                        }),
                    ],
                }),
            ],
        },
    ],
    fonts: [{ name: "Pacifico", data: font, characterSet: CharacterSet.ANSI }],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("demo/91-custom-fonts.hwpx", buffer);
    console.log("✅ HWPX 파일 생성 완료: demo/91-custom-fonts.hwpx");
});
