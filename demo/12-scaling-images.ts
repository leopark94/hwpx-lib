// Scaling images

import * as fs from "fs";
import { Document, ImageRun, Packer, Paragraph } from "hwpx";

const doc = new Document({
    sections: [
        {
            children: [
                new Paragraph("Hello World"),
                new Paragraph({
                    children: [
                        new ImageRun({
                            data: fs.readFileSync("./demo/images/pizza.gif"),
                            transformation: {
                                width: 50,
                                height: 50,
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
                            data: fs.readFileSync("./demo/images/pizza.gif"),
                            transformation: {
                                width: 250,
                                height: 250,
                            },
                        }),
                    ],
                }),
                new Paragraph({
                    children: [
                        new ImageRun({
                            data: fs.readFileSync("./demo/images/pizza.gif"),
                            transformation: {
                                width: 400,
                                height: 400,
                            },
                        }),
                    ],
                }),
            ],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("demo/12-scaling-images.hwpx", buffer);
    console.log("✅ HWPX 파일 생성 완료: demo/12-scaling-images.hwpx");
});
