import { describe, expect, it } from "vitest";

import { Formatter } from "@export/formatter";

import { EmphasisMarkType } from "./emphasis-mark";
import { SymbolRun } from "./symbol-run";
import { UnderlineType } from "./underline";

describe("SymbolRun", () => {
    let run: SymbolRun;

    describe("#constructor()", () => {
        it("should create symbol run from text input", () => {
            run = new SymbolRun("F071");
            const f = new Formatter().format(run);
            expect(f).to.deep.equal({
                "hp:run": [{ "w:sym": { _attr: { "w:char": "F071", "hh:font": "Wingdings" } } }],
            });
        });

        it("should create symbol run from object input with just 'char' specified", () => {
            run = new SymbolRun({ char: "F071" });
            const f = new Formatter().format(run);
            expect(f).to.deep.equal({
                "hp:run": [{ "w:sym": { _attr: { "w:char": "F071", "hh:font": "Wingdings" } } }],
            });
        });

        it("should create symbol run from object input with just 'char' specified", () => {
            run = new SymbolRun({ char: "F071", symbolfont: "Arial" });
            const f = new Formatter().format(run);
            expect(f).to.deep.equal({
                "hp:run": [{ "w:sym": { _attr: { "w:char": "F071", "hh:font": "Arial" } } }],
            });
        });

        it("should add other standard run properties", () => {
            run = new SymbolRun({
                char: "F071",
                symbolfont: "Arial",
                italics: true,
                bold: true,
                underline: {
                    color: "ff0000",
                    type: UnderlineType.DOUBLE,
                },
                emphasisMark: {
                    type: EmphasisMarkType.DOT,
                },
                color: "00FF00",
                size: 40,
                highlight: "yellow",
            });

            const f = new Formatter().format(run);
            expect(f).to.deep.equal({
                "hp:run": [
                    {
                        "hp:charPr": [
                            { "hp:bold": {} },
                            { "w:bCs": {} },
                            { "hp:italic": {} },
                            { "w:iCs": {} },
                            { "hp:color": { _attr: { "hp:val": "00FF00" } } },
                            { "hp:sz": { _attr: { "hp:val": 40 } } },
                            { "w:szCs": { _attr: { "hp:val": 40 } } },
                            { "hp:highlight": { _attr: { "hp:val": "yellow" } } },
                            { "w:highlightCs": { _attr: { "hp:val": "yellow" } } },
                            { "hp:underline": { _attr: { "hp:val": "double", "hp:color": "ff0000" } } },
                            { "w:em": { _attr: { "hp:val": "dot" } } },
                        ],
                    },
                    {
                        "w:sym": { _attr: { "w:char": "F071", "hh:font": "Arial" } },
                    },
                ],
            });
        });
    });
});
