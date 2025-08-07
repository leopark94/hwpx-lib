import { describe, expect, it } from "vitest";
import { Formatter } from "@export/formatter";
import { Paragraph, TextRun } from "@file/paragraph";
import { Footnote, FootnoteType } from "./footnote";
describe("Footnote", () => {
    describe("#constructor", () => {
        it("should create a footnote with a footnote type", () => {
            const footnote = new Footnote({
                id: 1,
                type: FootnoteType.SEPERATOR,
                children: [],
            });
            const tree = new Formatter().format(footnote);
            expect(Object.keys(tree)).to.deep.equal(["hh:footnote"]);
            expect(tree["hp:footnote"]).to.deep.equal({ _attr: { "hp:type": "separator", "hp:id": 1 } });
        });
        it("should create a footnote without a footnote type", () => {
            const footnote = new Footnote({
                id: 1,
                children: [],
            });
            const tree = new Formatter().format(footnote);
            expect(Object.keys(tree)).to.deep.equal(["hh:footnote"]);
            expect(tree["hp:footnote"]).to.deep.equal({ _attr: { "hp:id": 1 } });
        });
        it("should append footnote ref run on the first footnote paragraph", () => {
            const footnote = new Footnote({
                id: 1,
                children: [new Paragraph({ children: [new TextRun("test-footnote")] })],
            });
            const tree = new Formatter().format(footnote);
            expect(tree).to.deep.equal({
                "hh:footnote": [
                    {
                        _attr: {
                            "hp:id": 1,
                        },
                    },
                    {
                        "hp:p": [
                            {
                                "hp:run": [
                                    {
                                        "hp:charPr": [
                                            {
                                                "hp:styleRef": {
                                                    _attr: {
                                                        "hp:val": "FootnoteReference",
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                    {
                                        "hp:footnoteRef": {},
                                    },
                                ],
                            },
                            {
                                "hp:run": [
                                    {
                                        "hp:t": [
                                            {
                                                _attr: {
                                                    "xml:space": "preserve",
                                                },
                                            },
                                            "test-footnote",
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
        });
        it("should add multiple paragraphs", () => {
            const footnote = new Footnote({
                id: 1,
                children: [
                    new Paragraph({ children: [new TextRun("test-footnote")] }),
                    new Paragraph({ children: [new TextRun("test-footnote-2")] }),
                ],
            });
            const tree = new Formatter().format(footnote);
            expect(tree).to.deep.equal({
                "hh:footnote": [
                    {
                        _attr: {
                            "hp:id": 1,
                        },
                    },
                    {
                        "hp:p": [
                            {
                                "hp:run": [
                                    {
                                        "hp:charPr": [
                                            {
                                                "hp:styleRef": {
                                                    _attr: {
                                                        "hp:val": "FootnoteReference",
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                    {
                                        "hp:footnoteRef": {},
                                    },
                                ],
                            },
                            {
                                "hp:run": [
                                    {
                                        "hp:t": [
                                            {
                                                _attr: {
                                                    "xml:space": "preserve",
                                                },
                                            },
                                            "test-footnote",
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        "hp:p": [
                            {
                                "hp:run": [
                                    {
                                        "hp:t": [
                                            {
                                                _attr: {
                                                    "xml:space": "preserve",
                                                },
                                            },
                                            "test-footnote-2",
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
});
//# sourceMappingURL=footnote.spec.js.map