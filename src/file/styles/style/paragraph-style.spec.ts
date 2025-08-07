import { describe, expect, it } from "vitest";

import { Formatter } from "@export/formatter";
import { AlignmentType, EmphasisMarkType, TabStopPosition } from "@file/paragraph";
import { HighlightColor } from "@file/paragraph/run";
import { UnderlineType } from "@file/paragraph/run/underline";
import { ShadingType } from "@file/shading";
import { EMPTY_OBJECT } from "@file/xml-components";

import { StyleForParagraph } from "./paragraph-style";

describe("ParagraphStyle", () => {
    describe("#constructor", () => {
        it("should set the style type to paragraph and use the given style id", () => {
            const style = new StyleForParagraph({ id: "myStyleId" });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": { _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } },
            });
        });

        it("should set the name of the style, if given", () => {
            const style = new StyleForParagraph({
                id: "myStyleId",
                name: "Style Name",
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } },
                    { "hh:name": { _attr: { "hp:val": "Style Name" } } },
                ],
            });
        });
    });

    describe("formatting methods: style attributes", () => {
        it("#basedOn", () => {
            const style = new StyleForParagraph({ id: "myStyleId", basedOn: "otherId" });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } },
                    { "hh:basedOn": { _attr: { "hp:val": "otherId" } } },
                ],
            });
        });

        it("#quickFormat", () => {
            const style = new StyleForParagraph({ id: "myStyleId", quickFormat: true });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    {
                        _attr: {
                            "hp:type": "paragraph",
                            "hh:styleId": "myStyleId",
                        },
                    },
                    { "hh:qFormat": EMPTY_OBJECT },
                ],
            });
        });

        it("#next", () => {
            const style = new StyleForParagraph({ id: "myStyleId", next: "otherId" });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } },
                    { "hh:next": { _attr: { "hp:val": "otherId" } } },
                ],
            });
        });
    });

    describe("formatting methods: paragraph properties", () => {
        it("#indent", () => {
            const style = new StyleForParagraph({
                id: "myStyleId",
                paragraph: {
                    indent: { left: 720, right: 500 },
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } },
                    {
                        "hp:paraPr": [{ "w:ind": { _attr: { "hp:left": 720, "hp:right": 500 } } }],
                    },
                ],
            });
        });

        it("#spacing", () => {
            const style = new StyleForParagraph({ id: "myStyleId", paragraph: { spacing: { before: 50, after: 150 } } });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } },
                    {
                        "hp:paraPr": [{ "hp:lineSpacing": { _attr: { "w:before": 50, "w:after": 150 } } }],
                    },
                ],
            });
        });

        it("#center", () => {
            const style = new StyleForParagraph({
                id: "myStyleId",
                paragraph: {
                    alignment: AlignmentType.CENTER,
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } },
                    {
                        "hp:paraPr": [{ "hp:align": { _attr: { "hp:val": "center" } } }],
                    },
                ],
            });
        });

        it("#character spacing", () => {
            const style = new StyleForParagraph({
                id: "myStyleId",
                run: {
                    characterSpacing: 24,
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } },
                    {
                        "hp:charPr": [{ "hp:lineSpacing": { _attr: { "hp:val": 24 } } }],
                    },
                ],
            });
        });

        it("#left", () => {
            const style = new StyleForParagraph({
                id: "myStyleId",
                paragraph: {
                    alignment: AlignmentType.LEFT,
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } },
                    {
                        "hp:paraPr": [{ "hp:align": { _attr: { "hp:val": "left" } } }],
                    },
                ],
            });
        });

        it("#right", () => {
            const style = new StyleForParagraph({
                id: "myStyleId",
                paragraph: {
                    alignment: AlignmentType.RIGHT,
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } },
                    {
                        "hp:paraPr": [{ "hp:align": { _attr: { "hp:val": "right" } } }],
                    },
                ],
            });
        });

        it("#justified", () => {
            const style = new StyleForParagraph({
                id: "myStyleId",
                paragraph: {
                    alignment: AlignmentType.JUSTIFIED,
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } },
                    {
                        "hp:paraPr": [{ "hp:align": { _attr: { "hp:val": "both" } } }],
                    },
                ],
            });
        });

        it("#thematicBreak", () => {
            const style = new StyleForParagraph({
                id: "myStyleId",
                paragraph: {
                    thematicBreak: true,
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } },
                    {
                        "hp:paraPr": [
                            {
                                "w:pBdr": [
                                    {
                                        "hp:bottom": {
                                            _attr: {
                                                "hp:color": "auto",
                                                "hp:space": 1,
                                                "hp:val": "single",
                                                "hp:sz": 6,
                                            },
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
        });

        it("#contextualSpacing", () => {
            const style = new StyleForParagraph({
                id: "myStyleId",
                paragraph: {
                    contextualSpacing: true,
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } },
                    {
                        "hp:paraPr": [
                            {
                                "w:contextualSpacing": {},
                            },
                        ],
                    },
                ],
            });
        });

        it("#leftTabStop", () => {
            const style = new StyleForParagraph({
                id: "myStyleId",
                paragraph: {
                    leftTabStop: 1200,
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } },
                    {
                        "hp:paraPr": [
                            {
                                "w:tabs": [{ "hp:tab": { _attr: { "hp:val": "left", "hp:pos": 1200 } } }],
                            },
                        ],
                    },
                ],
            });
        });

        it("#maxRightTabStop", () => {
            const style = new StyleForParagraph({
                id: "myStyleId",
                paragraph: {
                    rightTabStop: TabStopPosition.MAX,
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } },
                    {
                        "hp:paraPr": [
                            {
                                "w:tabs": [{ "hp:tab": { _attr: { "hp:val": "right", "hp:pos": 9026 } } }],
                            },
                        ],
                    },
                ],
            });
        });

        it("#keepLines", () => {
            const style = new StyleForParagraph({
                id: "myStyleId",
                paragraph: {
                    keepLines: true,
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    {
                        _attr: {
                            "hp:type": "paragraph",
                            "hh:styleId": "myStyleId",
                        },
                    },
                    { "hp:paraPr": [{ "w:keepLines": EMPTY_OBJECT }] },
                ],
            });
        });

        it("#keepNext", () => {
            const style = new StyleForParagraph({
                id: "myStyleId",
                paragraph: {
                    keepNext: true,
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    {
                        _attr: {
                            "hp:type": "paragraph",
                            "hh:styleId": "myStyleId",
                        },
                    },
                    { "hp:paraPr": [{ "w:keepNext": EMPTY_OBJECT }] },
                ],
            });
        });

        it("#outlineLevel", () => {
            const style = new StyleForParagraph({
                id: "myStyleId",
                paragraph: {
                    outlineLevel: 1,
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } },
                    { "hp:paraPr": [{ "w:outlineLvl": { _attr: { "hp:val": 1 } } }] },
                ],
            });
        });
    });

    describe("formatting methods: run properties", () => {
        const sizeTests = [
            {
                size: 24,
                expected: [{ "hp:sz": { _attr: { "hp:val": 24 } } }, { "w:szCs": { _attr: { "hp:val": 24 } } }],
            },
            {
                size: 24,
                sizeComplexScript: true,
                expected: [{ "hp:sz": { _attr: { "hp:val": 24 } } }, { "w:szCs": { _attr: { "hp:val": 24 } } }],
            },
            {
                size: 24,
                sizeComplexScript: false,
                expected: [{ "hp:sz": { _attr: { "hp:val": 24 } } }],
            },
            {
                size: 24,
                sizeComplexScript: 26,
                expected: [{ "hp:sz": { _attr: { "hp:val": 24 } } }, { "w:szCs": { _attr: { "hp:val": 26 } } }],
            },
        ];
        sizeTests.forEach(({ size, sizeComplexScript, expected }) => {
            it(`#size ${size} cs ${sizeComplexScript}`, () => {
                const style = new StyleForParagraph({
                    id: "myStyleId",
                    run: { size, sizeComplexScript },
                });
                const tree = new Formatter().format(style);
                expect(tree).to.deep.equal({
                    "hh:style": [{ _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } }, { "hp:charPr": expected }],
                });
            });
        });

        it("#smallCaps", () => {
            const style = new StyleForParagraph({
                id: "myStyleId",
                run: {
                    smallCaps: true,
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } },
                    {
                        "hp:charPr": [{ "w:smallCaps": {} }],
                    },
                ],
            });
        });

        it("#allCaps", () => {
            const style = new StyleForParagraph({
                id: "myStyleId",
                run: {
                    allCaps: true,
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } },
                    {
                        "hp:charPr": [{ "w:caps": {} }],
                    },
                ],
            });
        });

        it("#strike", () => {
            const style = new StyleForParagraph({
                id: "myStyleId",
                run: {
                    strike: true,
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } },
                    {
                        "hp:charPr": [{ "hp:strikeout": {} }],
                    },
                ],
            });
        });

        it("#doubleStrike", () => {
            const style = new StyleForParagraph({
                id: "myStyleId",
                run: {
                    doubleStrike: true,
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } },
                    {
                        "hp:charPr": [{ "w:dstrike": {} }],
                    },
                ],
            });
        });

        it("#subScript", () => {
            const style = new StyleForParagraph({
                id: "myStyleId",
                run: {
                    subScript: true,
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } },
                    {
                        "hp:charPr": [{ "hp:vertAlign": { _attr: { "hp:val": "subscript" } } }],
                    },
                ],
            });
        });

        it("#superScript", () => {
            const style = new StyleForParagraph({
                id: "myStyleId",
                run: {
                    superScript: true,
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } },
                    {
                        "hp:charPr": [{ "hp:vertAlign": { _attr: { "hp:val": "superscript" } } }],
                    },
                ],
            });
        });

        it("#font by name", () => {
            const style = new StyleForParagraph({
                id: "myStyleId",
                run: {
                    font: "Times",
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } },
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

        it("#font for ascii and eastAsia", () => {
            const style = new StyleForParagraph({
                id: "myStyleId",
                run: {
                    font: {
                        ascii: "Times",
                        eastAsia: "KaiTi",
                    },
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } },
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

        const boldTests = [
            {
                bold: true,
                expected: [{ "hp:bold": {} }, { "w:bCs": {} }],
            },
            {
                bold: true,
                boldComplexScript: true,
                expected: [{ "hp:bold": {} }, { "w:bCs": {} }],
            },
            {
                bold: true,
                boldComplexScript: false,
                expected: [{ "hp:bold": {} }],
            },
        ];
        boldTests.forEach(({ bold, boldComplexScript, expected }) => {
            it(`#bold ${bold} cs ${boldComplexScript}`, () => {
                const style = new StyleForParagraph({
                    id: "myStyleId",
                    run: { bold, boldComplexScript },
                });
                const tree = new Formatter().format(style);
                expect(tree).to.deep.equal({
                    "hh:style": [{ _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } }, { "hp:charPr": expected }],
                });
            });
        });

        const italicsTests = [
            {
                italics: true,
                expected: [{ "hp:italic": {} }, { "w:iCs": {} }],
            },
            {
                italics: true,
                italicsComplexScript: true,
                expected: [{ "hp:italic": {} }, { "w:iCs": {} }],
            },
            {
                italics: true,
                italicsComplexScript: false,
                expected: [{ "hp:italic": {} }],
            },
        ];
        italicsTests.forEach(({ italics, italicsComplexScript, expected }) => {
            it(`#italics ${italics} cs ${italicsComplexScript}`, () => {
                const style = new StyleForParagraph({
                    id: "myStyleId",
                    run: { italics, italicsComplexScript },
                });
                const tree = new Formatter().format(style);
                expect(tree).to.deep.equal({
                    "hh:style": [{ _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } }, { "hp:charPr": expected }],
                });
            });
        });

        const highlightTests = [
            {
                highlight: HighlightColor.YELLOW,
                expected: [{ "hp:highlight": { _attr: { "hp:val": "yellow" } } }, { "w:highlightCs": { _attr: { "hp:val": "yellow" } } }],
            },
            {
                highlight: HighlightColor.YELLOW,
                highlightComplexScript: true,
                expected: [{ "hp:highlight": { _attr: { "hp:val": "yellow" } } }, { "w:highlightCs": { _attr: { "hp:val": "yellow" } } }],
            },
            {
                highlight: HighlightColor.YELLOW,
                highlightComplexScript: false,
                expected: [{ "hp:highlight": { _attr: { "hp:val": "yellow" } } }],
            },
            {
                highlight: HighlightColor.YELLOW,
                highlightComplexScript: "550099",
                expected: [{ "hp:highlight": { _attr: { "hp:val": "yellow" } } }, { "w:highlightCs": { _attr: { "hp:val": "550099" } } }],
            },
        ];
        highlightTests.forEach(({ highlight, highlightComplexScript, expected }) => {
            it(`#highlight ${highlight} cs ${highlightComplexScript}`, () => {
                const style = new StyleForParagraph({
                    id: "myStyleId",
                    run: { highlight, highlightComplexScript },
                });
                const tree = new Formatter().format(style);
                expect(tree).to.deep.equal({
                    "hh:style": [{ _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } }, { "hp:charPr": expected }],
                });
            });
        });

        const shadingTests = [
            {
                shading: {
                    type: ShadingType.PERCENT_10,
                    fill: "00FFFF",
                    color: "FF0000",
                },
                expected: [{ "hp:shd": { _attr: { "hp:val": "pct10", "hp:fill": "00FFFF", "hp:color": "FF0000" } } }],
            },
            {
                shading: {
                    type: ShadingType.DIAGONAL_CROSS,
                    fill: "0066FF",
                    color: "0000FF",
                },
                expected: [{ "hp:shd": { _attr: { "hp:val": "diagCross", "hp:fill": "0066FF", "hp:color": "0000FF" } } }],
            },
        ];
        shadingTests.forEach(({ shading, expected }) => {
            it("#shade correctly", () => {
                const style = new StyleForParagraph({
                    id: "myStyleId",
                    run: { shading },
                });
                const tree = new Formatter().format(style);
                expect(tree).to.deep.equal({
                    "hh:style": [{ _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } }, { "hp:charPr": expected }],
                });
            });
        });

        describe("#underline", () => {
            it("should set underline to 'single' if no arguments are given", () => {
                const style = new StyleForParagraph({
                    id: "myStyleId",
                    run: {
                        underline: {},
                    },
                });
                const tree = new Formatter().format(style);
                expect(tree).to.deep.equal({
                    "hh:style": [
                        { _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } },
                        {
                            "hp:charPr": [{ "hp:underline": { _attr: { "hp:val": "single" } } }],
                        },
                    ],
                });
            });

            it("should set the style if given", () => {
                const style = new StyleForParagraph({
                    id: "myStyleId",
                    run: {
                        underline: {
                            type: UnderlineType.DOUBLE,
                        },
                    },
                });
                const tree = new Formatter().format(style);
                expect(tree).to.deep.equal({
                    "hh:style": [
                        { _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } },
                        {
                            "hp:charPr": [{ "hp:underline": { _attr: { "hp:val": "double" } } }],
                        },
                    ],
                });
            });

            it("should set the style and color if given", () => {
                const style = new StyleForParagraph({
                    id: "myStyleId",
                    run: {
                        underline: {
                            type: UnderlineType.DOUBLE,
                            color: "005599",
                        },
                    },
                });
                const tree = new Formatter().format(style);
                expect(tree).to.deep.equal({
                    "hh:style": [
                        { _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } },
                        {
                            "hp:charPr": [{ "hp:underline": { _attr: { "hp:val": "double", "hp:color": "005599" } } }],
                        },
                    ],
                });
            });
        });

        describe("#emphasisMark", () => {
            it("should set emphasisMark to 'dot' if no arguments are given", () => {
                const style = new StyleForParagraph({
                    id: "myStyleId",
                    run: {
                        emphasisMark: {},
                    },
                });
                const tree = new Formatter().format(style);
                expect(tree).to.deep.equal({
                    "hh:style": [
                        { _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } },
                        {
                            "hp:charPr": [{ "w:em": { _attr: { "hp:val": "dot" } } }],
                        },
                    ],
                });
            });

            it("should set the style if given", () => {
                const style = new StyleForParagraph({
                    id: "myStyleId",
                    run: {
                        emphasisMark: {
                            type: EmphasisMarkType.DOT,
                        },
                    },
                });
                const tree = new Formatter().format(style);
                expect(tree).to.deep.equal({
                    "hh:style": [
                        { _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } },
                        {
                            "hp:charPr": [{ "w:em": { _attr: { "hp:val": "dot" } } }],
                        },
                    ],
                });
            });
        });

        it("#color", () => {
            const style = new StyleForParagraph({
                id: "myStyleId",
                run: {
                    color: "123456",
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } },
                    {
                        "hp:charPr": [{ "hp:color": { _attr: { "hp:val": "123456" } } }],
                    },
                ],
            });
        });

        it("#link", () => {
            const style = new StyleForParagraph({ id: "myStyleId", link: "MyLink" });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    {
                        _attr: {
                            "hp:type": "paragraph",
                            "hh:styleId": "myStyleId",
                        },
                    },
                    { "hh:link": { _attr: { "hp:val": "MyLink" } } },
                ],
            });
        });

        it("#semiHidden", () => {
            const style = new StyleForParagraph({ id: "myStyleId", semiHidden: true });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    {
                        _attr: {
                            "hp:type": "paragraph",
                            "hh:styleId": "myStyleId",
                        },
                    },
                    { "hh:semiHidden": EMPTY_OBJECT },
                ],
            });
        });

        it("#uiPriority", () => {
            const style = new StyleForParagraph({ id: "myStyleId", uiPriority: 99 });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "paragraph", "hh:styleId": "myStyleId" } },
                    {
                        "hh:uiPriority": {
                            _attr: {
                                "hp:val": 99,
                            },
                        },
                    },
                ],
            });
        });

        it("#unhideWhenUsed", () => {
            const style = new StyleForParagraph({ id: "myStyleId", unhideWhenUsed: true });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    {
                        _attr: {
                            "hp:type": "paragraph",
                            "hh:styleId": "myStyleId",
                        },
                    },
                    { "hh:unhideWhenUsed": EMPTY_OBJECT },
                ],
            });
        });
    });
});
