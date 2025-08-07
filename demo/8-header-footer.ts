// Add text to header and footer

import * as fs from "fs";
import { Document, Footer, Header, Packer, Paragraph } from "hwpx";

const doc = new Document({
    sections: [
        {
            headers: {
                default: new Header({
                    children: [new Paragraph("Header text")],
                }),
            },
            footers: {
                default: new Footer({
                    children: [new Paragraph("Footer text")],
                }),
            },
            children: [new Paragraph("Hello World")],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("demo/8-header-footer.hwpx", buffer);
    console.log("✅ HWPX 파일 생성 완료: demo/8-header-footer.hwpx");
});
