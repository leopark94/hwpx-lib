import { describe, expect, it } from "vitest";

import { Formatter } from "@export/formatter";
import { EmphasisMarkType } from "@file/paragraph/run/emphasis-mark";
import { HighlightColor } from "@file/paragraph/run/properties";
import { UnderlineType } from "@file/paragraph/run/underline";
import { ShadingType } from "@file/shading";
import { EMPTY_OBJECT } from "@file/xml-components";

import { StyleForCharacter } from "./character-style";

describe("CharacterStyle", () => {
    describe("#constructor", () => {
        it("should set the style type to character and use the given style id", () => {
            const style = new StyleForCharacter({ id: "myStyleId" });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "character", "hh:styleId": "myStyleId" } },
                    {
                        "hh:uiPriority": {
                            _attr: {
                                "hp:val": 99,
                            },
                        },
                    },
                    {
                        "hh:unhideWhenUsed": EMPTY_OBJECT,
                    },
                ],
            });
        });

        it("should set the name of the style, if given", () => {
            const style = new StyleForCharacter({
                id: "myStyleId",
                name: "Style Name",
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "character", "hh:styleId": "myStyleId" } },
                    { "hh:name": { _attr: { "hp:val": "Style Name" } } },
                    {
                        "hh:uiPriority": {
                            _attr: {
                                "hp:val": 99,
                            },
                        },
                    },
                    {
                        "hh:unhideWhenUsed": EMPTY_OBJECT,
                    },
                ],
            });
        });

        it("should add smallCaps", () => {
            const style = new StyleForCharacter({
                id: "myStyleId",
                run: {
                    smallCaps: true,
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "character", "hh:styleId": "myStyleId" } },
                    {
                        "hh:uiPriority": {
                            _attr: {
                                "hp:val": 99,
                            },
                        },
                    },
                    {
                        "hh:unhideWhenUsed": EMPTY_OBJECT,
                    },
                    {
                        "hp:charPr": [{ "w:smallCaps": {} }],
                    },
                ],
            });
        });

        it("should add allCaps", () => {
            const style = new StyleForCharacter({
                id: "myStyleId",
                run: {
                    allCaps: true,
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "character", "hh:styleId": "myStyleId" } },
                    {
                        "hh:uiPriority": {
                            _attr: {
                                "hp:val": 99,
                            },
                        },
                    },
                    {
                        "hh:unhideWhenUsed": EMPTY_OBJECT,
                    },
                    {
                        "hp:charPr": [{ "w:caps": {} }],
                    },
                ],
            });
        });

        it("should add strike", () => {
            const style = new StyleForCharacter({
                id: "myStyleId",
                run: {
                    strike: true,
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "character", "hh:styleId": "myStyleId" } },
                    {
                        "hh:uiPriority": {
                            _attr: {
                                "hp:val": 99,
                            },
                        },
                    },
                    {
                        "hh:unhideWhenUsed": EMPTY_OBJECT,
                    },
                    {
                        "hp:charPr": [{ "hp:strikeout": {} }],
                    },
                ],
            });
        });

        it("should add double strike", () => {
            const style = new StyleForCharacter({
                id: "myStyleId",
                run: {
                    doubleStrike: true,
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "character", "hh:styleId": "myStyleId" } },
                    {
                        "hh:uiPriority": {
                            _attr: {
                                "hp:val": 99,
                            },
                        },
                    },
                    {
                        "hh:unhideWhenUsed": EMPTY_OBJECT,
                    },
                    {
                        "hp:charPr": [{ "w:dstrike": {} }],
                    },
                ],
            });
        });

        it("should add sub script", () => {
            const style = new StyleForCharacter({
                id: "myStyleId",
                run: {
                    subScript: true,
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "character", "hh:styleId": "myStyleId" } },
                    {
                        "hh:uiPriority": {
                            _attr: {
                                "hp:val": 99,
                            },
                        },
                    },
                    {
                        "hh:unhideWhenUsed": EMPTY_OBJECT,
                    },
                    {
                        "hp:charPr": [
                            {
                                "w:vertAlign": {
                                    _attr: {
                                        "hp:val": "subscript",
                                    },
                                },
                            },
                        ],
                    },
                ],
            });
        });

        it("should add font by name", () => {
            const style = new StyleForCharacter({
                id: "myStyleId",
                run: {
                    font: "test font",
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "character", "hh:styleId": "myStyleId" } },
                    {
                        "hh:uiPriority": {
                            _attr: {
                                "hp:val": 99,
                            },
                        },
                    },
                    {
                        "hh:unhideWhenUsed": EMPTY_OBJECT,
                    },
                    {
                        "hp:charPr": [
                            {
                                "hp:rFonts": {
                                    _attr: {
                                        "w:ascii": "test font",
                                        "w:cs": "test font",
                                        "hp:eastAsia": "test font",
                                        "w:hAnsi": "test font",
                                    },
                                },
                            },
                        ],
                    },
                ],
            });
        });

        it("should add font for ascii and eastAsia", () => {
            const style = new StyleForCharacter({
                id: "myStyleId",
                run: {
                    font: {
                        ascii: "test font ascii",
                        eastAsia: "test font eastAsia",
                    },
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "character", "hh:styleId": "myStyleId" } },
                    {
                        "hh:uiPriority": {
                            _attr: {
                                "hp:val": 99,
                            },
                        },
                    },
                    {
                        "hh:unhideWhenUsed": EMPTY_OBJECT,
                    },
                    {
                        "hp:charPr": [
                            {
                                "hp:rFonts": {
                                    _attr: {
                                        "w:ascii": "test font ascii",
                                        "hp:eastAsia": "test font eastAsia",
                                    },
                                },
                            },
                        ],
                    },
                ],
            });
        });

        it("should add character spacing", () => {
            const style = new StyleForCharacter({
                id: "myStyleId",
                run: {
                    characterSpacing: 100,
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "character", "hh:styleId": "myStyleId" } },
                    {
                        "hh:uiPriority": {
                            _attr: {
                                "hp:val": 99,
                            },
                        },
                    },
                    {
                        "hh:unhideWhenUsed": EMPTY_OBJECT,
                    },
                    {
                        "hp:charPr": [{ "hp:lineSpacing": { _attr: { "hp:val": 100 } } }],
                    },
                ],
            });
        });
    });

    describe("formatting methods: style attributes", () => {
        it("#basedOn", () => {
            const style = new StyleForCharacter({ id: "myStyleId", basedOn: "otherId" });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "character", "hh:styleId": "myStyleId" } },
                    { "hh:basedOn": { _attr: { "hp:val": "otherId" } } },
                    {
                        "hh:uiPriority": {
                            _attr: {
                                "hp:val": 99,
                            },
                        },
                    },
                    {
                        "hh:unhideWhenUsed": EMPTY_OBJECT,
                    },
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
                const style = new StyleForCharacter({
                    id: "myStyleId",
                    run: { size, sizeComplexScript },
                });
                const tree = new Formatter().format(style);
                expect(tree).to.deep.equal({
                    "hh:style": [
                        { _attr: { "hp:type": "character", "hh:styleId": "myStyleId" } },
                        {
                            "hh:uiPriority": {
                                _attr: {
                                    "hp:val": 99,
                                },
                            },
                        },
                        {
                            "hh:unhideWhenUsed": EMPTY_OBJECT,
                        },
                        {
                            "hp:charPr": expected,
                        },
                    ],
                });
            });
        });

        describe("#underline", () => {
            it("should set underline to 'single' if no arguments are given", () => {
                const style = new StyleForCharacter({
                    id: "myStyleId",
                    run: {
                        underline: {},
                    },
                });
                const tree = new Formatter().format(style);
                expect(tree).to.deep.equal({
                    "hh:style": [
                        { _attr: { "hp:type": "character", "hh:styleId": "myStyleId" } },
                        {
                            "hh:uiPriority": {
                                _attr: {
                                    "hp:val": 99,
                                },
                            },
                        },
                        {
                            "hh:unhideWhenUsed": EMPTY_OBJECT,
                        },
                        {
                            "hp:charPr": [{ "hp:underline": { _attr: { "hp:val": "single" } } }],
                        },
                    ],
                });
            });

            it("should set the style if given", () => {
                const style = new StyleForCharacter({
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
                        { _attr: { "hp:type": "character", "hh:styleId": "myStyleId" } },
                        {
                            "hh:uiPriority": {
                                _attr: {
                                    "hp:val": 99,
                                },
                            },
                        },
                        {
                            "hh:unhideWhenUsed": EMPTY_OBJECT,
                        },
                        {
                            "hp:charPr": [{ "hp:underline": { _attr: { "hp:val": "double" } } }],
                        },
                    ],
                });
            });

            it("should set the style and color if given", () => {
                const style = new StyleForCharacter({
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
                        { _attr: { "hp:type": "character", "hh:styleId": "myStyleId" } },
                        {
                            "hh:uiPriority": {
                                _attr: {
                                    "hp:val": 99,
                                },
                            },
                        },
                        {
                            "hh:unhideWhenUsed": EMPTY_OBJECT,
                        },
                        {
                            "hp:charPr": [{ "hp:underline": { _attr: { "hp:val": "double", "hp:color": "005599" } } }],
                        },
                    ],
                });
            });
        });

        describe("#emphasisMark", () => {
            it("should set emphasisMark to 'dot' if no arguments are given", () => {
                const style = new StyleForCharacter({
                    id: "myStyleId",
                    run: {
                        emphasisMark: {},
                    },
                });
                const tree = new Formatter().format(style);
                expect(tree).to.deep.equal({
                    "hh:style": [
                        { _attr: { "hp:type": "character", "hh:styleId": "myStyleId" } },
                        {
                            "hh:uiPriority": {
                                _attr: {
                                    "hp:val": 99,
                                },
                            },
                        },
                        {
                            "hh:unhideWhenUsed": EMPTY_OBJECT,
                        },
                        {
                            "hp:charPr": [{ "w:em": { _attr: { "hp:val": "dot" } } }],
                        },
                    ],
                });
            });

            it("should set the style if given", () => {
                const style = new StyleForCharacter({
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
                        { _attr: { "hp:type": "character", "hh:styleId": "myStyleId" } },
                        {
                            "hh:uiPriority": {
                                _attr: {
                                    "hp:val": 99,
                                },
                            },
                        },
                        {
                            "hh:unhideWhenUsed": EMPTY_OBJECT,
                        },
                        {
                            "hp:charPr": [{ "w:em": { _attr: { "hp:val": "dot" } } }],
                        },
                    ],
                });
            });
        });

        it("#superScript", () => {
            const style = new StyleForCharacter({
                id: "myStyleId",
                run: {
                    superScript: true,
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "character", "hh:styleId": "myStyleId" } },
                    {
                        "hh:uiPriority": {
                            _attr: {
                                "hp:val": 99,
                            },
                        },
                    },
                    {
                        "hh:unhideWhenUsed": EMPTY_OBJECT,
                    },
                    {
                        "hp:charPr": [
                            {
                                "w:vertAlign": {
                                    _attr: {
                                        "hp:val": "superscript",
                                    },
                                },
                            },
                        ],
                    },
                ],
            });
        });

        it("#color", () => {
            const style = new StyleForCharacter({
                id: "myStyleId",
                run: {
                    color: "123456",
                },
            });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "character", "hh:styleId": "myStyleId" } },
                    {
                        "hh:uiPriority": {
                            _attr: {
                                "hp:val": 99,
                            },
                        },
                    },
                    {
                        "hh:unhideWhenUsed": EMPTY_OBJECT,
                    },
                    {
                        "hp:charPr": [{ "hp:color": { _attr: { "hp:val": "123456" } } }],
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
                const style = new StyleForCharacter({
                    id: "myStyleId",
                    run: { bold, boldComplexScript },
                });
                const tree = new Formatter().format(style);
                expect(tree).to.deep.equal({
                    "hh:style": [
                        { _attr: { "hp:type": "character", "hh:styleId": "myStyleId" } },
                        {
                            "hh:uiPriority": {
                                _attr: {
                                    "hp:val": 99,
                                },
                            },
                        },
                        {
                            "hh:unhideWhenUsed": EMPTY_OBJECT,
                        },
                        {
                            "hp:charPr": expected,
                        },
                    ],
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
                const style = new StyleForCharacter({
                    id: "myStyleId",
                    run: { italics, italicsComplexScript },
                });
                const tree = new Formatter().format(style);
                expect(tree).to.deep.equal({
                    "hh:style": [
                        { _attr: { "hp:type": "character", "hh:styleId": "myStyleId" } },
                        {
                            "hh:uiPriority": {
                                _attr: {
                                    "hp:val": 99,
                                },
                            },
                        },
                        {
                            "hh:unhideWhenUsed": EMPTY_OBJECT,
                        },
                        {
                            "hp:charPr": expected,
                        },
                    ],
                });
            });
        });

        it("#link", () => {
            const style = new StyleForCharacter({ id: "myStyleId", link: "MyLink" });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "character", "hh:styleId": "myStyleId" } },
                    { "hh:link": { _attr: { "hp:val": "MyLink" } } },
                    {
                        "hh:uiPriority": {
                            _attr: {
                                "hp:val": 99,
                            },
                        },
                    },
                    {
                        "hh:unhideWhenUsed": EMPTY_OBJECT,
                    },
                ],
            });
        });

        it("#semiHidden", () => {
            const style = new StyleForCharacter({ id: "myStyleId", semiHidden: true });
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hh:style": [
                    { _attr: { "hp:type": "character", "hh:styleId": "myStyleId" } },
                    {
                        "hh:uiPriority": {
                            _attr: {
                                "hp:val": 99,
                            },
                        },
                    },
                    { "hh:semiHidden": EMPTY_OBJECT },
                    { "hh:unhideWhenUsed": EMPTY_OBJECT },
                ],
            });
        });

        const highlightTests = [
            {
                highlight: HighlightColor.YELLOW,
                expected: [{ "w:highlight": { _attr: { "hp:val": "yellow" } } }, { "w:highlightCs": { _attr: { "hp:val": "yellow" } } }],
            },
            {
                highlight: HighlightColor.YELLOW,
                highlightComplexScript: true,
                expected: [{ "w:highlight": { _attr: { "hp:val": "yellow" } } }, { "w:highlightCs": { _attr: { "hp:val": "yellow" } } }],
            },
            {
                highlight: HighlightColor.YELLOW,
                highlightComplexScript: false,
                expected: [{ "w:highlight": { _attr: { "hp:val": "yellow" } } }],
            },
            {
                highlight: HighlightColor.YELLOW,
                highlightComplexScript: "550099",
                expected: [{ "w:highlight": { _attr: { "hp:val": "yellow" } } }, { "w:highlightCs": { _attr: { "hp:val": "550099" } } }],
            },
        ];
        highlightTests.forEach(({ highlight, highlightComplexScript, expected }) => {
            it(`#highlight ${highlight} cs ${highlightComplexScript}`, () => {
                const style = new StyleForCharacter({
                    id: "myStyleId",
                    run: { highlight, highlightComplexScript },
                });
                const tree = new Formatter().format(style);
                expect(tree).to.deep.equal({
                    "hh:style": [
                        { _attr: { "hp:type": "character", "hh:styleId": "myStyleId" } },
                        {
                            "hh:uiPriority": {
                                _attr: {
                                    "hp:val": 99,
                                },
                            },
                        },
                        {
                            "hh:unhideWhenUsed": EMPTY_OBJECT,
                        },
                        {
                            "hp:charPr": expected,
                        },
                    ],
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
                expected: [{ "w:shd": { _attr: { "hp:val": "pct10", "hp:fill": "00FFFF", "hp:color": "FF0000" } } }],
            },
            {
                shading: {
                    type: ShadingType.SOLID,
                    fill: "AA0000",
                    color: "DD0000",
                },
                expected: [{ "w:shd": { _attr: { "hp:val": "solid", "hp:fill": "AA0000", "hp:color": "DD0000" } } }],
            },
        ];
        shadingTests.forEach(({ shading, expected }) => {
            it("#shadow correctly", () => {
                const style = new StyleForCharacter({
                    id: "myStyleId",
                    run: { shading },
                });
                const tree = new Formatter().format(style);
                expect(tree).to.deep.equal({
                    "hh:style": [
                        { _attr: { "hp:type": "character", "hh:styleId": "myStyleId" } },
                        {
                            "hh:uiPriority": {
                                _attr: {
                                    "hp:val": 99,
                                },
                            },
                        },
                        {
                            "hh:unhideWhenUsed": EMPTY_OBJECT,
                        },
                        {
                            "hp:charPr": expected,
                        },
                    ],
                });
            });
        });
    });
});
