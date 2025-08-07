// Generate a template document

import * as fs from "fs";
import { Document, Packer, Paragraph, TextRun } from "hwpx";

const doc = new Document({
    sections: [
        {
            children: [
                new Paragraph({
                    children: [new TextRun("{{template}}")],
                }),
            ],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("demo/86-generate-template.hwpx", buffer);
    console.log("✅ HWPX 파일 생성 완료: demo/86-generate-template.hwpx");
});
