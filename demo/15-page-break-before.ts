// Page break before example

import * as fs from "fs";
import { Document, Packer, Paragraph } from "hwpx";

const doc = new Document({
    sections: [
        {
            children: [
                new Paragraph("Hello World"),
                new Paragraph({
                    text: "Hello World on another page",
                    pageBreakBefore: true,
                }),
            ],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("demo/15-page-break-before.hwpx", buffer);
    console.log("✅ HWPX 파일 생성 완료: demo/15-page-break-before.hwpx");
});
