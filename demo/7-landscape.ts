// Example of how to set the document to landscape

import * as fs from "fs";
import { Document, Packer, PageOrientation, Paragraph } from "hwpx";

const doc = new Document({
    sections: [
        {
            properties: {
                page: {
                    size: {
                        orientation: PageOrientation.LANDSCAPE,
                    },
                },
            },
            children: [new Paragraph("Hello World")],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("demo/7-landscape.hwpx", buffer);
    console.log("✅ HWPX 파일 생성 완료: demo/7-landscape.hwpx");
});
