// Add images to header and footer

import * as fs from "fs";
import { Document, Header, ImageRun, Packer, Paragraph } from "hwpx";

const doc = new Document({
    sections: [
        {
            headers: {
                default: new Header({
                    children: [
                        new Paragraph({
                            children: [
                                new ImageRun({
                                    data: fs.readFileSync("./demo/images/image1.jpeg"),
                                    transformation: {
                                        width: 100,
                                        height: 100,
                                    },
                                }),
                            ],
                        }),
                        new Paragraph({
                            children: [
                                new ImageRun({
                                    data: fs.readFileSync("./demo/images/pizza.gif"),
                                    transformation: {
                                        width: 100,
                                        height: 100,
                                    },
                                }),
                            ],
                        }),
                        new Paragraph({
                            children: [
                                new ImageRun({
                                    data: fs.readFileSync("./demo/images/image1.jpeg"),
                                    transformation: {
                                        width: 100,
                                        height: 100,
                                    },
                                }),
                            ],
                        }),
                    ],
                }),
            },
            children: [new Paragraph("Hello World")],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("demo/37-images-to-header-and-footer.hwpx", buffer);
    console.log("✅ HWPX 파일 생성 완료: demo/37-images-to-header-and-footer.hwpx");
});
