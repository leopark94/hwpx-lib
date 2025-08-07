import { describe, expect, it } from "vitest";

import { Formatter } from "@export/formatter";
import { BorderStyle } from "@file/border";

import { TableBorders } from "./table-borders";

describe("TableBorders", () => {
    describe("#constructor", () => {
        describe("default borders", () => {
            it("should add a table cell top border using default width type", () => {
                const tableBorders = new TableBorders({});
                const tree = new Formatter().format(tableBorders);

                expect(tree).to.deep.equal({
                    "w:tblBorders": [
                        {
                            "hp:top": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                        {
                            "hp:left": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                        {
                            "hp:bottom": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                        {
                            "hp:right": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                        {
                            "w:insideH": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                        {
                            "w:insideV": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                    ],
                });
            });
        });

        describe("top border", () => {
            it("should add a table cell top border", () => {
                const tableBorders = new TableBorders({
                    top: {
                        style: BorderStyle.DOUBLE,
                        size: 1,
                        color: "FF0000",
                    },
                });

                const tree = new Formatter().format(tableBorders);
                expect(tree).to.deep.equal({
                    "w:tblBorders": [
                        {
                            "hp:top": {
                                _attr: {
                                    "hp:color": "FF0000",
                                    "hp:sz": 1,
                                    "hp:val": "double",
                                },
                            },
                        },
                        {
                            "hp:left": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                        {
                            "hp:bottom": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                        {
                            "hp:right": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                        {
                            "w:insideH": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                        {
                            "w:insideV": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                    ],
                });
            });
        });

        describe("left border", () => {
            it("should add a table cell left border", () => {
                const tableBorders = new TableBorders({
                    left: {
                        style: BorderStyle.DOUBLE,
                        size: 1,
                        color: "ff0000",
                    },
                });
                const tree = new Formatter().format(tableBorders);

                expect(tree).to.deep.equal({
                    "w:tblBorders": [
                        {
                            "hp:top": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                        {
                            "hp:left": {
                                _attr: {
                                    "hp:color": "ff0000",
                                    "hp:sz": 1,
                                    "hp:val": "double",
                                },
                            },
                        },
                        {
                            "hp:bottom": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                        {
                            "hp:right": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                        {
                            "w:insideH": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                        {
                            "w:insideV": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                    ],
                });
            });
        });

        describe("bottom border", () => {
            it("should add a table cell bottom border", () => {
                const tableBorders = new TableBorders({
                    bottom: {
                        style: BorderStyle.DOUBLE,
                        size: 1,
                        color: "ff0000",
                    },
                });
                const tree = new Formatter().format(tableBorders);

                expect(tree).to.deep.equal({
                    "w:tblBorders": [
                        {
                            "hp:top": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                        {
                            "hp:left": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                        {
                            "hp:bottom": {
                                _attr: {
                                    "hp:color": "ff0000",
                                    "hp:sz": 1,
                                    "hp:val": "double",
                                },
                            },
                        },
                        {
                            "hp:right": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                        {
                            "w:insideH": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                        {
                            "w:insideV": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                    ],
                });
            });
        });

        describe("right border", () => {
            it("should add a table cell right border", () => {
                const tableBorders = new TableBorders({
                    right: {
                        style: BorderStyle.DOUBLE,
                        size: 1,
                        color: "ff0000",
                    },
                });
                const tree = new Formatter().format(tableBorders);

                expect(tree).to.deep.equal({
                    "w:tblBorders": [
                        {
                            "hp:top": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                        {
                            "hp:left": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                        {
                            "hp:bottom": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                        {
                            "hp:right": {
                                _attr: {
                                    "hp:color": "ff0000",
                                    "hp:sz": 1,
                                    "hp:val": "double",
                                },
                            },
                        },
                        {
                            "w:insideH": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                        {
                            "w:insideV": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                    ],
                });
            });
        });

        describe("inside horizontal border", () => {
            it("should add a table cell inside horizontal border", () => {
                const tableBorders = new TableBorders({
                    insideHorizontal: {
                        style: BorderStyle.DOUBLE,
                        size: 1,
                        color: "ff0000",
                    },
                });
                const tree = new Formatter().format(tableBorders);

                expect(tree).to.deep.equal({
                    "w:tblBorders": [
                        {
                            "hp:top": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                        {
                            "hp:left": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                        {
                            "hp:bottom": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                        {
                            "hp:right": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                        {
                            "w:insideH": {
                                _attr: {
                                    "hp:color": "ff0000",
                                    "hp:sz": 1,
                                    "hp:val": "double",
                                },
                            },
                        },
                        {
                            "w:insideV": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                    ],
                });
            });
        });

        describe("inside vertical border", () => {
            it("should add a table cell inside horizontal border", () => {
                const tableBorders = new TableBorders({
                    insideVertical: {
                        style: BorderStyle.DOUBLE,
                        size: 1,
                        color: "ff0000",
                    },
                });
                const tree = new Formatter().format(tableBorders);

                expect(tree).to.deep.equal({
                    "w:tblBorders": [
                        {
                            "hp:top": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                        {
                            "hp:left": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                        {
                            "hp:bottom": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                        {
                            "hp:right": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                        {
                            "w:insideH": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 4,
                                    "hp:val": "single",
                                },
                            },
                        },
                        {
                            "w:insideV": {
                                _attr: {
                                    "hp:color": "ff0000",
                                    "hp:sz": 1,
                                    "hp:val": "double",
                                },
                            },
                        },
                    ],
                });
            });
        });

        describe("TableBorders.NONE convenience object", () => {
            it("should add no borders", () => {
                const tableBorders = new TableBorders(TableBorders.NONE);
                const tree = new Formatter().format(tableBorders);

                expect(tree).to.deep.equal({
                    "w:tblBorders": [
                        {
                            "hp:top": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 0,
                                    "hp:val": "none",
                                },
                            },
                        },
                        {
                            "hp:left": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 0,
                                    "hp:val": "none",
                                },
                            },
                        },
                        {
                            "hp:bottom": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 0,
                                    "hp:val": "none",
                                },
                            },
                        },
                        {
                            "hp:right": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 0,
                                    "hp:val": "none",
                                },
                            },
                        },
                        {
                            "w:insideH": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 0,
                                    "hp:val": "none",
                                },
                            },
                        },
                        {
                            "w:insideV": {
                                _attr: {
                                    "hp:color": "auto",
                                    "hp:sz": 0,
                                    "hp:val": "none",
                                },
                            },
                        },
                    ],
                });
            });
        });
    });
});
