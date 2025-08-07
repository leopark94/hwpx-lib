import { describe, expect, it } from "vitest";

import { Formatter } from "@export/formatter";
import { AlignmentType } from "@file/paragraph";
import { ShadingType } from "@file/shading";

import { WidthType } from "../table-width";
import { TableLayoutType } from "./table-layout";
import { TableProperties } from "./table-properties";
import { CellSpacingType } from "../table-cell-spacing";

describe("TableProperties", () => {
    describe("#constructor", () => {
        it("creates an initially empty property object", () => {
            const tp = new TableProperties({});
            // The TableProperties is ignorable if there are no attributes,
            // which results in prepForXml returning undefined, which causes
            // the formatter to throw an error if that is the only object it
            // has been asked to format.
            expect(() => new Formatter().format(tp)).to.throw("XMLComponent did not format correctly");
        });

        it("should add a table style property", () => {
            const tp = new TableProperties({
                style: "TableNormal",
            });
            const tree = new Formatter().format(tp);
            expect(tree).to.deep.equal({
                "hp:tblPr": [{ "w:tblStyle": { _attr: { "hp:val": "TableNormal" } } }],
            });
        });

        it("should add a table width property", () => {
            const tp = new TableProperties({
                width: {
                    size: 1234,
                    type: WidthType.DXA,
                },
            });
            const tree = new Formatter().format(tp);
            expect(tree).to.deep.equal({
                "hp:tblPr": [{ "w:tblW": { _attr: { "hp:type": "dxa", "hp:w": 1234 } } }],
            });
        });

        it("should add a table width property with default of AUTO", () => {
            const tp = new TableProperties({
                width: {
                    size: 1234,
                },
            });

            const tree = new Formatter().format(tp);
            expect(tree).to.deep.equal({
                "hp:tblPr": [{ "w:tblW": { _attr: { "hp:type": "auto", "hp:w": 1234 } } }],
            });
        });

        it("should add a table indent property", () => {
            const tp = new TableProperties({
                indent: {
                    size: 1234,
                    type: WidthType.DXA,
                },
            });
            const tree = new Formatter().format(tp);
            expect(tree).to.deep.equal({
                "hp:tblPr": [{ "w:tblInd": { _attr: { "hp:type": "dxa", "hp:w": 1234 } } }],
            });
        });

        it("should add a table indent property with default of AUTO", () => {
            const tp = new TableProperties({
                indent: {
                    size: 1234,
                },
            });

            const tree = new Formatter().format(tp);
            expect(tree).to.deep.equal({
                "hp:tblPr": [{ "w:tblInd": { _attr: { "hp:type": "auto", "hp:w": 1234 } } }],
            });
        });

        it("sets the table to fixed width layout", () => {
            const tp = new TableProperties({
                layout: TableLayoutType.FIXED,
            });

            const tree = new Formatter().format(tp);
            expect(tree).to.deep.equal({
                "hp:tblPr": [{ "w:tblLayout": { _attr: { "hp:type": "fixed" } } }],
            });
        });

        it("should add a table cell spacing property", () => {
            const tp = new TableProperties({
                cellSpacing: {
                    value: 1234,
                    type: CellSpacingType.DXA,
                },
            });
            const tree = new Formatter().format(tp);
            expect(tree).to.deep.equal({
                "hp:tblPr": [{ "w:tblCellSpacing": { _attr: { "hp:type": "dxa", "hp:w": 1234 } } }],
            });
        });
    });

    describe("#cellMargin", () => {
        it("adds a table cell top margin", () => {
            const tp = new TableProperties({
                cellMargin: {
                    marginUnitType: WidthType.DXA,
                    top: 1234,
                },
            });

            const tree = new Formatter().format(tp);
            expect(tree).to.deep.equal({
                "hp:tblPr": [{ "w:tblCellMar": [{ "hp:top": { _attr: { "hp:type": "dxa", "hp:w": 1234 } } }] }],
            });
        });

        it("adds a table cell left margin", () => {
            const tp = new TableProperties({
                cellMargin: {
                    marginUnitType: WidthType.DXA,
                    left: 1234,
                },
            });

            const tree = new Formatter().format(tp);
            expect(tree).to.deep.equal({
                "hp:tblPr": [{ "w:tblCellMar": [{ "hp:left": { _attr: { "hp:type": "dxa", "hp:w": 1234 } } }] }],
            });
        });
    });

    describe("#setShading", () => {
        it("sets the shading of the table", () => {
            const tp = new TableProperties({
                shading: {
                    fill: "b79c2f",
                    type: ShadingType.REVERSE_DIAGONAL_STRIPE,
                    color: "auto",
                },
            });

            const tree = new Formatter().format(tp);
            expect(tree).to.deep.equal({
                "hp:tblPr": [
                    {
                        "w:shd": {
                            _attr: {
                                "hp:color": "auto",
                                "hp:fill": "b79c2f",
                                "hp:val": "reverseDiagStripe",
                            },
                        },
                    },
                ],
            });
        });
    });

    describe("#setAlignment", () => {
        it("sets the alignment of the table", () => {
            const tp = new TableProperties({
                alignment: AlignmentType.CENTER,
            });
            const tree = new Formatter().format(tp);
            expect(tree).to.deep.equal({
                "hp:tblPr": [
                    {
                        "hp:align": {
                            _attr: {
                                "hp:val": "center",
                            },
                        },
                    },
                ],
            });
        });
    });

    describe("#Set Virtual Right to Left", () => {
        it("sets the alignment of the table", () => {
            const tp = new TableProperties({
                visuallyRightToLeft: true,
            });
            const tree = new Formatter().format(tp);
            expect(tree).to.deep.equal({
                "hp:tblPr": [
                    {
                        "w:bidiVisual": {},
                    },
                ],
            });
        });
    });
});
