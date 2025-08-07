import { describe, expect, it } from "vitest";

import { Formatter } from "@export/formatter";
import { EMPTY_OBJECT } from "@file/xml-components";

import * as defaultStyles from "./default-styles";

describe("Default Styles", () => {
    it("HeadingStyle#constructor", () => {
        const style = new defaultStyles.HeadingStyle({
            id: "Heading1",
            name: "Heading 1",
        });
        const tree = new Formatter().format(style);
        expect(tree).to.deep.equal({
            "hh:style": [
                { _attr: { "hp:type": "paragraph", "w:styleId": "Heading1" } },
                { "hh:name": { _attr: { "hp:val": "Heading 1" } } },
                { "w:basedOn": { _attr: { "hp:val": "Normal" } } },
                { "w:next": { _attr: { "hp:val": "Normal" } } },
                { "w:qFormat": EMPTY_OBJECT },
            ],
        });
    });

    it("TitleStyle#constructor", () => {
        const style = new defaultStyles.TitleStyle({});
        const tree = new Formatter().format(style);
        expect(tree).to.deep.equal({
            "hh:style": [
                { _attr: { "hp:type": "paragraph", "w:styleId": "Title" } },
                { "hh:name": { _attr: { "hp:val": "Title" } } },
                { "w:basedOn": { _attr: { "hp:val": "Normal" } } },
                { "w:next": { _attr: { "hp:val": "Normal" } } },
                { "w:qFormat": EMPTY_OBJECT },
            ],
        });
    });

    it("Heading1Style#constructor", () => {
        const style = new defaultStyles.Heading1Style({});
        const tree = new Formatter().format(style);
        expect(tree).to.deep.equal({
            "hh:style": [
                { _attr: { "hp:type": "paragraph", "w:styleId": "Heading1" } },
                { "hh:name": { _attr: { "hp:val": "Heading 1" } } },
                { "w:basedOn": { _attr: { "hp:val": "Normal" } } },
                { "w:next": { _attr: { "hp:val": "Normal" } } },
                { "w:qFormat": EMPTY_OBJECT },
            ],
        });
    });

    it("Heading2Style#constructor", () => {
        const style = new defaultStyles.Heading2Style({});
        const tree = new Formatter().format(style);
        expect(tree).to.deep.equal({
            "hh:style": [
                { _attr: { "hp:type": "paragraph", "w:styleId": "Heading2" } },
                { "hh:name": { _attr: { "hp:val": "Heading 2" } } },
                { "w:basedOn": { _attr: { "hp:val": "Normal" } } },
                { "w:next": { _attr: { "hp:val": "Normal" } } },
                { "w:qFormat": EMPTY_OBJECT },
            ],
        });
    });

    it("Heading3Style#constructor", () => {
        const style = new defaultStyles.Heading3Style({});
        const tree = new Formatter().format(style);
        expect(tree).to.deep.equal({
            "hh:style": [
                { _attr: { "hp:type": "paragraph", "w:styleId": "Heading3" } },
                { "hh:name": { _attr: { "hp:val": "Heading 3" } } },
                { "w:basedOn": { _attr: { "hp:val": "Normal" } } },
                { "w:next": { _attr: { "hp:val": "Normal" } } },
                { "w:qFormat": EMPTY_OBJECT },
            ],
        });
    });

    it("Heading4Style#constructor", () => {
        const style = new defaultStyles.Heading4Style({});
        const tree = new Formatter().format(style);
        expect(tree).to.deep.equal({
            "hh:style": [
                { _attr: { "hp:type": "paragraph", "w:styleId": "Heading4" } },
                { "hh:name": { _attr: { "hp:val": "Heading 4" } } },
                { "w:basedOn": { _attr: { "hp:val": "Normal" } } },
                { "w:next": { _attr: { "hp:val": "Normal" } } },
                { "w:qFormat": EMPTY_OBJECT },
            ],
        });
    });

    it("Heading5Style#constructor", () => {
        const style = new defaultStyles.Heading5Style({});
        const tree = new Formatter().format(style);
        expect(tree).to.deep.equal({
            "hh:style": [
                { _attr: { "hp:type": "paragraph", "w:styleId": "Heading5" } },
                { "hh:name": { _attr: { "hp:val": "Heading 5" } } },
                { "w:basedOn": { _attr: { "hp:val": "Normal" } } },
                { "w:next": { _attr: { "hp:val": "Normal" } } },
                { "w:qFormat": EMPTY_OBJECT },
            ],
        });
    });

    it("Heading6Style#constructor", () => {
        const style = new defaultStyles.Heading6Style({});
        const tree = new Formatter().format(style);
        expect(tree).to.deep.equal({
            "hh:style": [
                { _attr: { "hp:type": "paragraph", "w:styleId": "Heading6" } },
                { "hh:name": { _attr: { "hp:val": "Heading 6" } } },
                { "w:basedOn": { _attr: { "hp:val": "Normal" } } },
                { "w:next": { _attr: { "hp:val": "Normal" } } },
                { "w:qFormat": EMPTY_OBJECT },
            ],
        });
    });

    it("StrongStyle#constructor", () => {
        const style = new defaultStyles.StrongStyle({});
        const tree = new Formatter().format(style);
        expect(tree).to.deep.equal({
            "hh:style": [
                { _attr: { "hp:type": "paragraph", "w:styleId": "Strong" } },
                { "hh:name": { _attr: { "hp:val": "Strong" } } },
                { "w:basedOn": { _attr: { "hp:val": "Normal" } } },
                { "w:next": { _attr: { "hp:val": "Normal" } } },
                { "w:qFormat": EMPTY_OBJECT },
            ],
        });
    });

    it("ListParagraph#constructor", () => {
        const style = new defaultStyles.ListParagraph({});
        const tree = new Formatter().format(style);
        expect(tree).to.deep.equal({
            "hh:style": [
                { _attr: { "hp:type": "paragraph", "w:styleId": "ListParagraph" } },
                { "hh:name": { _attr: { "hp:val": "List Paragraph" } } },
                { "w:basedOn": { _attr: { "hp:val": "Normal" } } },
                { "w:qFormat": EMPTY_OBJECT },
            ],
        });
    });

    it("FootnoteText#constructor", () => {
        const style = new defaultStyles.FootnoteText({});
        const tree = new Formatter().format(style);
        expect(tree).to.deep.equal({
            "hh:style": [
                { _attr: { "hp:type": "paragraph", "w:styleId": "FootnoteText" } },
                { "hh:name": { _attr: { "hp:val": "footnote text" } } },
                { "w:basedOn": { _attr: { "hp:val": "Normal" } } },
                { "w:link": { _attr: { "hp:val": "FootnoteTextChar" } } },
                {
                    "hh:uiPriority": {
                        _attr: {
                            "hp:val": 99,
                        },
                    },
                },
                {
                    "w:semiHidden": EMPTY_OBJECT,
                },
                {
                    "w:unhideWhenUsed": EMPTY_OBJECT,
                },
                {
                    "hp:paraPr": [
                        {
                            "hp:lineSpacing": {
                                _attr: {
                                    "w:after": 0,
                                    "w:line": 240,
                                    "w:lineRule": "auto",
                                },
                            },
                        },
                    ],
                },
                {
                    "hp:charPr": [
                        {
                            "hp:sz": {
                                _attr: {
                                    "hp:val": 20,
                                },
                            },
                        },
                        {
                            "w:szCs": {
                                _attr: {
                                    "hp:val": 20,
                                },
                            },
                        },
                    ],
                },
            ],
        });
    });

    it("FootnoteReferenceStyle#constructor", () => {
        const style = new defaultStyles.FootnoteReferenceStyle({});
        const tree = new Formatter().format(style);
        expect(tree).to.deep.equal({
            "hh:style": [
                { _attr: { "hp:type": "character", "w:styleId": "FootnoteReference" } },
                { "hh:name": { _attr: { "hp:val": "footnote reference" } } },
                { "w:basedOn": { _attr: { "hp:val": "DefaultParagraphFont" } } },
                {
                    "hh:uiPriority": {
                        _attr: {
                            "hp:val": 99,
                        },
                    },
                },
                {
                    "w:semiHidden": EMPTY_OBJECT,
                },
                {
                    "w:unhideWhenUsed": EMPTY_OBJECT,
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

    it("FootnoteTextChar#constructor", () => {
        const style = new defaultStyles.FootnoteTextChar({});
        const tree = new Formatter().format(style);
        expect(tree).to.deep.equal({
            "hh:style": [
                { _attr: { "hp:type": "character", "w:styleId": "FootnoteTextChar" } },
                { "hh:name": { _attr: { "hp:val": "Footnote Text Char" } } },
                { "w:basedOn": { _attr: { "hp:val": "DefaultParagraphFont" } } },
                { "w:link": { _attr: { "hp:val": "FootnoteText" } } },
                {
                    "hh:uiPriority": {
                        _attr: {
                            "hp:val": 99,
                        },
                    },
                },
                {
                    "w:semiHidden": EMPTY_OBJECT,
                },
                {
                    "w:unhideWhenUsed": EMPTY_OBJECT,
                },
                {
                    "hp:charPr": [
                        {
                            "hp:sz": {
                                _attr: {
                                    "hp:val": 20,
                                },
                            },
                        },
                        {
                            "w:szCs": {
                                _attr: {
                                    "hp:val": 20,
                                },
                            },
                        },
                    ],
                },
            ],
        });
    });

    it("HyperlinkStyle#constructor", () => {
        const style = new defaultStyles.HyperlinkStyle({});
        const tree = new Formatter().format(style);
        expect(tree).to.deep.equal({
            "hh:style": [
                { _attr: { "hp:type": "character", "w:styleId": "Hyperlink" } },
                { "hh:name": { _attr: { "hp:val": "Hyperlink" } } },
                { "w:basedOn": { _attr: { "hp:val": "DefaultParagraphFont" } } },
                {
                    "hh:uiPriority": {
                        _attr: {
                            "hp:val": 99,
                        },
                    },
                },
                {
                    "w:unhideWhenUsed": EMPTY_OBJECT,
                },
                {
                    "hp:charPr": [
                        {
                            "hp:color": {
                                _attr: {
                                    "hp:val": "0563C1",
                                },
                            },
                        },
                        { "hp:underline": { _attr: { "hp:val": "single" } } },
                    ],
                },
            ],
        });
    });

    it("HyperlinkStyle#constructor", () => {
        const style = new defaultStyles.HyperlinkStyle({
            run: {
                color: "FF0000",
                underline: {
                    color: "0000FF",
                },
            },
        });
        const tree = new Formatter().format(style);
        expect(tree).to.deep.equal({
            "hh:style": [
                { _attr: { "hp:type": "character", "w:styleId": "Hyperlink" } },
                { "hh:name": { _attr: { "hp:val": "Hyperlink" } } },
                { "w:basedOn": { _attr: { "hp:val": "DefaultParagraphFont" } } },
                {
                    "hh:uiPriority": {
                        _attr: {
                            "hp:val": 99,
                        },
                    },
                },
                {
                    "w:unhideWhenUsed": EMPTY_OBJECT,
                },
                {
                    "hp:charPr": [
                        {
                            "hp:color": {
                                _attr: {
                                    "hp:val": "FF0000",
                                },
                            },
                        },
                        { "hp:underline": { _attr: { "hp:color": "0000FF", "hp:val": "single" } } },
                    ],
                },
            ],
        });
    });
});
