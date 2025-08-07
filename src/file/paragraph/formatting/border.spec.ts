import { beforeEach, describe, expect, it } from "vitest";

import { Formatter } from "@export/formatter";
import { BorderStyle } from "@file/border";

import { Border, ThematicBreak } from "./border";

describe("Border", () => {
    describe("#constructor", () => {
        it("should create", () => {
            const border = new Border({
                top: {
                    color: "FF0000",
                    space: 1,
                    style: BorderStyle.WAVE,
                    size: 2,
                },
                bottom: {
                    color: "FF0000",
                    space: 3,
                    style: BorderStyle.WAVE,
                    size: 4,
                },
                left: {
                    color: "FF0000",
                    space: 5,
                    style: BorderStyle.WAVE,
                    size: 6,
                },
                right: {
                    color: "FF0000",
                    space: 7,
                    style: BorderStyle.WAVE,
                    size: 8,
                },
            });

            const tree = new Formatter().format(border);

            expect(tree).to.deep.equal({
                "w:pBdr": [
                    {
                        "hp:top": {
                            _attr: {
                                "hp:color": "FF0000",
                                "hp:space": 1,
                                "hp:sz": 2,
                                "hp:val": "wave",
                            },
                        },
                    },
                    {
                        "hp:bottom": {
                            _attr: {
                                "hp:color": "FF0000",
                                "hp:space": 3,
                                "hp:sz": 4,
                                "hp:val": "wave",
                            },
                        },
                    },
                    {
                        "hp:left": {
                            _attr: {
                                "hp:color": "FF0000",
                                "hp:space": 5,
                                "hp:sz": 6,
                                "hp:val": "wave",
                            },
                        },
                    },
                    {
                        "hp:right": {
                            _attr: {
                                "hp:color": "FF0000",
                                "hp:space": 7,
                                "hp:sz": 8,
                                "hp:val": "wave",
                            },
                        },
                    },
                ],
            });
        });

        it("should not add empty borders element if there are no borders defined", () => {
            const tb = new Border({});
            expect(() => new Formatter().format(tb)).to.throw();
        });
    });
});

describe("ThematicBreak", () => {
    let thematicBreak: ThematicBreak;

    beforeEach(() => {
        thematicBreak = new ThematicBreak();
    });

    describe("#constructor()", () => {
        it("should create a Thematic Break with correct border properties", () => {
            const tree = new Formatter().format(thematicBreak);
            expect(tree).to.deep.equal({
                "w:pBdr": [
                    {
                        "hp:bottom": {
                            _attr: {
                                "hp:color": "auto",
                                "hp:space": 1,
                                "hp:sz": 6,
                                "hp:val": "single",
                            },
                        },
                    },
                ],
            });
        });
    });
});
