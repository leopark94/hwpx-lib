// Example on how to preserve word wrap text. Works with all languages.

import * as fs from "fs";
import { Document, Packer, Paragraph, TextRun } from "hwpx";

const doc = new Document({
    sections: [
        {
            children: [
                new Paragraph({
                    wordWrap: true,
                    children: [
                        new TextRun("我今天遛狗去公园"),
                        new TextRun({
                            text: "456435234523456435564745673456345456435234523456435564745673456345456435234523456435564745673456345456435234523456435564745673456345456435234523456435564745673456345",
                        }),
                    ],
                }),
                new Paragraph({
                    wordWrap: true,
                    children: [
                        new TextRun(
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                        ),
                        new TextRun({
                            text: "456435234523456435564745673456345456435234523456435564745673456345456435234523456435564745673456345456435234523456435564745673456345456435234523456435564745673456345",
                        }),
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun("我今天遛狗去公园"),
                        new TextRun({
                            text: "456435234523456435564745673456345456435234523456435564745673456345456435234523456435564745673456345456435234523456435564745673456345456435234523456435564745673456345",
                        }),
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun(
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                        ),
                        new TextRun({
                            text: "456435234523456435564745673456345456435234523456435564745673456345456435234523456435564745673456345456435234523456435564745673456345456435234523456435564745673456345",
                        }),
                    ],
                }),
            ],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("demo/72-word-wrap.hwpx", buffer);
    console.log("✅ HWPX 파일 생성 완료: demo/72-word-wrap.hwpx");
});
