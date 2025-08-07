import { describe, expect, it } from "vitest";
import { Formatter } from "@export/formatter";
import { AlignmentType, Paragraph } from "../paragraph";
import { Table } from "./table";
import { TableCell } from "./table-cell";
import { RelativeHorizontalPosition, RelativeVerticalPosition, TableAnchorType } from "./table-properties";
import { TableLayoutType } from "./table-properties/table-layout";
import { TableRow } from "./table-row";
import { WidthType } from "./table-width";
const BORDERS = {
    "w:tblBorders": [
        { "hp:top": { _attr: { "hp:val": "single", "hp:sz": 4, "hp:color": "auto" } } },
        { "hp:left": { _attr: { "hp:val": "single", "hp:sz": 4, "hp:color": "auto" } } },
        { "hp:bottom": { _attr: { "hp:val": "single", "hp:sz": 4, "hp:color": "auto" } } },
        { "hp:right": { _attr: { "hp:val": "single", "hp:sz": 4, "hp:color": "auto" } } },
        { "w:insideH": { _attr: { "hp:val": "single", "hp:sz": 4, "hp:color": "auto" } } },
        { "w:insideV": { _attr: { "hp:val": "single", "hp:sz": 4, "hp:color": "auto" } } },
    ],
};
const WIDTHS = {
    "w:tblW": {
        _attr: {
            "hp:type": "auto",
            "hp:w": 100,
        },
    },
};
describe("Table", () => {
    describe("#constructor", () => {
        it("creates a table with the correct number of rows and columns", () => {
            const table = new Table({
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph("hello")],
                            }),
                            new TableCell({
                                children: [new Paragraph("hello")],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph("hello")],
                            }),
                            new TableCell({
                                children: [new Paragraph("hello")],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph("hello")],
                            }),
                            new TableCell({
                                children: [new Paragraph("hello")],
                            }),
                        ],
                    }),
                ],
            });
            const tree = new Formatter().format(table);
            const cell = {
                "hp:tc": [
                    {
                        "hp:p": [
                            {
                                "hp:run": [
                                    {
                                        "hp:t": [
                                            {
                                                _attr: {
                                                    "xml:space": "preserve",
                                                },
                                            },
                                            "hello",
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            };
            expect(tree).to.deep.equal({
                "hp:tbl": [
                    { "hp:tblPr": [WIDTHS, BORDERS] },
                    {
                        "w:tblGrid": [{ "w:gridCol": { _attr: { "hp:w": 100 } } }, { "w:gridCol": { _attr: { "hp:w": 100 } } }],
                    },
                    { "hp:tr": [cell, cell] },
                    { "hp:tr": [cell, cell] },
                    { "hp:tr": [cell, cell] },
                ],
            });
        });
        it("creates a table with the correct columnSpan and rowSpan", () => {
            const table = new Table({
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph("hello")],
                                columnSpan: 2,
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph("hello")],
                                rowSpan: 2,
                            }),
                            new TableCell({
                                children: [new Paragraph("hello")],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph("hello")],
                            }),
                        ],
                    }),
                ],
            });
            const tree = new Formatter().format(table);
            const cellP = { "hp:p": [{ "hp:run": [{ "hp:t": [{ _attr: { "xml:space": "preserve" } }, "hello"] }] }] };
            expect(tree).to.deep.equal({
                "hp:tbl": [
                    { "hp:tblPr": [WIDTHS, BORDERS] },
                    {
                        "w:tblGrid": [{ "w:gridCol": { _attr: { "hp:w": 100 } } }, { "w:gridCol": { _attr: { "hp:w": 100 } } }],
                    },
                    {
                        "hp:tr": [
                            {
                                "hp:tc": [{ "hp:tcPr": [{ "w:gridSpan": { _attr: { "hp:val": 2 } } }] }, cellP],
                            },
                        ],
                    },
                    {
                        "hp:tr": [
                            {
                                "hp:tc": [{ "hp:tcPr": [{ "w:vMerge": { _attr: { "hp:val": "restart" } } }] }, cellP],
                            },
                            { "hp:tc": [cellP] },
                        ],
                    },
                    {
                        "hp:tr": [
                            {
                                "hp:tc": [{ "hp:tcPr": [{ "w:vMerge": { _attr: { "hp:val": "continue" } } }] }, { "hp:p": {} }],
                            },
                            { "hp:tc": [cellP] },
                        ],
                    },
                ],
            });
        });
        it("sets the table to fixed width layout", () => {
            const table = new Table({
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph("hello")],
                            }),
                        ],
                    }),
                ],
                layout: TableLayoutType.FIXED,
            });
            const tree = new Formatter().format(table);
            expect(tree).to.have.property("hp:tbl").which.is.an("array").with.has.length.at.least(1);
            expect(tree["hp:tbl"][0]).to.deep.equal({
                "hp:tblPr": [WIDTHS, BORDERS, { "w:tblLayout": { _attr: { "hp:type": "fixed" } } }],
            });
        });
        it("should center the table", () => {
            const table = new Table({
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph("hello")],
                            }),
                        ],
                    }),
                ],
                alignment: AlignmentType.CENTER,
            });
            const tree = new Formatter().format(table);
            expect(tree).to.have.property("hp:tbl").which.is.an("array").with.has.length.at.least(1);
            expect(tree["hp:tbl"][0]).to.deep.equal({
                "hp:tblPr": [WIDTHS, { "hp:align": { _attr: { "hp:val": "center" } } }, BORDERS],
            });
        });
        it("should set the table to provided 100% width", () => {
            const table = new Table({
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph("hello")],
                            }),
                        ],
                    }),
                ],
                width: {
                    size: 100,
                    type: WidthType.PERCENTAGE,
                },
                layout: TableLayoutType.FIXED,
            });
            const tree = new Formatter().format(table);
            expect(tree).to.have.property("hp:tbl").which.is.an("array").with.has.length.at.least(1);
            expect(tree["hp:tbl"][0]).to.deep.equal({
                "hp:tblPr": [
                    {
                        "w:tblW": {
                            _attr: {
                                "hp:type": "pct",
                                "hp:w": "100%",
                            },
                        },
                    },
                    BORDERS,
                    { "w:tblLayout": { _attr: { "hp:type": "fixed" } } },
                ],
            });
        });
        it("should set the table to provided 1000 DXA", () => {
            const table = new Table({
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph("hello")],
                            }),
                        ],
                    }),
                ],
                width: {
                    size: 1000,
                    type: WidthType.DXA,
                },
                layout: TableLayoutType.FIXED,
            });
            const tree = new Formatter().format(table);
            expect(tree).to.have.property("hp:tbl").which.is.an("array").with.has.length.at.least(1);
            expect(tree["hp:tbl"][0]).to.deep.equal({
                "hp:tblPr": [
                    {
                        "w:tblW": {
                            _attr: {
                                "hp:type": "dxa",
                                "hp:w": 1000,
                            },
                        },
                    },
                    BORDERS,
                    { "w:tblLayout": { _attr: { "hp:type": "fixed" } } },
                ],
            });
        });
    });
    describe("Cell", () => {
        describe("#prepForXml", () => {
            it("inserts a paragraph at the end of the cell if it is empty", () => {
                const table = new Table({
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    children: [new Paragraph("hello")],
                                }),
                            ],
                        }),
                    ],
                });
                const tree = new Formatter().format(table);
                expect(tree).to.have.property("hp:tbl").which.is.an("array");
                const row = tree["hp:tbl"].find((x) => x["hp:tr"]);
                expect(row).not.to.be.undefined;
                expect(row["hp:tr"]).to.be.an("array").which.has.length.at.least(1);
                expect(row["hp:tr"].find((x) => x["hp:tc"])).to.deep.equal({
                    "hp:tc": [
                        {
                            "hp:p": [
                                {
                                    "hp:run": [
                                        {
                                            "hp:t": [
                                                {
                                                    _attr: {
                                                        "xml:space": "preserve",
                                                    },
                                                },
                                                "hello",
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                });
            });
        });
    });
    describe("#float", () => {
        it("sets the table float properties", () => {
            const table = new Table({
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph("hello")],
                            }),
                        ],
                    }),
                ],
                float: {
                    horizontalAnchor: TableAnchorType.MARGIN,
                    verticalAnchor: TableAnchorType.PAGE,
                    absoluteHorizontalPosition: 10,
                    relativeHorizontalPosition: RelativeHorizontalPosition.CENTER,
                    absoluteVerticalPosition: 20,
                    relativeVerticalPosition: RelativeVerticalPosition.BOTTOM,
                    bottomFromText: 30,
                    topFromText: 40,
                    leftFromText: 50,
                    rightFromText: 60,
                },
            });
            const tree = new Formatter().format(table);
            expect(tree).to.have.property("hp:tbl").which.is.an("array").with.has.length.at.least(1);
            expect(tree["hp:tbl"][0]).to.deep.equal({
                "hp:tblPr": [
                    {
                        "w:tblpPr": {
                            _attr: {
                                "w:horzAnchor": "margin",
                                "w:vertAnchor": "page",
                                "w:tblpX": 10,
                                "w:tblpXSpec": "center",
                                "w:tblpY": 20,
                                "w:tblpYSpec": "bottom",
                                "w:bottomFromText": 30,
                                "w:topFromText": 40,
                                "w:leftFromText": 50,
                                "w:rightFromText": 60,
                            },
                        },
                    },
                    WIDTHS,
                    BORDERS,
                ],
            });
        });
    });
});
//# sourceMappingURL=table.spec.js.map