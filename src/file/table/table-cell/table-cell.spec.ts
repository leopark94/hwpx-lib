import { describe, expect, it } from "vitest";

import { Formatter } from "@export/formatter";
import { BorderStyle } from "@file/border";
import { ShadingType } from "@file/shading";
import { VerticalAlignTable } from "@file/vertical-align";

import { WidthType } from "../table-width";
import { TableCell } from "./table-cell";
import { TableCellBorders, TextDirection, VerticalMergeType } from "./table-cell-components";

describe("TableCellBorders", () => {
    describe("#prepForXml", () => {
        it("should not add empty borders element if there are no borders defined", () => {
            const tb = new TableCellBorders({});
            expect(() => new Formatter().format(tb)).to.throw();
        });
    });

    describe("#addingBorders", () => {
        it("should add top border", () => {
            const tb = new TableCellBorders({
                top: {
                    style: BorderStyle.DOTTED,
                    size: 1,
                    color: "FF00FF",
                },
            });

            const tree = new Formatter().format(tb);
            expect(tree).to.deep.equal({
                "w:tcBorders": [
                    {
                        "hp:top": {
                            _attr: {
                                "hp:color": "FF00FF",
                                "hp:sz": 1,
                                "hp:val": "dotted",
                            },
                        },
                    },
                ],
            });
        });

        it("should add start(left) border", () => {
            const tb = new TableCellBorders({
                start: {
                    style: BorderStyle.SINGLE,
                    size: 2,
                    color: "FF00FF",
                },
            });

            const tree = new Formatter().format(tb);
            expect(tree).to.deep.equal({
                "w:tcBorders": [
                    {
                        "w:start": {
                            _attr: {
                                "hp:color": "FF00FF",
                                "hp:sz": 2,
                                "hp:val": "single",
                            },
                        },
                    },
                ],
            });
        });

        it("should add bottom border", () => {
            const tb = new TableCellBorders({
                bottom: {
                    style: BorderStyle.DOUBLE,
                    size: 1,
                    color: "FF00FF",
                },
            });

            const tree = new Formatter().format(tb);
            expect(tree).to.deep.equal({
                "w:tcBorders": [
                    {
                        "hp:bottom": {
                            _attr: {
                                "hp:color": "FF00FF",
                                "hp:sz": 1,
                                "hp:val": "double",
                            },
                        },
                    },
                ],
            });
        });

        it("should add end(right) border", () => {
            const tb = new TableCellBorders({
                end: {
                    style: BorderStyle.THICK,
                    size: 3,
                    color: "FF0000",
                },
            });

            const tree = new Formatter().format(tb);
            expect(tree).to.deep.equal({
                "w:tcBorders": [
                    {
                        "w:end": {
                            _attr: {
                                "hp:color": "FF0000",
                                "hp:sz": 3,
                                "hp:val": "thick",
                            },
                        },
                    },
                ],
            });
        });

        it("should add left border", () => {
            const tb = new TableCellBorders({
                left: {
                    style: BorderStyle.THICK,
                    size: 3,
                    color: "FF00FF",
                },
            });

            const tree = new Formatter().format(tb);
            expect(tree).to.deep.equal({
                "w:tcBorders": [
                    {
                        "hp:left": {
                            _attr: {
                                "hp:color": "FF00FF",
                                "hp:sz": 3,
                                "hp:val": "thick",
                            },
                        },
                    },
                ],
            });
        });

        it("should add right border", () => {
            const tb = new TableCellBorders({
                right: {
                    style: BorderStyle.THICK,
                    size: 3,
                    color: "FF00FF",
                },
            });

            const tree = new Formatter().format(tb);
            expect(tree).to.deep.equal({
                "w:tcBorders": [
                    {
                        "hp:right": {
                            _attr: {
                                "hp:color": "FF00FF",
                                "hp:sz": 3,
                                "hp:val": "thick",
                            },
                        },
                    },
                ],
            });
        });

        it("should add multiple borders", () => {
            const tb = new TableCellBorders({
                top: {
                    style: BorderStyle.DOTTED,
                    size: 1,
                    color: "FF00FF",
                },
                end: {
                    style: BorderStyle.THICK,
                    size: 3,
                    color: "FF00FF",
                },
                bottom: {
                    style: BorderStyle.DOUBLE,
                    size: 1,
                    color: "FF00FF",
                },
                start: {
                    style: BorderStyle.SINGLE,
                    size: 2,
                    color: "FF00FF",
                },
                left: {
                    style: BorderStyle.SINGLE,
                    size: 2,
                    color: "FF00FF",
                },
                right: {
                    style: BorderStyle.SINGLE,
                    size: 2,
                    color: "FF00FF",
                },
            });

            const tree = new Formatter().format(tb);
            expect(tree).to.deep.equal({
                "w:tcBorders": [
                    {
                        "hp:top": {
                            _attr: {
                                "hp:color": "FF00FF",
                                "hp:sz": 1,
                                "hp:val": "dotted",
                            },
                        },
                    },
                    {
                        "w:start": {
                            _attr: {
                                "hp:color": "FF00FF",
                                "hp:sz": 2,
                                "hp:val": "single",
                            },
                        },
                    },
                    {
                        "hp:left": {
                            _attr: {
                                "hp:color": "FF00FF",
                                "hp:sz": 2,
                                "hp:val": "single",
                            },
                        },
                    },
                    {
                        "hp:bottom": {
                            _attr: {
                                "hp:color": "FF00FF",
                                "hp:sz": 1,
                                "hp:val": "double",
                            },
                        },
                    },
                    {
                        "w:end": {
                            _attr: {
                                "hp:color": "FF00FF",
                                "hp:sz": 3,
                                "hp:val": "thick",
                            },
                        },
                    },
                    {
                        "hp:right": {
                            _attr: {
                                "hp:color": "FF00FF",
                                "hp:sz": 2,
                                "hp:val": "single",
                            },
                        },
                    },
                ],
            });
        });
    });
});

describe("TableCell", () => {
    describe("#constructor", () => {
        it("should create", () => {
            const cell = new TableCell({
                children: [],
            });

            const tree = new Formatter().format(cell);

            expect(tree).to.deep.equal({
                "hp:tc": [
                    {
                        "hp:p": {},
                    },
                ],
            });
        });

        it("should create with vertical align", () => {
            const cell = new TableCell({
                children: [],
                verticalAlign: VerticalAlignTable.CENTER,
            });

            const tree = new Formatter().format(cell);

            expect(tree).to.deep.equal({
                "hp:tc": [
                    {
                        "hp:tcPr": [
                            {
                                "w:vAlign": {
                                    _attr: {
                                        "hp:val": "center",
                                    },
                                },
                            },
                        ],
                    },
                    {
                        "hp:p": {},
                    },
                ],
            });
        });

        it("should create with text direction", () => {
            const cell = new TableCell({
                children: [],
                textDirection: TextDirection.BOTTOM_TO_TOP_LEFT_TO_RIGHT,
            });

            const tree = new Formatter().format(cell);

            expect(tree).to.deep.equal({
                "hp:tc": [
                    {
                        "hp:tcPr": [
                            {
                                "hs:textDirection": {
                                    _attr: {
                                        "hp:val": "btLr",
                                    },
                                },
                            },
                        ],
                    },
                    {
                        "hp:p": {},
                    },
                ],
            });
        });

        it("should create with vertical merge", () => {
            const cell = new TableCell({
                children: [],
                verticalMerge: VerticalMergeType.RESTART,
            });

            const tree = new Formatter().format(cell);

            expect(tree).to.deep.equal({
                "hp:tc": [
                    {
                        "hp:tcPr": [
                            {
                                "w:vMerge": {
                                    _attr: {
                                        "hp:val": "restart",
                                    },
                                },
                            },
                        ],
                    },
                    {
                        "hp:p": {},
                    },
                ],
            });
        });

        it("should create with margins", () => {
            const cell = new TableCell({
                children: [],
                margins: {
                    top: 1,
                    left: 1,
                    bottom: 1,
                    right: 1,
                },
            });

            const tree = new Formatter().format(cell);

            expect(tree).to.deep.equal({
                "hp:tc": [
                    {
                        "hp:tcPr": [
                            {
                                "w:tcMar": [
                                    {
                                        "hp:top": {
                                            _attr: {
                                                "hp:type": "dxa",
                                                "hp:w": 1,
                                            },
                                        },
                                    },
                                    {
                                        "hp:left": {
                                            _attr: {
                                                "hp:type": "dxa",
                                                "hp:w": 1,
                                            },
                                        },
                                    },
                                    {
                                        "hp:bottom": {
                                            _attr: {
                                                "hp:type": "dxa",
                                                "hp:w": 1,
                                            },
                                        },
                                    },
                                    {
                                        "hp:right": {
                                            _attr: {
                                                "hp:type": "dxa",
                                                "hp:w": 1,
                                            },
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        "hp:p": {},
                    },
                ],
            });
        });

        it("should create with shading", () => {
            const cell = new TableCell({
                children: [],
                shading: {
                    fill: "FF0000",
                    color: "0000ff",
                    type: ShadingType.PERCENT_10,
                },
            });

            const tree = new Formatter().format(cell);

            expect(tree).to.deep.equal({
                "hp:tc": [
                    {
                        "hp:tcPr": [
                            {
                                "hp:shd": {
                                    _attr: {
                                        "hp:color": "0000ff",
                                        "hp:fill": "FF0000",
                                        "hp:val": "pct10",
                                    },
                                },
                            },
                        ],
                    },
                    {
                        "hp:p": {},
                    },
                ],
            });
        });

        it("should create with width", () => {
            const cell = new TableCell({
                children: [],
                width: { size: 100, type: WidthType.DXA },
            });
            const tree = new Formatter().format(cell);
            expect(tree).to.deep.equal({
                "hp:tc": [
                    {
                        "hp:tcPr": [
                            {
                                "w:tcW": {
                                    _attr: {
                                        "hp:type": "dxa",
                                        "hp:w": 100,
                                    },
                                },
                            },
                        ],
                    },
                    {
                        "hp:p": {},
                    },
                ],
            });
        });

        it("should create with column span", () => {
            const cell = new TableCell({
                children: [],
                columnSpan: 2,
            });

            const tree = new Formatter().format(cell);

            expect(tree).to.deep.equal({
                "hp:tc": [
                    {
                        "hp:tcPr": [
                            {
                                "w:gridSpan": {
                                    _attr: {
                                        "hp:val": 2,
                                    },
                                },
                            },
                        ],
                    },
                    {
                        "hp:p": {},
                    },
                ],
            });
        });

        describe("rowSpan", () => {
            it("should not create with row span if its less than 1", () => {
                const cell = new TableCell({
                    children: [],
                    rowSpan: 0,
                });

                const tree = new Formatter().format(cell);

                expect(tree).to.deep.equal({
                    "hp:tc": [
                        {
                            "hp:p": {},
                        },
                    ],
                });
            });

            it("should create with row span if its greater than 1", () => {
                const cell = new TableCell({
                    children: [],
                    rowSpan: 2,
                });

                const tree = new Formatter().format(cell);

                expect(tree).to.deep.equal({
                    "hp:tc": [
                        {
                            "hp:tcPr": [
                                {
                                    "w:vMerge": {
                                        _attr: {
                                            "hp:val": "restart",
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            "hp:p": {},
                        },
                    ],
                });
            });

            it("should create with borders", () => {
                const cell = new TableCell({
                    children: [],
                    borders: {
                        top: {
                            style: BorderStyle.DASH_DOT_STROKED,
                            size: 3,
                            color: "FF0000",
                        },
                        bottom: {
                            style: BorderStyle.DOUBLE,
                            size: 3,
                            color: "0000ff",
                        },
                        left: {
                            style: BorderStyle.DASH_DOT_STROKED,
                            size: 3,
                            color: "00ff00",
                        },
                        right: {
                            style: BorderStyle.DASH_DOT_STROKED,
                            size: 3,
                            color: "#ff8000",
                        },
                    },
                });

                const tree = new Formatter().format(cell);

                expect(tree).to.deep.equal({
                    "hp:tc": [
                        {
                            "hp:tcPr": [
                                {
                                    "w:tcBorders": [
                                        {
                                            "hp:top": {
                                                _attr: {
                                                    "hp:color": "FF0000",
                                                    "hp:sz": 3,
                                                    "hp:val": "dashDotStroked",
                                                },
                                            },
                                        },
                                        {
                                            "hp:left": {
                                                _attr: {
                                                    "hp:color": "00ff00",
                                                    "hp:sz": 3,
                                                    "hp:val": "dashDotStroked",
                                                },
                                            },
                                        },
                                        {
                                            "hp:bottom": {
                                                _attr: {
                                                    "hp:color": "0000ff",
                                                    "hp:sz": 3,
                                                    "hp:val": "double",
                                                },
                                            },
                                        },
                                        {
                                            "hp:right": {
                                                _attr: {
                                                    "hp:color": "ff8000",
                                                    "hp:sz": 3,
                                                    "hp:val": "dashDotStroked",
                                                },
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            "hp:p": {},
                        },
                    ],
                });
            });
        });
    });
});
