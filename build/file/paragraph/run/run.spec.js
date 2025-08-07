import { describe, expect, it } from "vitest";
import { Formatter } from "@export/formatter";
import { BorderStyle } from "@file/border";
import { ShadingType } from "@file/shading";
import { EmphasisMarkType } from "./emphasis-mark";
import { HighlightColor, TextEffect } from "./properties";
import { PageNumber, Run } from "./run";
import { UnderlineType } from "./underline";
describe("Run", () => {
    describe("#noProof()", () => {
        it("turns off spelling and grammar checkers for a run", () => {
            const run = new Run({
                noProof: true,
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [
                    {
                        "hp:charPr": [{ "w:noProof": {} }],
                    },
                ],
            });
        });
    });
    describe("#bold()", () => {
        it("it should add bold to the properties", () => {
            const run = new Run({
                bold: true,
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [
                    {
                        "hp:charPr": [
                            { "hp:bold": {} },
                            {
                                "w:bCs": {},
                            },
                        ],
                    },
                ],
            });
        });
    });
    describe("#italics()", () => {
        it("it should add italics to the properties", () => {
            const run = new Run({
                italics: true,
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [
                    {
                        "hp:charPr": [
                            { "hp:italic": {} },
                            {
                                "w:iCs": {},
                            },
                        ],
                    },
                ],
            });
        });
    });
    describe("#underline()", () => {
        it("should default to 'single' and no color", () => {
            const run = new Run({
                underline: {},
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [{ "hp:charPr": [{ "hp:underline": { _attr: { "hp:val": "single" } } }] }],
            });
        });
        it("should set the style type and color if given", () => {
            const run = new Run({
                underline: {
                    type: UnderlineType.DOUBLE,
                    color: "990011",
                },
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [{ "hp:charPr": [{ "hp:underline": { _attr: { "hp:val": "double", "hp:color": "990011" } } }] }],
            });
        });
    });
    describe("#emphasisMark()", () => {
        it("should default to 'dot'", () => {
            const run = new Run({
                emphasisMark: {},
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [{ "hp:charPr": [{ "w:em": { _attr: { "hp:val": "dot" } } }] }],
            });
        });
        it("should set the style type if given", () => {
            const run = new Run({
                emphasisMark: {
                    type: EmphasisMarkType.DOT,
                },
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [{ "hp:charPr": [{ "w:em": { _attr: { "hp:val": "dot" } } }] }],
            });
        });
    });
    describe("#smallCaps()", () => {
        it("it should add smallCaps to the properties", () => {
            const run = new Run({
                smallCaps: true,
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [{ "hp:charPr": [{ "w:smallCaps": {} }] }],
            });
        });
    });
    describe("#caps()", () => {
        it("it should add caps to the properties", () => {
            const run = new Run({
                allCaps: true,
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [{ "hp:charPr": [{ "w:caps": {} }] }],
            });
        });
    });
    describe("#strike()", () => {
        it("it should add strike to the properties", () => {
            const run = new Run({
                strike: true,
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [{ "hp:charPr": [{ "hp:strikeout": {} }] }],
            });
        });
    });
    describe("#doubleStrike()", () => {
        it("it should add double strike to the properties", () => {
            const run = new Run({
                doubleStrike: true,
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [{ "hp:charPr": [{ "w:dstrike": {} }] }],
            });
        });
    });
    describe("#emboss()", () => {
        it("it should add emboss to the properties", () => {
            const run = new Run({
                emboss: true,
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [{ "hp:charPr": [{ "w:emboss": {} }] }],
            });
        });
    });
    describe("#imprint()", () => {
        it("it should add imprint to the properties", () => {
            const run = new Run({
                imprint: true,
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [{ "hp:charPr": [{ "w:imprint": {} }] }],
            });
        });
    });
    describe("#subScript()", () => {
        it("it should add subScript to the properties", () => {
            const run = new Run({
                subScript: true,
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [{ "hp:charPr": [{ "hp:vertAlign": { _attr: { "hp:val": "subscript" } } }] }],
            });
        });
    });
    describe("#superScript()", () => {
        it("it should add superScript to the properties", () => {
            const run = new Run({
                superScript: true,
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [{ "hp:charPr": [{ "hp:vertAlign": { _attr: { "hp:val": "superscript" } } }] }],
            });
        });
    });
    describe("#highlight()", () => {
        it("it should add highlight to the properties", () => {
            const run = new Run({
                highlight: HighlightColor.YELLOW,
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [
                    {
                        "hp:charPr": [
                            { "hp:highlight": { _attr: { "hp:val": "yellow" } } },
                            {
                                "w:highlightCs": {
                                    _attr: {
                                        "hp:val": "yellow",
                                    },
                                },
                            },
                        ],
                    },
                ],
            });
        });
    });
    describe("#shadow()", () => {
        it("it should add shadow to the properties", () => {
            const run = new Run({
                shading: {
                    type: ShadingType.PERCENT_10,
                    fill: "00FFFF",
                    color: "FF0000",
                },
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [
                    {
                        "hp:charPr": [{ "hp:shd": { _attr: { "hp:val": "pct10", "hp:fill": "00FFFF", "hp:color": "FF0000" } } }],
                    },
                ],
            });
        });
    });
    describe("#break()", () => {
        it("it should add break to the run", () => {
            const run = new Run({
                break: 1,
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [{ "hp:br": {} }],
            });
        });
        it("it should add two breaks to the run", () => {
            const run = new Run({
                break: 2,
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [
                    { "hp:br": {} },
                    {
                        "hp:br": {},
                    },
                ],
            });
        });
    });
    describe("#font()", () => {
        it("should set the font as named", () => {
            const run = new Run({
                font: {
                    name: "Times",
                },
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [
                    {
                        "hp:charPr": [
                            {
                                "hp:rFonts": {
                                    _attr: {
                                        "w:ascii": "Times",
                                        "w:cs": "Times",
                                        "hp:eastAsia": "Times",
                                        "w:hAnsi": "Times",
                                    },
                                },
                            },
                        ],
                    },
                ],
            });
        });
        it("should set the font for ascii and eastAsia", () => {
            const run = new Run({
                font: {
                    ascii: "Times",
                    eastAsia: "KaiTi",
                },
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [
                    {
                        "hp:charPr": [
                            {
                                "hp:rFonts": {
                                    _attr: {
                                        "w:ascii": "Times",
                                        "hp:eastAsia": "KaiTi",
                                    },
                                },
                            },
                        ],
                    },
                ],
            });
        });
    });
    describe("#color", () => {
        it("should set the run to the color given", () => {
            const run = new Run({
                color: "001122",
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [{ "hp:charPr": [{ "hp:color": { _attr: { "hp:val": "001122" } } }] }],
            });
        });
    });
    describe("#size", () => {
        it("should set the run to the given size", () => {
            const run = new Run({
                size: 24,
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [
                    {
                        "hp:charPr": [{ "hp:sz": { _attr: { "hp:val": 24 } } }, { "w:szCs": { _attr: { "hp:val": 24 } } }],
                    },
                ],
            });
        });
    });
    describe("#rtl", () => {
        it("should set the run to the RTL mode", () => {
            const run = new Run({
                rightToLeft: true,
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [{ "hp:charPr": [{ "w:rtl": {} }] }],
            });
        });
    });
    describe("#numberOfTotalPages", () => {
        it("should set the run to the RTL mode", () => {
            const run = new Run({
                children: [PageNumber.TOTAL_PAGES],
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [
                    { "w:fldChar": { _attr: { "w:fldCharType": "begin" } } },
                    { "hp:instrText": [{ _attr: { "xml:space": "preserve" } }, "NUMPAGES"] },
                    { "w:fldChar": { _attr: { "w:fldCharType": "separate" } } },
                    { "w:fldChar": { _attr: { "w:fldCharType": "end" } } },
                ],
            });
        });
    });
    describe("#numberOfTotalPagesSection", () => {
        it("should set the run to the RTL mode", () => {
            const run = new Run({
                children: [PageNumber.TOTAL_PAGES_IN_SECTION],
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [
                    { "w:fldChar": { _attr: { "w:fldCharType": "begin" } } },
                    { "hp:instrText": [{ _attr: { "xml:space": "preserve" } }, "SECTIONPAGES"] },
                    { "w:fldChar": { _attr: { "w:fldCharType": "separate" } } },
                    { "w:fldChar": { _attr: { "w:fldCharType": "end" } } },
                ],
            });
        });
    });
    describe("#pageNumber", () => {
        it("should set the run to the RTL mode", () => {
            const run = new Run({
                children: [PageNumber.CURRENT],
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [
                    { "w:fldChar": { _attr: { "w:fldCharType": "begin" } } },
                    { "hp:instrText": [{ _attr: { "xml:space": "preserve" } }, "PAGE"] },
                    { "w:fldChar": { _attr: { "w:fldCharType": "separate" } } },
                    { "w:fldChar": { _attr: { "w:fldCharType": "end" } } },
                ],
            });
        });
    });
    describe("#section", () => {
        it("should set the run to the RTL mode", () => {
            const run = new Run({
                children: [PageNumber.CURRENT_SECTION],
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [
                    { "w:fldChar": { _attr: { "w:fldCharType": "begin" } } },
                    { "hp:instrText": [{ _attr: { "xml:space": "preserve" } }, "SECTION"] },
                    { "w:fldChar": { _attr: { "w:fldCharType": "separate" } } },
                    { "w:fldChar": { _attr: { "w:fldCharType": "end" } } },
                ],
            });
        });
    });
    describe("#style", () => {
        it("should set the style to the given styleId", () => {
            const run = new Run({
                style: "myRunStyle",
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [{ "hp:charPr": [{ "hp:styleRef": { _attr: { "hp:val": "myRunStyle" } } }] }],
            });
        });
    });
    describe("#revisions", () => {
        it("should add style revisions", () => {
            const run = new Run({
                bold: true,
                italics: true,
                revision: {
                    id: 0,
                    author: "Firstname Lastname",
                    date: "123",
                    bold: false,
                    italics: true,
                },
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [
                    {
                        "hp:charPr": [
                            { "hp:bold": {} },
                            {
                                "w:bCs": {},
                            },
                            { "hp:italic": {} },
                            {
                                "w:iCs": {},
                            },
                            {
                                "w:rPrChange": [
                                    {
                                        _attr: {
                                            "w:author": "Firstname Lastname",
                                            "w:date": "123",
                                            "hp:id": 0,
                                        },
                                    },
                                    {
                                        "hp:charPr": [
                                            { "hp:bold": { _attr: { "hp:val": false } } },
                                            {
                                                "w:bCs": {
                                                    _attr: {
                                                        "hp:val": false,
                                                    },
                                                },
                                            },
                                            { "hp:italic": {} },
                                            {
                                                "w:iCs": {},
                                            },
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
    describe("#border", () => {
        it("should correctly set the border", () => {
            const run = new Run({
                border: {
                    color: "auto",
                    space: 1,
                    style: BorderStyle.SINGLE,
                    size: 6,
                },
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [
                    {
                        "hp:charPr": [
                            {
                                "w:bdr": {
                                    _attr: {
                                        "hp:color": "auto",
                                        "hp:space": 1,
                                        "hp:sz": 6,
                                        "hp:val": "single",
                                    },
                                },
                            },
                        ],
                    },
                ],
            });
        });
    });
    describe("#vanish and #specVanish", () => {
        it("should correctly set vanish", () => {
            const run = new Run({
                vanish: true,
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [
                    {
                        "hp:charPr": [
                            {
                                "w:vanish": {},
                            },
                        ],
                    },
                ],
            });
        });
        it("should correctly set specVanish", () => {
            const run = new Run({
                specVanish: true,
            });
            const tree = new Formatter().format(run);
            expect(tree).to.deep.equal({
                "hp:run": [
                    {
                        "hp:charPr": [
                            {
                                "w:specVanish": {},
                            },
                        ],
                    },
                ],
            });
        });
        describe("#scale", () => {
            it("should correctly set the border", () => {
                const run = new Run({
                    scale: 200,
                });
                const tree = new Formatter().format(run);
                expect(tree).to.deep.equal({
                    "hp:run": [
                        {
                            "hp:charPr": [
                                {
                                    "hp:w": {
                                        _attr: {
                                            "hp:val": 200,
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                });
            });
        });
        describe("#language", () => {
            it("should correctly set the language", () => {
                const run = new Run({
                    language: {
                        value: "en-US",
                        eastAsia: "zh-CN",
                        bidirectional: "ar-SA",
                    },
                });
                const tree = new Formatter().format(run);
                expect(tree).to.deep.equal({
                    "hp:run": [
                        {
                            "hp:charPr": [
                                {
                                    "hp:language": {
                                        _attr: {
                                            "hp:val": "en-US",
                                            "hp:eastAsia": "zh-CN",
                                            "hp:bidi": "ar-SA",
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                });
            });
        });
        describe("#position", () => {
            it("should correctly set the position", () => {
                const run = new Run({
                    position: "2mm",
                });
                const tree = new Formatter().format(run);
                expect(tree).to.deep.equal({
                    "hp:run": [
                        {
                            "hp:charPr": [
                                {
                                    "w:position": {
                                        _attr: {
                                            "hp:val": "2mm",
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                });
            });
        });
        describe("#effect", () => {
            it("should correctly set the effect", () => {
                const run = new Run({
                    effect: TextEffect.ANTS_BLACK,
                });
                const tree = new Formatter().format(run);
                expect(tree).to.deep.equal({
                    "hp:run": [
                        {
                            "hp:charPr": [
                                {
                                    "w:effect": {
                                        _attr: {
                                            "hp:val": "antsBlack",
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                });
            });
        });
        describe("#math", () => {
            it("should correctly set the math", () => {
                const run = new Run({
                    math: true,
                });
                const tree = new Formatter().format(run);
                expect(tree).to.deep.equal({
                    "hp:run": [
                        {
                            "hp:charPr": [
                                {
                                    "w:oMath": {},
                                },
                            ],
                        },
                    ],
                });
            });
        });
        describe("#kern", () => {
            it("should correctly set the kern", () => {
                const run = new Run({
                    kern: "2mm",
                });
                const tree = new Formatter().format(run);
                expect(tree).to.deep.equal({
                    "hp:run": [
                        {
                            "hp:charPr": [
                                {
                                    "hp:kern": {
                                        _attr: {
                                            "hp:val": "2mm",
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                });
            });
        });
        describe("#snapToGrid", () => {
            it("should correctly set the snapToGrid", () => {
                const run = new Run({
                    snapToGrid: true,
                });
                const tree = new Formatter().format(run);
                expect(tree).to.deep.equal({
                    "hp:run": [
                        {
                            "hp:charPr": [
                                {
                                    "w:snapToGrid": {},
                                },
                            ],
                        },
                    ],
                });
            });
        });
    });
});
//# sourceMappingURL=run.spec.js.map