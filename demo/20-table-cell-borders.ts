// Add custom borders to table cell

import * as fs from "fs";
import { BorderStyle, Document, Packer, Paragraph, Table, TableCell, TableRow } from "hwpx";

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
                                    children: [new Paragraph("Hello")],
                                    borders: {
                                        top: {
                                            style: BorderStyle.DASH_DOT_STROKED,
                                            size: 3,
                                            color: "FF0000",
                                        },
                                        bottom: {
                                            style: BorderStyle.DOUBLE,
                                            size: 3,
                                            color: "0000FF",
                                        },
                                        left: {
                                            style: BorderStyle.DASH_DOT_STROKED,
                                            size: 3,
                                            color: "00FF00",
                                        },
                                        right: {
                                            style: BorderStyle.DASH_DOT_STROKED,
                                            size: 3,
                                            color: "#ff8000",
                                        },
                                    },
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
    fs.writeFileSync("demo/20-table-cell-borders.hwpx", buffer);
    console.log("✅ HWPX 파일 생성 완료: demo/20-table-cell-borders.hwpx");
});
