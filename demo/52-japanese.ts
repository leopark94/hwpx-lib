// Japanese text - Need to use a Japanese font

import * as fs from "fs";
import { Document, HeadingLevel, Packer, Paragraph } from "hwpx";

const doc = new Document({
    styles: {
        paragraphStyles: [
            {
                id: "Normal",
                name: "Normal",
                basedOn: "Normal",
                next: "Normal",
                quickFormat: true,
                run: {
                    font: "MS Gothic",
                },
            },
        ],
    },
    sections: [
        {
            children: [
                new Paragraph({
                    text: "KFCを食べるのが好き",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    text: "こんにちは",
                }),
            ],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("demo/52-japanese.hwpx", buffer);
    console.log("✅ HWPX 파일 생성 완료: demo/52-japanese.hwpx");
});
