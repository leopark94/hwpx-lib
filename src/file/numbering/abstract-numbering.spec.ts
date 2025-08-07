import { describe, expect, it } from "vitest";

import { Formatter } from "@export/formatter";

import { AlignmentType, EmphasisMarkType, TabStopPosition } from "../paragraph";
import { HighlightColor } from "../paragraph/run/properties";
import { UnderlineType } from "../paragraph/run/underline";
import { ShadingType } from "../shading";
import { AbstractNumbering } from "./abstract-numbering";
import { LevelFormat, LevelSuffix } from "./level";

describe("AbstractNumbering", () => {
    it("stores its ID at its .id property", () => {
        const abstractNumbering = new AbstractNumbering(5, []);
        expect(abstractNumbering.id).to.equal(5);
    });

    describe("#createLevel", () => {
        it("creates a level with the given characteristics", () => {
            const abstractNumbering = new AbstractNumbering(1, [
                {
                    level: 3,
                    format: LevelFormat.LOWER_LETTER,
                    text: "%1)",
                    alignment: AlignmentType.END,
                },
            ]);
            const tree = new Formatter().format(abstractNumbering);
            expect(tree).to.deep.equal({
                "w:abstractNum": [
                    {
                        _attr: {
                            "w15:restartNumberingAfterBreak": 0,
                            "w:abstractNumId": 1,
                        },
                    },
                    {
                        "w:multiLevelType": {
                            _attr: {
                                "hp:val": "hybridMultilevel",
                            },
                        },
                    },
                    {
                        "w:lvl": [
                            {
                                "w:start": {
                                    _attr: {
                                        "hp:val": 1,
                                    },
                                },
                            },
                            {
                                "w:numFmt": {
                                    _attr: {
                                        "hp:val": LevelFormat.LOWER_LETTER,
                                    },
                                },
                            },
                            {
                                "w:lvlText": {
                                    _attr: {
                                        "hp:val": "%1)",
                                    },
                                },
                            },
                            {
                                "w:lvlJc": {
                                    _attr: {
                                        "hp:val": "end",
                                    },
                                },
                            },
                            {
                                _attr: {
                                    "w15:tentative": 1,
                                    "w:ilvl": 3,
                                },
                            },
                        ],
                    },
                ],
            });
        });

        it("uses 'start' as the default alignment", () => {
            const abstractNumbering = new AbstractNumbering(1, [
                {
                    level: 3,
                    format: LevelFormat.LOWER_LETTER,
                    text: "%1)",
                },
            ]);
            const tree = new Formatter().format(abstractNumbering);
            expect(tree).to.deep.equal({
                "w:abstractNum": [
                    {
                        _attr: {
                            "w15:restartNumberingAfterBreak": 0,
                            "w:abstractNumId": 1,
                        },
                    },
                    {
                        "w:multiLevelType": {
                            _attr: {
                                "hp:val": "hybridMultilevel",
                            },
                        },
                    },
                    {
                        "w:lvl": [
                            {
                                "w:start": {
                                    _attr: {
                                        "hp:val": 1,
                                    },
                                },
                            },
                            {
                                "w:numFmt": {
                                    _attr: {
                                        "hp:val": LevelFormat.LOWER_LETTER,
                                    },
                                },
                            },
                            {
                                "w:lvlText": {
                                    _attr: {
                                        "hp:val": "%1)",
                                    },
                                },
                            },
                            {
                                "w:lvlJc": {
                                    _attr: {
                                        "hp:val": "start",
                                    },
                                },
                            },
                            {
                                _attr: {
                                    "w15:tentative": 1,
                                    "w:ilvl": 3,
                                },
                            },
                        ],
                    },
                ],
            });
        });

        it("has suffix", () => {
            const abstractNumbering = new AbstractNumbering(1, [
                {
                    level: 3,
                    format: LevelFormat.LOWER_LETTER,
                    text: "%1)",
                    alignment: AlignmentType.END,
                    suffix: LevelSuffix.SPACE,
                },
            ]);
            const tree = new Formatter().format(abstractNumbering);
            expect(tree).to.deep.equal({
                "w:abstractNum": [
                    {
                        _attr: {
                            "w15:restartNumberingAfterBreak": 0,
                            "w:abstractNumId": 1,
                        },
                    },
                    {
                        "w:multiLevelType": {
                            _attr: {
                                "hp:val": "hybridMultilevel",
                            },
                        },
                    },
                    {
                        "w:lvl": [
                            {
                                "w:start": {
                                    _attr: {
                                        "hp:val": 1,
                                    },
                                },
                            },
                            {
                                "w:numFmt": {
                                    _attr: {
                                        "hp:val": "lowerLetter",
                                    },
                                },
                            },
                            {
                                "w:suff": {
                                    _attr: {
                                        "hp:val": "space",
                                    },
                                },
                            },
                            {
                                "w:lvlText": {
                                    _attr: {
                                        "hp:val": "%1)",
                                    },
                                },
                            },
                            {
                                "w:lvlJc": {
                                    _attr: {
                                        "hp:val": "end",
                                    },
                                },
                            },
                            {
                                _attr: {
                                    "w15:tentative": 1,
                                    "w:ilvl": 3,
                                },
                            },
                        ],
                    },
                ],
            });
            // expect(tree["hp:abstractNum"][2]["w:lvl"]).to.include({ "w:suff": { _attr: { "hp:val": "space" } } });
        });

        describe("formatting methods: paragraph properties", () => {
            it("#indent", () => {
                const abstractNumbering = new AbstractNumbering(1, [
                    {
                        level: 0,
                        format: LevelFormat.LOWER_ROMAN,
                        text: "%0.",
                        style: {
                            paragraph: {
                                indent: { left: 720 },
                            },
                        },
                    },
                ]);
                const tree = new Formatter().format(abstractNumbering);
                expect(tree).to.deep.equal({
                    "w:abstractNum": [
                        {
                            _attr: {
                                "w15:restartNumberingAfterBreak": 0,
                                "w:abstractNumId": 1,
                            },
                        },
                        {
                            "w:multiLevelType": {
                                _attr: {
                                    "hp:val": "hybridMultilevel",
                                },
                            },
                        },
                        {
                            "w:lvl": [
                                {
                                    "w:start": {
                                        _attr: {
                                            "hp:val": 1,
                                        },
                                    },
                                },
                                {
                                    "w:numFmt": {
                                        _attr: {
                                            "hp:val": "lowerRoman",
                                        },
                                    },
                                },
                                {
                                    "w:lvlText": {
                                        _attr: {
                                            "hp:val": "%0.",
                                        },
                                    },
                                },
                                {
                                    "w:lvlJc": {
                                        _attr: {
                                            "hp:val": "start",
                                        },
                                    },
                                },
                                {
                                    "hp:paraPr": [
                                        {
                                            "w:ind": {
                                                _attr: {
                                                    "hp:left": 720,
                                                },
                                            },
                                        },
                                    ],
                                },
                                {
                                    _attr: {
                                        "w15:tentative": 1,
                                        "w:ilvl": 0,
                                    },
                                },
                            ],
                        },
                    ],
                });
            });

            it("#spacing", () => {
                const abstractNumbering = new AbstractNumbering(1, [
                    {
                        level: 0,
                        format: LevelFormat.LOWER_ROMAN,
                        text: "%0.",
                        style: {
                            paragraph: {
                                spacing: { before: 50, after: 150 },
                            },
                        },
                    },
                ]);
                const tree = new Formatter().format(abstractNumbering);
                expect(tree).to.deep.equal({
                    "w:abstractNum": [
                        {
                            _attr: {
                                "w15:restartNumberingAfterBreak": 0,
                                "w:abstractNumId": 1,
                            },
                        },
                        {
                            "w:multiLevelType": {
                                _attr: {
                                    "hp:val": "hybridMultilevel",
                                },
                            },
                        },
                        {
                            "w:lvl": [
                                {
                                    "w:start": {
                                        _attr: {
                                            "hp:val": 1,
                                        },
                                    },
                                },
                                {
                                    "w:numFmt": {
                                        _attr: {
                                            "hp:val": "lowerRoman",
                                        },
                                    },
                                },
                                {
                                    "w:lvlText": {
                                        _attr: {
                                            "hp:val": "%0.",
                                        },
                                    },
                                },
                                {
                                    "w:lvlJc": {
                                        _attr: {
                                            "hp:val": "start",
                                        },
                                    },
                                },
                                {
                                    "hp:paraPr": [
                                        {
                                            "hp:lineSpacing": {
                                                _attr: {
                                                    "w:after": 150,
                                                    "w:before": 50,
                                                },
                                            },
                                        },
                                    ],
                                },
                                {
                                    _attr: {
                                        "w15:tentative": 1,
                                        "w:ilvl": 0,
                                    },
                                },
                            ],
                        },
                    ],
                });
            });

            it("#center", () => {
                const abstractNumbering = new AbstractNumbering(1, [
                    {
                        level: 0,
                        format: LevelFormat.LOWER_ROMAN,
                        text: "%0.",
                        style: {
                            paragraph: {
                                alignment: AlignmentType.CENTER,
                            },
                        },
                    },
                ]);
                const tree = new Formatter().format(abstractNumbering);
                expect(tree).to.deep.equal({
                    "w:abstractNum": [
                        {
                            _attr: {
                                "w15:restartNumberingAfterBreak": 0,
                                "w:abstractNumId": 1,
                            },
                        },
                        {
                            "w:multiLevelType": {
                                _attr: {
                                    "hp:val": "hybridMultilevel",
                                },
                            },
                        },
                        {
                            "w:lvl": [
                                {
                                    "w:start": {
                                        _attr: {
                                            "hp:val": 1,
                                        },
                                    },
                                },
                                {
                                    "w:numFmt": {
                                        _attr: {
                                            "hp:val": "lowerRoman",
                                        },
                                    },
                                },
                                {
                                    "w:lvlText": {
                                        _attr: {
                                            "hp:val": "%0.",
                                        },
                                    },
                                },
                                {
                                    "w:lvlJc": {
                                        _attr: {
                                            "hp:val": "start",
                                        },
                                    },
                                },
                                {
                                    "hp:paraPr": [
                                        {
                                            "hp:align": {
                                                _attr: {
                                                    "hp:val": "center",
                                                },
                                            },
                                        },
                                    ],
                                },
                                {
                                    _attr: {
                                        "w15:tentative": 1,
                                        "w:ilvl": 0,
                                    },
                                },
                            ],
                        },
                    ],
                });
            });

            it("#left", () => {
                const abstractNumbering = new AbstractNumbering(1, [
                    {
                        level: 0,
                        format: LevelFormat.LOWER_ROMAN,
                        text: "%0.",
                        style: {
                            paragraph: {
                                alignment: AlignmentType.LEFT,
                            },
                        },
                    },
                ]);
                const tree = new Formatter().format(abstractNumbering);
                expect(tree).to.deep.equal({
                    "w:abstractNum": [
                        {
                            _attr: {
                                "w15:restartNumberingAfterBreak": 0,
                                "w:abstractNumId": 1,
                            },
                        },
                        {
                            "w:multiLevelType": {
                                _attr: {
                                    "hp:val": "hybridMultilevel",
                                },
                            },
                        },
                        {
                            "w:lvl": [
                                {
                                    "w:start": {
                                        _attr: {
                                            "hp:val": 1,
                                        },
                                    },
                                },
                                {
                                    "w:numFmt": {
                                        _attr: {
                                            "hp:val": "lowerRoman",
                                        },
                                    },
                                },
                                {
                                    "w:lvlText": {
                                        _attr: {
                                            "hp:val": "%0.",
                                        },
                                    },
                                },
                                {
                                    "w:lvlJc": {
                                        _attr: {
                                            "hp:val": "start",
                                        },
                                    },
                                },
                                {
                                    "hp:paraPr": [
                                        {
                                            "hp:align": {
                                                _attr: {
                                                    "hp:val": "left",
                                                },
                                            },
                                        },
                                    ],
                                },
                                {
                                    _attr: {
                                        "w15:tentative": 1,
                                        "w:ilvl": 0,
                                    },
                                },
                            ],
                        },
                    ],
                });
            });

            it("#right", () => {
                const abstractNumbering = new AbstractNumbering(1, [
                    {
                        level: 0,
                        format: LevelFormat.LOWER_ROMAN,
                        text: "%0.",
                        style: {
                            paragraph: {
                                alignment: AlignmentType.RIGHT,
                            },
                        },
                    },
                ]);
                const tree = new Formatter().format(abstractNumbering);
                expect(tree).to.deep.equal({
                    "w:abstractNum": [
                        {
                            _attr: {
                                "w15:restartNumberingAfterBreak": 0,
                                "w:abstractNumId": 1,
                            },
                        },
                        {
                            "w:multiLevelType": {
                                _attr: {
                                    "hp:val": "hybridMultilevel",
                                },
                            },
                        },
                        {
                            "w:lvl": [
                                {
                                    "w:start": {
                                        _attr: {
                                            "hp:val": 1,
                                        },
                                    },
                                },
                                {
                                    "w:numFmt": {
                                        _attr: {
                                            "hp:val": "lowerRoman",
                                        },
                                    },
                                },
                                {
                                    "w:lvlText": {
                                        _attr: {
                                            "hp:val": "%0.",
                                        },
                                    },
                                },
                                {
                                    "w:lvlJc": {
                                        _attr: {
                                            "hp:val": "start",
                                        },
                                    },
                                },
                                {
                                    "hp:paraPr": [
                                        {
                                            "hp:align": {
                                                _attr: {
                                                    "hp:val": "right",
                                                },
                                            },
                                        },
                                    ],
                                },
                                {
                                    _attr: {
                                        "w15:tentative": 1,
                                        "w:ilvl": 0,
                                    },
                                },
                            ],
                        },
                    ],
                });
            });

            it("#justified", () => {
                const abstractNumbering = new AbstractNumbering(1, [
                    {
                        level: 0,
                        format: LevelFormat.LOWER_ROMAN,
                        text: "%0.",
                        style: {
                            paragraph: {
                                alignment: AlignmentType.JUSTIFIED,
                            },
                        },
                    },
                ]);
                const tree = new Formatter().format(abstractNumbering);
                expect(tree).to.deep.equal({
                    "w:abstractNum": [
                        {
                            _attr: {
                                "w15:restartNumberingAfterBreak": 0,
                                "w:abstractNumId": 1,
                            },
                        },
                        {
                            "w:multiLevelType": {
                                _attr: {
                                    "hp:val": "hybridMultilevel",
                                },
                            },
                        },
                        {
                            "w:lvl": [
                                {
                                    "w:start": {
                                        _attr: {
                                            "hp:val": 1,
                                        },
                                    },
                                },
                                {
                                    "w:numFmt": {
                                        _attr: {
                                            "hp:val": "lowerRoman",
                                        },
                                    },
                                },
                                {
                                    "w:lvlText": {
                                        _attr: {
                                            "hp:val": "%0.",
                                        },
                                    },
                                },
                                {
                                    "w:lvlJc": {
                                        _attr: {
                                            "hp:val": "start",
                                        },
                                    },
                                },
                                {
                                    "hp:paraPr": [
                                        {
                                            "hp:align": {
                                                _attr: {
                                                    "hp:val": "both",
                                                },
                                            },
                                        },
                                    ],
                                },
                                {
                                    _attr: {
                                        "w15:tentative": 1,
                                        "w:ilvl": 0,
                                    },
                                },
                            ],
                        },
                    ],
                });
            });

            it("#thematicBreak", () => {
                const abstractNumbering = new AbstractNumbering(1, [
                    {
                        level: 0,
                        format: LevelFormat.LOWER_ROMAN,
                        text: "%0.",
                        style: {
                            paragraph: {
                                thematicBreak: true,
                            },
                        },
                    },
                ]);
                const tree = new Formatter().format(abstractNumbering);
                expect(tree).to.deep.equal({
                    "w:abstractNum": [
                        {
                            _attr: {
                                "w15:restartNumberingAfterBreak": 0,
                                "w:abstractNumId": 1,
                            },
                        },
                        {
                            "w:multiLevelType": {
                                _attr: {
                                    "hp:val": "hybridMultilevel",
                                },
                            },
                        },
                        {
                            "w:lvl": [
                                {
                                    "w:start": {
                                        _attr: {
                                            "hp:val": 1,
                                        },
                                    },
                                },
                                {
                                    "w:numFmt": {
                                        _attr: {
                                            "hp:val": "lowerRoman",
                                        },
                                    },
                                },
                                {
                                    "w:lvlText": {
                                        _attr: {
                                            "hp:val": "%0.",
                                        },
                                    },
                                },
                                {
                                    "w:lvlJc": {
                                        _attr: {
                                            "hp:val": "start",
                                        },
                                    },
                                },
                                {
                                    "hp:paraPr": [
                                        {
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
                                        },
                                    ],
                                },
                                {
                                    _attr: {
                                        "w15:tentative": 1,
                                        "w:ilvl": 0,
                                    },
                                },
                            ],
                        },
                    ],
                });
            });

            it("#leftTabStop", () => {
                const abstractNumbering = new AbstractNumbering(1, [
                    {
                        level: 0,
                        format: LevelFormat.LOWER_ROMAN,
                        text: "%0.",
                        style: {
                            paragraph: {
                                leftTabStop: 1200,
                            },
                        },
                    },
                ]);
                const tree = new Formatter().format(abstractNumbering);
                expect(tree).to.deep.equal({
                    "w:abstractNum": [
                        {
                            _attr: {
                                "w15:restartNumberingAfterBreak": 0,
                                "w:abstractNumId": 1,
                            },
                        },
                        {
                            "w:multiLevelType": {
                                _attr: {
                                    "hp:val": "hybridMultilevel",
                                },
                            },
                        },
                        {
                            "w:lvl": [
                                {
                                    "w:start": {
                                        _attr: {
                                            "hp:val": 1,
                                        },
                                    },
                                },
                                {
                                    "w:numFmt": {
                                        _attr: {
                                            "hp:val": "lowerRoman",
                                        },
                                    },
                                },
                                {
                                    "w:lvlText": {
                                        _attr: {
                                            "hp:val": "%0.",
                                        },
                                    },
                                },
                                {
                                    "w:lvlJc": {
                                        _attr: {
                                            "hp:val": "start",
                                        },
                                    },
                                },
                                {
                                    "hp:paraPr": [
                                        {
                                            "w:tabs": [
                                                {
                                                    "hp:tab": {
                                                        _attr: {
                                                            "hp:pos": 1200,
                                                            "hp:val": "left",
                                                        },
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    _attr: {
                                        "w15:tentative": 1,
                                        "w:ilvl": 0,
                                    },
                                },
                            ],
                        },
                    ],
                });
            });

            it("#maxRightTabStop", () => {
                const abstractNumbering = new AbstractNumbering(1, [
                    {
                        level: 0,
                        format: LevelFormat.LOWER_ROMAN,
                        text: "%0.",
                        style: {
                            paragraph: {
                                rightTabStop: TabStopPosition.MAX,
                            },
                        },
                    },
                ]);
                const tree = new Formatter().format(abstractNumbering);
                expect(tree).to.deep.equal({
                    "w:abstractNum": [
                        {
                            _attr: {
                                "w15:restartNumberingAfterBreak": 0,
                                "w:abstractNumId": 1,
                            },
                        },
                        {
                            "w:multiLevelType": {
                                _attr: {
                                    "hp:val": "hybridMultilevel",
                                },
                            },
                        },
                        {
                            "w:lvl": [
                                {
                                    "w:start": {
                                        _attr: {
                                            "hp:val": 1,
                                        },
                                    },
                                },
                                {
                                    "w:numFmt": {
                                        _attr: {
                                            "hp:val": "lowerRoman",
                                        },
                                    },
                                },
                                {
                                    "w:lvlText": {
                                        _attr: {
                                            "hp:val": "%0.",
                                        },
                                    },
                                },
                                {
                                    "w:lvlJc": {
                                        _attr: {
                                            "hp:val": "start",
                                        },
                                    },
                                },
                                {
                                    "hp:paraPr": [
                                        {
                                            "w:tabs": [
                                                {
                                                    "hp:tab": {
                                                        _attr: {
                                                            "hp:pos": 9026,
                                                            "hp:val": "right",
                                                        },
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    _attr: {
                                        "w15:tentative": 1,
                                        "w:ilvl": 0,
                                    },
                                },
                            ],
                        },
                    ],
                });
            });

            it("#keepLines", () => {
                const abstractNumbering = new AbstractNumbering(1, [
                    {
                        level: 0,
                        format: LevelFormat.LOWER_ROMAN,
                        text: "%0.",
                        style: {
                            paragraph: {
                                keepLines: true,
                            },
                        },
                    },
                ]);
                const tree = new Formatter().format(abstractNumbering);
                expect(tree).to.deep.equal({
                    "w:abstractNum": [
                        {
                            _attr: {
                                "w15:restartNumberingAfterBreak": 0,
                                "w:abstractNumId": 1,
                            },
                        },
                        {
                            "w:multiLevelType": {
                                _attr: {
                                    "hp:val": "hybridMultilevel",
                                },
                            },
                        },
                        {
                            "w:lvl": [
                                {
                                    "w:start": {
                                        _attr: {
                                            "hp:val": 1,
                                        },
                                    },
                                },
                                {
                                    "w:numFmt": {
                                        _attr: {
                                            "hp:val": "lowerRoman",
                                        },
                                    },
                                },
                                {
                                    "w:lvlText": {
                                        _attr: {
                                            "hp:val": "%0.",
                                        },
                                    },
                                },
                                {
                                    "w:lvlJc": {
                                        _attr: {
                                            "hp:val": "start",
                                        },
                                    },
                                },
                                {
                                    "hp:paraPr": [
                                        {
                                            "w:keepLines": {},
                                        },
                                    ],
                                },
                                {
                                    _attr: {
                                        "w15:tentative": 1,
                                        "w:ilvl": 0,
                                    },
                                },
                            ],
                        },
                    ],
                });
            });

            it("#keepNext", () => {
                const abstractNumbering = new AbstractNumbering(1, [
                    {
                        level: 0,
                        format: LevelFormat.LOWER_ROMAN,
                        text: "%0.",
                        style: {
                            paragraph: {
                                keepNext: true,
                            },
                        },
                    },
                ]);
                const tree = new Formatter().format(abstractNumbering);
                expect(tree).to.deep.equal({
                    "w:abstractNum": [
                        {
                            _attr: {
                                "w15:restartNumberingAfterBreak": 0,
                                "w:abstractNumId": 1,
                            },
                        },
                        {
                            "w:multiLevelType": {
                                _attr: {
                                    "hp:val": "hybridMultilevel",
                                },
                            },
                        },
                        {
                            "w:lvl": [
                                {
                                    "w:start": {
                                        _attr: {
                                            "hp:val": 1,
                                        },
                                    },
                                },
                                {
                                    "w:numFmt": {
                                        _attr: {
                                            "hp:val": "lowerRoman",
                                        },
                                    },
                                },
                                {
                                    "w:lvlText": {
                                        _attr: {
                                            "hp:val": "%0.",
                                        },
                                    },
                                },
                                {
                                    "w:lvlJc": {
                                        _attr: {
                                            "hp:val": "start",
                                        },
                                    },
                                },
                                {
                                    "hp:paraPr": [
                                        {
                                            "w:keepNext": {},
                                        },
                                    ],
                                },
                                {
                                    _attr: {
                                        "w15:tentative": 1,
                                        "w:ilvl": 0,
                                    },
                                },
                            ],
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
                    const abstractNumbering = new AbstractNumbering(1, [
                        {
                            level: 0,
                            format: LevelFormat.LOWER_ROMAN,
                            text: "%0.",
                            style: {
                                run: { size, sizeComplexScript },
                            },
                        },
                    ]);
                    const tree = new Formatter().format(abstractNumbering);
                    expect(tree).to.deep.equal({
                        "w:abstractNum": [
                            {
                                _attr: {
                                    "w15:restartNumberingAfterBreak": 0,
                                    "w:abstractNumId": 1,
                                },
                            },
                            {
                                "w:multiLevelType": {
                                    _attr: {
                                        "hp:val": "hybridMultilevel",
                                    },
                                },
                            },
                            {
                                "w:lvl": [
                                    {
                                        "w:start": {
                                            _attr: {
                                                "hp:val": 1,
                                            },
                                        },
                                    },
                                    {
                                        "w:numFmt": {
                                            _attr: {
                                                "hp:val": "lowerRoman",
                                            },
                                        },
                                    },
                                    {
                                        "w:lvlText": {
                                            _attr: {
                                                "hp:val": "%0.",
                                            },
                                        },
                                    },
                                    {
                                        "w:lvlJc": {
                                            _attr: {
                                                "hp:val": "start",
                                            },
                                        },
                                    },
                                    {
                                        "hp:charPr": expected,
                                    },
                                    {
                                        _attr: {
                                            "w15:tentative": 1,
                                            "w:ilvl": 0,
                                        },
                                    },
                                ],
                            },
                        ],
                    });
                });
            });

            it("#smallCaps", () => {
                const abstractNumbering = new AbstractNumbering(1, [
                    {
                        level: 0,
                        format: LevelFormat.LOWER_ROMAN,
                        text: "%0.",
                        style: {
                            run: {
                                smallCaps: true,
                            },
                        },
                    },
                ]);
                const tree = new Formatter().format(abstractNumbering);
                expect(tree).to.deep.equal({
                    "w:abstractNum": [
                        {
                            _attr: {
                                "w15:restartNumberingAfterBreak": 0,
                                "w:abstractNumId": 1,
                            },
                        },
                        {
                            "w:multiLevelType": {
                                _attr: {
                                    "hp:val": "hybridMultilevel",
                                },
                            },
                        },
                        {
                            "w:lvl": [
                                {
                                    "w:start": {
                                        _attr: {
                                            "hp:val": 1,
                                        },
                                    },
                                },
                                {
                                    "w:numFmt": {
                                        _attr: {
                                            "hp:val": "lowerRoman",
                                        },
                                    },
                                },
                                {
                                    "w:lvlText": {
                                        _attr: {
                                            "hp:val": "%0.",
                                        },
                                    },
                                },
                                {
                                    "w:lvlJc": {
                                        _attr: {
                                            "hp:val": "start",
                                        },
                                    },
                                },
                                {
                                    "hp:charPr": [
                                        {
                                            "w:smallCaps": {},
                                        },
                                    ],
                                },
                                {
                                    _attr: {
                                        "w15:tentative": 1,
                                        "w:ilvl": 0,
                                    },
                                },
                            ],
                        },
                    ],
                });
            });

            it("#allCaps", () => {
                const abstractNumbering = new AbstractNumbering(1, [
                    {
                        level: 0,
                        format: LevelFormat.LOWER_ROMAN,
                        text: "%0.",
                        style: {
                            run: {
                                allCaps: true,
                            },
                        },
                    },
                ]);
                const tree = new Formatter().format(abstractNumbering);
                expect(tree).to.deep.equal({
                    "w:abstractNum": [
                        {
                            _attr: {
                                "w15:restartNumberingAfterBreak": 0,
                                "w:abstractNumId": 1,
                            },
                        },
                        {
                            "w:multiLevelType": {
                                _attr: {
                                    "hp:val": "hybridMultilevel",
                                },
                            },
                        },
                        {
                            "w:lvl": [
                                {
                                    "w:start": {
                                        _attr: {
                                            "hp:val": 1,
                                        },
                                    },
                                },
                                {
                                    "w:numFmt": {
                                        _attr: {
                                            "hp:val": "lowerRoman",
                                        },
                                    },
                                },
                                {
                                    "w:lvlText": {
                                        _attr: {
                                            "hp:val": "%0.",
                                        },
                                    },
                                },
                                {
                                    "w:lvlJc": {
                                        _attr: {
                                            "hp:val": "start",
                                        },
                                    },
                                },
                                {
                                    "hp:charPr": [
                                        {
                                            "w:caps": {},
                                        },
                                    ],
                                },
                                {
                                    _attr: {
                                        "w15:tentative": 1,
                                        "w:ilvl": 0,
                                    },
                                },
                            ],
                        },
                    ],
                });
            });

            it("#strike", () => {
                const abstractNumbering = new AbstractNumbering(1, [
                    {
                        level: 0,
                        format: LevelFormat.LOWER_ROMAN,
                        text: "%0.",
                        style: {
                            run: {
                                strike: true,
                            },
                        },
                    },
                ]);

                const tree = new Formatter().format(abstractNumbering);
                expect(tree).to.deep.equal({
                    "w:abstractNum": [
                        {
                            _attr: {
                                "w15:restartNumberingAfterBreak": 0,
                                "w:abstractNumId": 1,
                            },
                        },
                        {
                            "w:multiLevelType": {
                                _attr: {
                                    "hp:val": "hybridMultilevel",
                                },
                            },
                        },
                        {
                            "w:lvl": [
                                {
                                    "w:start": {
                                        _attr: {
                                            "hp:val": 1,
                                        },
                                    },
                                },
                                {
                                    "w:numFmt": {
                                        _attr: {
                                            "hp:val": "lowerRoman",
                                        },
                                    },
                                },
                                {
                                    "w:lvlText": {
                                        _attr: {
                                            "hp:val": "%0.",
                                        },
                                    },
                                },
                                {
                                    "w:lvlJc": {
                                        _attr: {
                                            "hp:val": "start",
                                        },
                                    },
                                },
                                {
                                    "hp:charPr": [
                                        {
                                            "hp:strikeout": {},
                                        },
                                    ],
                                },
                                {
                                    _attr: {
                                        "w15:tentative": 1,
                                        "w:ilvl": 0,
                                    },
                                },
                            ],
                        },
                    ],
                });
            });

            it("#doubleStrike", () => {
                const abstractNumbering = new AbstractNumbering(1, [
                    {
                        level: 0,
                        format: LevelFormat.LOWER_ROMAN,
                        text: "%0.",
                        style: {
                            run: {
                                doubleStrike: true,
                            },
                        },
                    },
                ]);
                const tree = new Formatter().format(abstractNumbering);
                expect(tree).to.deep.equal({
                    "w:abstractNum": [
                        {
                            _attr: {
                                "w15:restartNumberingAfterBreak": 0,
                                "w:abstractNumId": 1,
                            },
                        },
                        {
                            "w:multiLevelType": {
                                _attr: {
                                    "hp:val": "hybridMultilevel",
                                },
                            },
                        },
                        {
                            "w:lvl": [
                                {
                                    "w:start": {
                                        _attr: {
                                            "hp:val": 1,
                                        },
                                    },
                                },
                                {
                                    "w:numFmt": {
                                        _attr: {
                                            "hp:val": "lowerRoman",
                                        },
                                    },
                                },
                                {
                                    "w:lvlText": {
                                        _attr: {
                                            "hp:val": "%0.",
                                        },
                                    },
                                },
                                {
                                    "w:lvlJc": {
                                        _attr: {
                                            "hp:val": "start",
                                        },
                                    },
                                },
                                {
                                    "hp:charPr": [
                                        {
                                            "w:dstrike": {},
                                        },
                                    ],
                                },
                                {
                                    _attr: {
                                        "w15:tentative": 1,
                                        "w:ilvl": 0,
                                    },
                                },
                            ],
                        },
                    ],
                });
            });

            it("#subScript", () => {
                const abstractNumbering = new AbstractNumbering(1, [
                    {
                        level: 0,
                        format: LevelFormat.LOWER_ROMAN,
                        text: "%0.",
                        style: {
                            run: {
                                subScript: true,
                            },
                        },
                    },
                ]);
                const tree = new Formatter().format(abstractNumbering);
                expect(tree).to.deep.equal({
                    "w:abstractNum": [
                        {
                            _attr: {
                                "w15:restartNumberingAfterBreak": 0,
                                "w:abstractNumId": 1,
                            },
                        },
                        {
                            "w:multiLevelType": {
                                _attr: {
                                    "hp:val": "hybridMultilevel",
                                },
                            },
                        },
                        {
                            "w:lvl": [
                                {
                                    "w:start": {
                                        _attr: {
                                            "hp:val": 1,
                                        },
                                    },
                                },
                                {
                                    "w:numFmt": {
                                        _attr: {
                                            "hp:val": "lowerRoman",
                                        },
                                    },
                                },
                                {
                                    "w:lvlText": {
                                        _attr: {
                                            "hp:val": "%0.",
                                        },
                                    },
                                },
                                {
                                    "w:lvlJc": {
                                        _attr: {
                                            "hp:val": "start",
                                        },
                                    },
                                },
                                {
                                    "hp:charPr": [{ "hp:vertAlign": { _attr: { "hp:val": "subscript" } } }],
                                },
                                {
                                    _attr: {
                                        "w15:tentative": 1,
                                        "w:ilvl": 0,
                                    },
                                },
                            ],
                        },
                    ],
                });
            });

            it("#superScript", () => {
                const abstractNumbering = new AbstractNumbering(1, [
                    {
                        level: 0,
                        format: LevelFormat.LOWER_ROMAN,
                        text: "%0.",
                        style: {
                            run: {
                                superScript: true,
                            },
                        },
                    },
                ]);
                const tree = new Formatter().format(abstractNumbering);
                expect(tree).to.deep.equal({
                    "w:abstractNum": [
                        {
                            _attr: {
                                "w15:restartNumberingAfterBreak": 0,
                                "w:abstractNumId": 1,
                            },
                        },
                        {
                            "w:multiLevelType": {
                                _attr: {
                                    "hp:val": "hybridMultilevel",
                                },
                            },
                        },
                        {
                            "w:lvl": [
                                {
                                    "w:start": {
                                        _attr: {
                                            "hp:val": 1,
                                        },
                                    },
                                },
                                {
                                    "w:numFmt": {
                                        _attr: {
                                            "hp:val": "lowerRoman",
                                        },
                                    },
                                },
                                {
                                    "w:lvlText": {
                                        _attr: {
                                            "hp:val": "%0.",
                                        },
                                    },
                                },
                                {
                                    "w:lvlJc": {
                                        _attr: {
                                            "hp:val": "start",
                                        },
                                    },
                                },
                                {
                                    "hp:charPr": [{ "hp:vertAlign": { _attr: { "hp:val": "superscript" } } }],
                                },
                                {
                                    _attr: {
                                        "w15:tentative": 1,
                                        "w:ilvl": 0,
                                    },
                                },
                            ],
                        },
                    ],
                });
            });

            it("#font by name", () => {
                const abstractNumbering = new AbstractNumbering(1, [
                    {
                        level: 0,
                        format: LevelFormat.LOWER_ROMAN,
                        text: "%0.",
                        style: {
                            run: {
                                font: "Times",
                            },
                        },
                    },
                ]);
                const tree = new Formatter().format(abstractNumbering);
                expect(tree).to.deep.equal({
                    "w:abstractNum": [
                        {
                            _attr: {
                                "w15:restartNumberingAfterBreak": 0,
                                "w:abstractNumId": 1,
                            },
                        },
                        {
                            "w:multiLevelType": {
                                _attr: {
                                    "hp:val": "hybridMultilevel",
                                },
                            },
                        },
                        {
                            "w:lvl": [
                                {
                                    "w:start": {
                                        _attr: {
                                            "hp:val": 1,
                                        },
                                    },
                                },
                                {
                                    "w:numFmt": {
                                        _attr: {
                                            "hp:val": "lowerRoman",
                                        },
                                    },
                                },
                                {
                                    "w:lvlText": {
                                        _attr: {
                                            "hp:val": "%0.",
                                        },
                                    },
                                },
                                {
                                    "w:lvlJc": {
                                        _attr: {
                                            "hp:val": "start",
                                        },
                                    },
                                },
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
                                {
                                    _attr: {
                                        "w15:tentative": 1,
                                        "w:ilvl": 0,
                                    },
                                },
                            ],
                        },
                    ],
                });
            });

            it("#font for ascii and eastAsia", () => {
                const abstractNumbering = new AbstractNumbering(1, [
                    {
                        level: 0,
                        format: LevelFormat.LOWER_ROMAN,
                        text: "%0.",
                        style: {
                            run: {
                                font: {
                                    ascii: "Times",
                                    eastAsia: "KaiTi",
                                },
                            },
                        },
                    },
                ]);
                const tree = new Formatter().format(abstractNumbering);
                expect(tree).to.deep.equal({
                    "w:abstractNum": [
                        {
                            _attr: {
                                "w15:restartNumberingAfterBreak": 0,
                                "w:abstractNumId": 1,
                            },
                        },
                        {
                            "w:multiLevelType": {
                                _attr: {
                                    "hp:val": "hybridMultilevel",
                                },
                            },
                        },
                        {
                            "w:lvl": [
                                {
                                    "w:start": {
                                        _attr: {
                                            "hp:val": 1,
                                        },
                                    },
                                },
                                {
                                    "w:numFmt": {
                                        _attr: {
                                            "hp:val": "lowerRoman",
                                        },
                                    },
                                },
                                {
                                    "w:lvlText": {
                                        _attr: {
                                            "hp:val": "%0.",
                                        },
                                    },
                                },
                                {
                                    "w:lvlJc": {
                                        _attr: {
                                            "hp:val": "start",
                                        },
                                    },
                                },
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
                                {
                                    _attr: {
                                        "w15:tentative": 1,
                                        "w:ilvl": 0,
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
                    const abstractNumbering = new AbstractNumbering(1, [
                        {
                            level: 0,
                            format: LevelFormat.LOWER_ROMAN,
                            text: "%0.",
                            style: {
                                run: { bold, boldComplexScript },
                            },
                        },
                    ]);
                    const tree = new Formatter().format(abstractNumbering);
                    expect(tree).to.deep.equal({
                        "w:abstractNum": [
                            {
                                _attr: {
                                    "w15:restartNumberingAfterBreak": 0,
                                    "w:abstractNumId": 1,
                                },
                            },
                            {
                                "w:multiLevelType": {
                                    _attr: {
                                        "hp:val": "hybridMultilevel",
                                    },
                                },
                            },
                            {
                                "w:lvl": [
                                    {
                                        "w:start": {
                                            _attr: {
                                                "hp:val": 1,
                                            },
                                        },
                                    },
                                    {
                                        "w:numFmt": {
                                            _attr: {
                                                "hp:val": "lowerRoman",
                                            },
                                        },
                                    },
                                    {
                                        "w:lvlText": {
                                            _attr: {
                                                "hp:val": "%0.",
                                            },
                                        },
                                    },
                                    {
                                        "w:lvlJc": {
                                            _attr: {
                                                "hp:val": "start",
                                            },
                                        },
                                    },
                                    {
                                        "hp:charPr": expected,
                                    },
                                    {
                                        _attr: {
                                            "w15:tentative": 1,
                                            "w:ilvl": 0,
                                        },
                                    },
                                ],
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
                    const abstractNumbering = new AbstractNumbering(1, [
                        {
                            level: 0,
                            format: LevelFormat.LOWER_ROMAN,
                            text: "%0.",
                            style: {
                                run: { italics, italicsComplexScript },
                            },
                        },
                    ]);
                    const tree = new Formatter().format(abstractNumbering);
                    expect(tree).to.deep.equal({
                        "w:abstractNum": [
                            {
                                _attr: {
                                    "w15:restartNumberingAfterBreak": 0,
                                    "w:abstractNumId": 1,
                                },
                            },
                            {
                                "w:multiLevelType": {
                                    _attr: {
                                        "hp:val": "hybridMultilevel",
                                    },
                                },
                            },
                            {
                                "w:lvl": [
                                    {
                                        "w:start": {
                                            _attr: {
                                                "hp:val": 1,
                                            },
                                        },
                                    },
                                    {
                                        "w:numFmt": {
                                            _attr: {
                                                "hp:val": "lowerRoman",
                                            },
                                        },
                                    },
                                    {
                                        "w:lvlText": {
                                            _attr: {
                                                "hp:val": "%0.",
                                            },
                                        },
                                    },
                                    {
                                        "w:lvlJc": {
                                            _attr: {
                                                "hp:val": "start",
                                            },
                                        },
                                    },
                                    {
                                        "hp:charPr": expected,
                                    },
                                    {
                                        _attr: {
                                            "w15:tentative": 1,
                                            "w:ilvl": 0,
                                        },
                                    },
                                ],
                            },
                        ],
                    });
                });
            });

            const highlightTests = [
                {
                    highlight: HighlightColor.YELLOW,
                    expected: [
                        { "hp:highlight": { _attr: { "hp:val": "yellow" } } },
                        { "w:highlightCs": { _attr: { "hp:val": "yellow" } } },
                    ],
                },
                {
                    highlight: HighlightColor.YELLOW,
                    highlightComplexScript: true,
                    expected: [
                        { "hp:highlight": { _attr: { "hp:val": "yellow" } } },
                        { "w:highlightCs": { _attr: { "hp:val": "yellow" } } },
                    ],
                },
                {
                    highlight: HighlightColor.YELLOW,
                    highlightComplexScript: false,
                    expected: [{ "hp:highlight": { _attr: { "hp:val": "yellow" } } }],
                },
                {
                    highlight: HighlightColor.YELLOW,
                    highlightComplexScript: "550099",
                    expected: [
                        { "hp:highlight": { _attr: { "hp:val": "yellow" } } },
                        { "w:highlightCs": { _attr: { "hp:val": "550099" } } },
                    ],
                },
            ];
            highlightTests.forEach(({ highlight, highlightComplexScript, expected }) => {
                it(`#highlight ${highlight} cs ${highlightComplexScript}`, () => {
                    const abstractNumbering = new AbstractNumbering(1, [
                        {
                            level: 0,
                            format: LevelFormat.LOWER_ROMAN,
                            text: "%0.",
                            style: {
                                run: { highlight, highlightComplexScript },
                            },
                        },
                    ]);
                    const tree = new Formatter().format(abstractNumbering);
                    expect(tree).to.deep.equal({
                        "w:abstractNum": [
                            {
                                _attr: {
                                    "w15:restartNumberingAfterBreak": 0,
                                    "w:abstractNumId": 1,
                                },
                            },
                            {
                                "w:multiLevelType": {
                                    _attr: {
                                        "hp:val": "hybridMultilevel",
                                    },
                                },
                            },
                            {
                                "w:lvl": [
                                    {
                                        "w:start": {
                                            _attr: {
                                                "hp:val": 1,
                                            },
                                        },
                                    },
                                    {
                                        "w:numFmt": {
                                            _attr: {
                                                "hp:val": "lowerRoman",
                                            },
                                        },
                                    },
                                    {
                                        "w:lvlText": {
                                            _attr: {
                                                "hp:val": "%0.",
                                            },
                                        },
                                    },
                                    {
                                        "w:lvlJc": {
                                            _attr: {
                                                "hp:val": "start",
                                            },
                                        },
                                    },
                                    {
                                        "hp:charPr": expected,
                                    },
                                    {
                                        _attr: {
                                            "w15:tentative": 1,
                                            "w:ilvl": 0,
                                        },
                                    },
                                ],
                            },
                        ],
                    });
                });
            });

            const shadingTests = [
                {
                    shading: {
                        type: ShadingType.DIAGONAL_STRIPE,
                        fill: "006622",
                        color: "0000FF",
                    },
                    expected: [{ "hp:shd": { _attr: { "hp:val": "diagStripe", "hp:fill": "006622", "hp:color": "0000FF" } } }],
                },
                {
                    shading: {
                        type: ShadingType.PERCENT_10,
                        fill: "00FFFF",
                        color: "FF0000",
                    },
                    expected: [{ "hp:shd": { _attr: { "hp:val": "pct10", "hp:fill": "00FFFF", "hp:color": "FF0000" } } }],
                },
            ];
            shadingTests.forEach(({ shading, expected }) => {
                it("#shade correctly", () => {
                    const abstractNumbering = new AbstractNumbering(1, [
                        {
                            level: 0,
                            format: LevelFormat.LOWER_ROMAN,
                            text: "%0.",
                            style: {
                                run: { shading },
                            },
                        },
                    ]);
                    const tree = new Formatter().format(abstractNumbering);
                    expect(tree).to.deep.equal({
                        "w:abstractNum": [
                            {
                                _attr: {
                                    "w15:restartNumberingAfterBreak": 0,
                                    "w:abstractNumId": 1,
                                },
                            },
                            {
                                "w:multiLevelType": {
                                    _attr: {
                                        "hp:val": "hybridMultilevel",
                                    },
                                },
                            },
                            {
                                "w:lvl": [
                                    {
                                        "w:start": {
                                            _attr: {
                                                "hp:val": 1,
                                            },
                                        },
                                    },
                                    {
                                        "w:numFmt": {
                                            _attr: {
                                                "hp:val": "lowerRoman",
                                            },
                                        },
                                    },
                                    {
                                        "w:lvlText": {
                                            _attr: {
                                                "hp:val": "%0.",
                                            },
                                        },
                                    },
                                    {
                                        "w:lvlJc": {
                                            _attr: {
                                                "hp:val": "start",
                                            },
                                        },
                                    },
                                    {
                                        "hp:charPr": expected,
                                    },
                                    {
                                        _attr: {
                                            "w15:tentative": 1,
                                            "w:ilvl": 0,
                                        },
                                    },
                                ],
                            },
                        ],
                    });
                });
            });

            describe("#underline", () => {
                it("should set underline to 'single' if no arguments are given", () => {
                    const abstractNumbering = new AbstractNumbering(1, [
                        {
                            level: 0,
                            format: LevelFormat.LOWER_ROMAN,
                            text: "%0.",
                            style: {
                                run: {
                                    underline: {},
                                },
                            },
                        },
                    ]);
                    const tree = new Formatter().format(abstractNumbering);
                    expect(tree).to.deep.equal({
                        "w:abstractNum": [
                            {
                                _attr: {
                                    "w15:restartNumberingAfterBreak": 0,
                                    "w:abstractNumId": 1,
                                },
                            },
                            {
                                "w:multiLevelType": {
                                    _attr: {
                                        "hp:val": "hybridMultilevel",
                                    },
                                },
                            },
                            {
                                "w:lvl": [
                                    {
                                        "w:start": {
                                            _attr: {
                                                "hp:val": 1,
                                            },
                                        },
                                    },
                                    {
                                        "w:numFmt": {
                                            _attr: {
                                                "hp:val": "lowerRoman",
                                            },
                                        },
                                    },
                                    {
                                        "w:lvlText": {
                                            _attr: {
                                                "hp:val": "%0.",
                                            },
                                        },
                                    },
                                    {
                                        "w:lvlJc": {
                                            _attr: {
                                                "hp:val": "start",
                                            },
                                        },
                                    },
                                    {
                                        "hp:charPr": [{ "hp:underline": { _attr: { "hp:val": "single" } } }],
                                    },
                                    {
                                        _attr: {
                                            "w15:tentative": 1,
                                            "w:ilvl": 0,
                                        },
                                    },
                                ],
                            },
                        ],
                    });
                });

                it("should set the style if given", () => {
                    const abstractNumbering = new AbstractNumbering(1, [
                        {
                            level: 0,
                            format: LevelFormat.LOWER_ROMAN,
                            text: "%0.",
                            style: {
                                run: {
                                    underline: {
                                        type: UnderlineType.DOUBLE,
                                    },
                                },
                            },
                        },
                    ]);
                    const tree = new Formatter().format(abstractNumbering);
                    expect(tree).to.deep.equal({
                        "w:abstractNum": [
                            {
                                _attr: {
                                    "w15:restartNumberingAfterBreak": 0,
                                    "w:abstractNumId": 1,
                                },
                            },
                            {
                                "w:multiLevelType": {
                                    _attr: {
                                        "hp:val": "hybridMultilevel",
                                    },
                                },
                            },
                            {
                                "w:lvl": [
                                    {
                                        "w:start": {
                                            _attr: {
                                                "hp:val": 1,
                                            },
                                        },
                                    },
                                    {
                                        "w:numFmt": {
                                            _attr: {
                                                "hp:val": "lowerRoman",
                                            },
                                        },
                                    },
                                    {
                                        "w:lvlText": {
                                            _attr: {
                                                "hp:val": "%0.",
                                            },
                                        },
                                    },
                                    {
                                        "w:lvlJc": {
                                            _attr: {
                                                "hp:val": "start",
                                            },
                                        },
                                    },
                                    {
                                        "hp:charPr": [{ "hp:underline": { _attr: { "hp:val": "double" } } }],
                                    },
                                    {
                                        _attr: {
                                            "w15:tentative": 1,
                                            "w:ilvl": 0,
                                        },
                                    },
                                ],
                            },
                        ],
                    });
                });

                it("should set the style and color if given", () => {
                    const abstractNumbering = new AbstractNumbering(1, [
                        {
                            level: 0,
                            format: LevelFormat.LOWER_ROMAN,
                            text: "%0.",
                            style: {
                                run: {
                                    underline: {
                                        type: UnderlineType.DOUBLE,
                                        color: "005599",
                                    },
                                },
                            },
                        },
                    ]);
                    const tree = new Formatter().format(abstractNumbering);
                    expect(tree).to.deep.equal({
                        "w:abstractNum": [
                            {
                                _attr: {
                                    "w15:restartNumberingAfterBreak": 0,
                                    "w:abstractNumId": 1,
                                },
                            },
                            {
                                "w:multiLevelType": {
                                    _attr: {
                                        "hp:val": "hybridMultilevel",
                                    },
                                },
                            },
                            {
                                "w:lvl": [
                                    {
                                        "w:start": {
                                            _attr: {
                                                "hp:val": 1,
                                            },
                                        },
                                    },
                                    {
                                        "w:numFmt": {
                                            _attr: {
                                                "hp:val": "lowerRoman",
                                            },
                                        },
                                    },
                                    {
                                        "w:lvlText": {
                                            _attr: {
                                                "hp:val": "%0.",
                                            },
                                        },
                                    },
                                    {
                                        "w:lvlJc": {
                                            _attr: {
                                                "hp:val": "start",
                                            },
                                        },
                                    },
                                    {
                                        "hp:charPr": [{ "hp:underline": { _attr: { "hp:val": "double", "hp:color": "005599" } } }],
                                    },
                                    {
                                        _attr: {
                                            "w15:tentative": 1,
                                            "w:ilvl": 0,
                                        },
                                    },
                                ],
                            },
                        ],
                    });
                });
            });

            describe("#emphasisMark", () => {
                it("should set emphasisMark to 'dot' if no arguments are given", () => {
                    const abstractNumbering = new AbstractNumbering(1, [
                        {
                            level: 0,
                            format: LevelFormat.LOWER_ROMAN,
                            text: "%0.",
                            style: {
                                run: {
                                    emphasisMark: {},
                                },
                            },
                        },
                    ]);
                    const tree = new Formatter().format(abstractNumbering);
                    expect(tree).to.deep.equal({
                        "w:abstractNum": [
                            {
                                _attr: {
                                    "w15:restartNumberingAfterBreak": 0,
                                    "w:abstractNumId": 1,
                                },
                            },
                            {
                                "w:multiLevelType": {
                                    _attr: {
                                        "hp:val": "hybridMultilevel",
                                    },
                                },
                            },
                            {
                                "w:lvl": [
                                    {
                                        "w:start": {
                                            _attr: {
                                                "hp:val": 1,
                                            },
                                        },
                                    },
                                    {
                                        "w:numFmt": {
                                            _attr: {
                                                "hp:val": "lowerRoman",
                                            },
                                        },
                                    },
                                    {
                                        "w:lvlText": {
                                            _attr: {
                                                "hp:val": "%0.",
                                            },
                                        },
                                    },
                                    {
                                        "w:lvlJc": {
                                            _attr: {
                                                "hp:val": "start",
                                            },
                                        },
                                    },
                                    {
                                        "hp:charPr": [{ "w:em": { _attr: { "hp:val": "dot" } } }],
                                    },
                                    {
                                        _attr: {
                                            "w15:tentative": 1,
                                            "w:ilvl": 0,
                                        },
                                    },
                                ],
                            },
                        ],
                    });
                });

                it("should set the style if given", () => {
                    const abstractNumbering = new AbstractNumbering(1, [
                        {
                            level: 0,
                            format: LevelFormat.LOWER_ROMAN,
                            text: "%0.",
                            style: {
                                run: {
                                    emphasisMark: {
                                        type: EmphasisMarkType.DOT,
                                    },
                                },
                            },
                        },
                    ]);
                    const tree = new Formatter().format(abstractNumbering);
                    expect(tree).to.deep.equal({
                        "w:abstractNum": [
                            {
                                _attr: {
                                    "w15:restartNumberingAfterBreak": 0,
                                    "w:abstractNumId": 1,
                                },
                            },
                            {
                                "w:multiLevelType": {
                                    _attr: {
                                        "hp:val": "hybridMultilevel",
                                    },
                                },
                            },
                            {
                                "w:lvl": [
                                    {
                                        "w:start": {
                                            _attr: {
                                                "hp:val": 1,
                                            },
                                        },
                                    },
                                    {
                                        "w:numFmt": {
                                            _attr: {
                                                "hp:val": "lowerRoman",
                                            },
                                        },
                                    },
                                    {
                                        "w:lvlText": {
                                            _attr: {
                                                "hp:val": "%0.",
                                            },
                                        },
                                    },
                                    {
                                        "w:lvlJc": {
                                            _attr: {
                                                "hp:val": "start",
                                            },
                                        },
                                    },
                                    {
                                        "hp:charPr": [{ "w:em": { _attr: { "hp:val": "dot" } } }],
                                    },
                                    {
                                        _attr: {
                                            "w15:tentative": 1,
                                            "w:ilvl": 0,
                                        },
                                    },
                                ],
                            },
                        ],
                    });
                });
            });

            it("#color", () => {
                const abstractNumbering = new AbstractNumbering(1, [
                    {
                        level: 0,
                        format: LevelFormat.LOWER_ROMAN,
                        text: "%0.",
                        style: {
                            run: {
                                color: "123456",
                            },
                        },
                    },
                ]);
                const tree = new Formatter().format(abstractNumbering);
                expect(tree).to.deep.equal({
                    "w:abstractNum": [
                        {
                            _attr: {
                                "w15:restartNumberingAfterBreak": 0,
                                "w:abstractNumId": 1,
                            },
                        },
                        {
                            "w:multiLevelType": {
                                _attr: {
                                    "hp:val": "hybridMultilevel",
                                },
                            },
                        },
                        {
                            "w:lvl": [
                                {
                                    "w:start": {
                                        _attr: {
                                            "hp:val": 1,
                                        },
                                    },
                                },
                                {
                                    "w:numFmt": {
                                        _attr: {
                                            "hp:val": "lowerRoman",
                                        },
                                    },
                                },
                                {
                                    "w:lvlText": {
                                        _attr: {
                                            "hp:val": "%0.",
                                        },
                                    },
                                },
                                {
                                    "w:lvlJc": {
                                        _attr: {
                                            "hp:val": "start",
                                        },
                                    },
                                },
                                {
                                    "hp:charPr": [{ "hp:color": { _attr: { "hp:val": "123456" } } }],
                                },
                                {
                                    _attr: {
                                        "w15:tentative": 1,
                                        "w:ilvl": 0,
                                    },
                                },
                            ],
                        },
                    ],
                });
            });
        });
    });
});
