// Add image to table cell

import * as fs from "fs";
import { Document, ImageRun, Packer, Paragraph, Table, TableCell, TableRow } from "hwpx";

const doc = new Document({
    sections: [
        {
            children: [
                new Table({
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
                                new TableCell({
                                    children: [new Paragraph("Hello")],
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
                                new TableCell({
                                    children: [],
                                }),
                                new TableCell({
                                    children: [],
                                }),
                            ],
                        }),
                    ],
                }),
            ],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("demo/24-images-to-table-cell.hwpx", buffer);
    console.log("✅ HWPX 파일 생성 완료: demo/24-images-to-table-cell.hwpx");
});
