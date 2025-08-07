import { describe, expect, it } from "vitest";
import { Formatter } from "@export/formatter";
import { DocumentWrapper } from "../document-wrapper";
import { ParagraphProperties } from "./properties";
describe("ParagraphProperties", () => {
    describe("#constructor()", () => {
        it("creates an initially empty property object", () => {
            const properties = new ParagraphProperties();
            expect(() => new Formatter().format(properties)).to.throw("XMLComponent did not format correctly");
        });
        it("should create with numbering", () => {
            const properties = new ParagraphProperties({
                numbering: {
                    reference: "test-reference",
                    level: 0,
                    instance: 0,
                },
            });
            const tree = new Formatter().format(properties, {
                file: {
                    Numbering: {
                        createConcreteNumberingInstance: (_, __) => undefined,
                    },
                },
                viewWrapper: new DocumentWrapper({ background: {} }),
                stack: [],
            });
            expect(tree).to.deep.equal({
                "hp:paraPr": [
                    {
                        "hp:pStyle": {
                            _attr: {
                                "hp:val": "ListParagraph",
                            },
                        },
                    },
                    {
                        "w:numPr": [
                            {
                                "w:ilvl": {
                                    _attr: {
                                        "hp:val": 0,
                                    },
                                },
                            },
                            {
                                "w:numId": {
                                    _attr: {
                                        "hp:val": "{test-reference-0}",
                                    },
                                },
                            },
                        ],
                    },
                ],
            });
        });
        it("should create with numbering disabled", () => {
            const properties = new ParagraphProperties({
                numbering: false,
            });
            const tree = new Formatter().format(properties);
            expect(tree).to.deep.equal({
                "hp:paraPr": [
                    {
                        "w:numPr": [
                            {
                                "w:ilvl": {
                                    _attr: {
                                        "hp:val": 0,
                                    },
                                },
                            },
                            {
                                "w:numId": {
                                    _attr: {
                                        "hp:val": 0,
                                    },
                                },
                            },
                        ],
                    },
                ],
            });
        });
        it("should create with widowControl", () => {
            const properties = new ParagraphProperties({
                widowControl: true,
            });
            const tree = new Formatter().format(properties);
            expect(tree).to.deep.equal({
                "hp:paraPr": [
                    {
                        "w:widowControl": {},
                    },
                ],
            });
        });
        it("should create with the bidirectional property", () => {
            const properties = new ParagraphProperties({
                bidirectional: true,
            });
            const tree = new Formatter().format(properties);
            expect(tree).to.deep.equal({
                "hp:paraPr": [
                    {
                        "hp:bidi": {},
                    },
                ],
            });
        });
        it("should create with the contextualSpacing property", () => {
            const properties = new ParagraphProperties({
                contextualSpacing: true,
            });
            const tree = new Formatter().format(properties);
            expect(tree).to.deep.equal({
                "hp:paraPr": [
                    {
                        "w:contextualSpacing": {},
                    },
                ],
            });
        });
        it("should create with the suppressLineNumbers property", () => {
            const properties = new ParagraphProperties({
                suppressLineNumbers: true,
            });
            const tree = new Formatter().format(properties);
            expect(tree).to.deep.equal({
                "hp:paraPr": [
                    {
                        "w:suppressLineNumbers": {},
                    },
                ],
            });
        });
        it("should create with the autoSpaceEastAsianText property", () => {
            const properties = new ParagraphProperties({
                autoSpaceEastAsianText: true,
            });
            const tree = new Formatter().format(properties);
            expect(tree).to.deep.equal({
                "hp:paraPr": [
                    {
                        "w:autoSpaceDN": {},
                    },
                ],
            });
        });
        it("should create with the wordWrap property", () => {
            const properties = new ParagraphProperties({
                wordWrap: true,
            });
            const tree = new Formatter().format(properties);
            expect(tree).to.deep.equal({
                "hp:paraPr": [
                    {
                        "hp:wordWrap": {
                            _attr: {
                                "hp:val": 0,
                            },
                        },
                    },
                ],
            });
        });
        it("should create with the overflowPunct property", () => {
            const properties = new ParagraphProperties({
                overflowPunctuation: true,
            });
            const tree = new Formatter().format(properties);
            expect(tree).to.deep.equal({
                "hp:paraPr": [
                    {
                        "w:overflowPunct": {},
                    },
                ],
            });
        });
        it("should create with the run property", () => {
            const properties = new ParagraphProperties({
                run: {
                    size: "10pt",
                },
            });
            const tree = new Formatter().format(properties);
            expect(tree).to.deep.equal({
                "hp:paraPr": [
                    {
                        "hp:charPr": [
                            {
                                "hp:sz": {
                                    _attr: {
                                        "hp:val": "10pt",
                                    },
                                },
                            },
                            {
                                "w:szCs": {
                                    _attr: {
                                        "hp:val": "10pt",
                                    },
                                },
                            },
                        ],
                    },
                ],
            });
        });
    });
});
//# sourceMappingURL=properties.spec.js.map