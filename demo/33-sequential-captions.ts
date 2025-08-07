// Sequential Captions

import * as fs from "fs";
import { Document, Packer, Paragraph, SequentialIdentifier, TextRun } from "hwpx";

const doc = new Document({
    sections: [
        {
            children: [
                new Paragraph({
                    children: [
                        new TextRun("Hello World 1->"),
                        new SequentialIdentifier("Caption"),
                        new TextRun(" text after sequencial caption 2->"),
                        new SequentialIdentifier("Caption"),
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun("Hello World 1->"),
                        new SequentialIdentifier("Label"),
                        new TextRun(" text after sequencial caption 2->"),
                        new SequentialIdentifier("Label"),
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun("Hello World 1->"),
                        new SequentialIdentifier("Another"),
                        new TextRun(" text after sequencial caption 3->"),
                        new SequentialIdentifier("Label"),
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun("Hello World 2->"),
                        new SequentialIdentifier("Another"),
                        new TextRun(" text after sequencial caption 4->"),
                        new SequentialIdentifier("Label"),
                    ],
                }),
            ],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("demo/33-sequential-captions.hwpx", buffer);
    console.log("✅ HWPX 파일 생성 완료: demo/33-sequential-captions.hwpx");
});
