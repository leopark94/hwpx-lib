// Add image to table cell in a header and body

import * as fs from "fs";
import { Document, Packer, Paragraph, TextRun } from "hwpx";

const table = new Table({
    rows: [
        new TableRow({
            children: [
                new TableCell({
                    children: [],
                }),
                new TableCell({
                    children: [],
                }),
                new TableCell({
                    children: [],
                }),
                new TableCell({
                    children: [],
                }),
            ],
        }),
        new TableRow({
            children: [
                new TableCell({
                    children: [],
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun("[이미지]"),
                            ],
                        }),
                    ],
                }),
            ],
        }),
        new TableRow({
            children: [
                new TableCell({
                    children: [],
                }),
                new TableCell({
                    children: [],
                }),
            ],
        }),
        new TableRow({
            children: [
                new TableCell({
                    children: [],
                }),
                new TableCell({
                    children: [],
                }),
            ],
        }),
    ],
});

// Adding same table in the body and in the header
const doc = new Document({
    sections: [
        {
            headers: {
                default: new Header({
                    children: [table],
                }),
            },
            children: [table],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("demo/36-image-to-table-cell.hwpx", buffer);
    console.log("✅ HWPX 파일 생성 완료: demo/36-image-to-table-cell.hwpx");
});
