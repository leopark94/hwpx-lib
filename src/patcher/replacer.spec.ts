import { describe, expect, it, vi } from "vitest";

import { IViewWrapper } from "@file/document-wrapper";
import { File } from "@file/file";
import { Paragraph, TextRun } from "@file/paragraph";

import { PatchType } from "./from-hwpx";
import { replacer } from "./replacer";

export const MOCK_JSON = {
    elements: [
        {
            type: "element",
            name: "w:hdr",
            elements: [
                {
                    type: "element",
                    name: "hp:p",
                    attributes: {
                        "w14:paraId": "3BE1A671",
                        "w14:textId": "74E856C4",
                        "hp:rsidR": "000D38A7",
                        "w:rsidRDefault": "000D38A7",
                    },
                    elements: [
                        {
                            type: "element",
                            name: "hp:paraPr",
                            elements: [{ type: "element", name: "hp:pStyle", attributes: { "hp:val": "Header" } }],
                        },
                        {
                            type: "element",
                            name: "hp:run",
                            elements: [{ type: "element", name: "hp:t", elements: [{ type: "text", text: "This is a {{head" }] }],
                        },
                        {
                            type: "element",
                            name: "hp:run",
                            attributes: { "hp:rsidR": "004A3A99" },
                            elements: [{ type: "element", name: "hp:t", elements: [{ type: "text", text: "er" }] }],
                        },
                        {
                            type: "element",
                            name: "hp:run",
                            elements: [
                                { type: "element", name: "hp:t", elements: [{ type: "text", text: "_adjective}} don’t you think?" }] },
                            ],
                        },
                    ],
                },
                {
                    type: "element",
                    name: "hp:p",
                    elements: [
                        {
                            type: "element",
                            name: "hp:run",
                            elements: [
                                {
                                    type: "element",
                                    name: "hp:charPr",
                                    elements: [{ type: "element", name: "hp:bold", attributes: { "hp:val": "1" } }],
                                },
                                {
                                    type: "element",
                                    name: "hp:t",
                                    elements: [{ type: "text", text: "What a {{bold}} text!" }],
                                },
                                {
                                    type: "element",
                                    name: "hp:br",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};

describe("replacer", () => {
    describe("replacer", () => {
        it("should return { didFindOccurrence: false } if nothing is added", () => {
            const { didFindOccurrence } = replacer({
                json: {
                    elements: [],
                },
                patch: {
                    type: PatchType.PARAGRAPH,
                    children: [],
                },
                patchText: "hello",
                context: vi.fn()(),
            });
            expect(didFindOccurrence).toBe(false);
        });

        it("should replace paragraph type", () => {
            const { element, didFindOccurrence } = replacer({
                json: JSON.parse(JSON.stringify(MOCK_JSON)),
                patch: {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun("Delightful Header")],
                },
                patchText: "{{header_adjective}}",
                context: {
                    file: {} as unknown as File,
                    viewWrapper: {
                        Relationships: {},
                    } as unknown as IViewWrapper,
                    stack: [],
                },
            });

            expect(JSON.stringify(element)).to.contain("Delightful Header");
            expect(didFindOccurrence).toBe(true);
        });

        it("should replace paragraph type keeping original styling if keepOriginalStyles is true", () => {
            const { element, didFindOccurrence } = replacer({
                json: JSON.parse(JSON.stringify(MOCK_JSON)),
                patch: {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun("sweet")],
                },
                patchText: "{{bold}}",
                context: {
                    file: {} as unknown as File,
                    viewWrapper: {
                        Relationships: {},
                    } as unknown as IViewWrapper,
                    stack: [],
                },
                keepOriginalStyles: true,
            });

            expect(JSON.stringify(element)).to.contain("sweet");
            expect(element.elements![0].elements![1].elements).toMatchObject([
                {
                    type: "element",
                    name: "hp:run",
                    elements: [
                        {
                            type: "element",
                            name: "hp:charPr",
                            elements: [{ type: "element", name: "hp:bold", attributes: { "hp:val": "1" } }],
                        },
                        {
                            type: "element",
                            name: "hp:t",
                            elements: [{ type: "text", text: "What a " }],
                        },
                    ],
                },
                {
                    type: "element",
                    name: "hp:run",
                    elements: [
                        {
                            type: "element",
                            name: "hp:charPr",
                            elements: [{ type: "element", name: "hp:bold", attributes: { "hp:val": "1" } }],
                        },
                        {
                            type: "element",
                            name: "hp:t",
                            elements: [{ type: "text", text: "sweet" }],
                        },
                    ],
                },
                {
                    type: "element",
                    name: "hp:run",
                    elements: [
                        {
                            type: "element",
                            name: "hp:charPr",
                            elements: [{ type: "element", name: "hp:bold", attributes: { "hp:val": "1" } }],
                        },
                        {
                            type: "element",
                            name: "hp:t",
                            elements: [{ type: "text", text: " text!" }],
                        },
                        {
                            name: "hp:br",
                            type: "element",
                        },
                    ],
                },
            ]);
            expect(didFindOccurrence).toBe(true);
        });

        it("should replace document type", () => {
            const { element, didFindOccurrence } = replacer({
                json: JSON.parse(JSON.stringify(MOCK_JSON)),
                patch: {
                    type: PatchType.DOCUMENT,
                    children: [new Paragraph("Lorem ipsum paragraph")],
                },
                patchText: "{{header_adjective}}",
                context: {
                    file: {} as unknown as File,
                    viewWrapper: {
                        Relationships: {},
                    } as unknown as IViewWrapper,
                    stack: [],
                },
            });

            expect(JSON.stringify(element)).to.contain("Lorem ipsum paragraph");
            expect(didFindOccurrence).toBe(true);
        });

        it("should replace", () => {
            // cspell:disable
            const { element, didFindOccurrence } = replacer({
                json: {
                    elements: [
                        {
                            type: "element",
                            name: "w:hdr",
                            elements: [
                                {
                                    type: "element",
                                    name: "hp:p",
                                    elements: [
                                        {
                                            type: "element",
                                            name: "hp:run",
                                            elements: [
                                                { type: "text", text: "\n                        " },
                                                {
                                                    type: "element",
                                                    name: "hp:charPr",
                                                    elements: [
                                                        { type: "text", text: "\n                            " },
                                                        {
                                                            type: "element",
                                                            name: "hp:rFonts",
                                                            attributes: { "hp:eastAsia": "Times New Roman" },
                                                        },
                                                        { type: "text", text: "\n                            " },
                                                        {
                                                            type: "element",
                                                            name: "hp:kern",
                                                            attributes: { "hp:val": "0" },
                                                        },
                                                        { type: "text", text: "\n                            " },
                                                        {
                                                            type: "element",
                                                            name: "hp:sz",
                                                            attributes: { "hp:val": "20" },
                                                        },
                                                        { type: "text", text: "\n                            " },
                                                        {
                                                            type: "element",
                                                            name: "hp:language",
                                                            attributes: {
                                                                "hp:val": "en-US",
                                                                "hp:eastAsia": "en-US",
                                                                "hp:bidi": "ar-SA",
                                                            },
                                                        },
                                                        { type: "text", text: "\n                        " },
                                                    ],
                                                },
                                                { type: "text", text: "\n                        " },
                                                {
                                                    type: "element",
                                                    name: "hp:t",
                                                    elements: [{ type: "text", text: "{{" }],
                                                },
                                                { type: "text", text: "\n                    " },
                                            ],
                                        },
                                        { type: "text", text: "\n                    " },
                                        {
                                            type: "element",
                                            name: "hp:run",
                                            elements: [
                                                { type: "text", text: "\n                        " },
                                                {
                                                    type: "element",
                                                    name: "hp:charPr",
                                                    elements: [
                                                        { type: "text", text: "\n                            " },
                                                        {
                                                            type: "element",
                                                            name: "hp:rFonts",
                                                            attributes: { "hp:eastAsia": "Times New Roman" },
                                                        },
                                                        { type: "text", text: "\n                            " },
                                                        {
                                                            type: "element",
                                                            name: "hp:kern",
                                                            attributes: { "hp:val": "0" },
                                                        },
                                                        { type: "text", text: "\n                            " },
                                                        {
                                                            type: "element",
                                                            name: "hp:sz",
                                                            attributes: { "hp:val": "20" },
                                                        },
                                                        { type: "text", text: "\n          " },
                                                        {
                                                            type: "element",
                                                            name: "hp:language",
                                                            attributes: {
                                                                "hp:val": "en-US",
                                                                "hp:eastAsia": "en-US",
                                                                "hp:bidi": "ar-SA",
                                                            },
                                                        },
                                                        { type: "text", text: "\n                        " },
                                                    ],
                                                },
                                                { type: "text", text: "\n                        " },
                                                {
                                                    type: "element",
                                                    name: "hp:t",
                                                    elements: [{ type: "text", text: "s" }],
                                                },
                                                { type: "text", text: "\n                    " },
                                            ],
                                        },
                                        { type: "text", text: "\n  " },
                                        {
                                            type: "element",
                                            name: "hp:run",
                                            elements: [
                                                { type: "text", text: "\n                        " },
                                                {
                                                    type: "element",
                                                    name: "hp:charPr",
                                                    elements: [
                                                        { type: "text", text: "\n    " },
                                                        {
                                                            type: "element",
                                                            name: "hp:rFonts",
                                                            attributes: { "hp:eastAsia": "Times New Roman" },
                                                        },
                                                        { type: "text", text: "\n                            " },
                                                        {
                                                            type: "element",
                                                            name: "hp:kern",
                                                            attributes: { "hp:val": "0" },
                                                        },
                                                        { type: "text", text: "\n                            " },
                                                        {
                                                            type: "element",
                                                            name: "hp:sz",
                                                            attributes: { "hp:val": "20" },
                                                        },
                                                        { type: "text", text: "\n                            " },
                                                        {
                                                            type: "element",
                                                            name: "hp:language",
                                                            attributes: {
                                                                "hp:val": "en-US",
                                                                "hp:eastAsia": "en-US",
                                                                "hp:bidi": "ar-SA",
                                                            },
                                                        },
                                                        { type: "text", text: "\n                        " },
                                                    ],
                                                },
                                                { type: "text", text: "\n      " },
                                                {
                                                    type: "element",
                                                    name: "hp:t",
                                                    elements: [{ type: "text", text: "chool_" }],
                                                },
                                                { type: "text", text: "\n                    " },
                                            ],
                                        },
                                        { type: "text", text: "\n                    " },
                                        {
                                            type: "element",
                                            name: "hp:run",
                                            elements: [
                                                { type: "text", text: "\n                        " },
                                                {
                                                    type: "element",
                                                    name: "hp:charPr",
                                                    elements: [
                                                        { type: "text", text: "\n                            " },
                                                        {
                                                            type: "element",
                                                            name: "hp:rFonts",
                                                            attributes: { "hp:eastAsia": "Times New Roman" },
                                                        },
                                                        { type: "text", text: "\n                            " },
                                                        {
                                                            type: "element",
                                                            name: "hp:kern",
                                                            attributes: { "hp:val": "0" },
                                                        },
                                                        { type: "text", text: "\n                            " },
                                                        {
                                                            type: "element",
                                                            name: "hp:sz",
                                                            attributes: { "hp:val": "20" },
                                                        },
                                                        { type: "text", text: "\n                            " },
                                                        {
                                                            type: "element",
                                                            name: "hp:language",
                                                            attributes: {
                                                                "hp:val": "en-US",
                                                                "hp:eastAsia": "en-US",
                                                                "hp:bidi": "ar-SA",
                                                            },
                                                        },
                                                        { type: "text", text: "\n                        " },
                                                    ],
                                                },
                                                { type: "text", text: "\n                        " },
                                                {
                                                    type: "element",
                                                    name: "hp:t",
                                                    elements: [{ type: "text", text: "n" }],
                                                },
                                                { type: "text", text: "\n                    " },
                                            ],
                                        },
                                        { type: "text", text: "\n                    " },
                                        {
                                            type: "element",
                                            name: "hp:run",
                                            elements: [
                                                { type: "text", text: "\n                        " },
                                                {
                                                    type: "element",
                                                    name: "hp:t",
                                                    elements: [{ type: "text", text: "{{" }],
                                                },
                                                { type: "text", text: "\n                    " },
                                            ],
                                        },
                                        { type: "text", text: "\n                    " },
                                        {
                                            type: "element",
                                            name: "hp:run",
                                            elements: [
                                                { type: "text", text: "\n                        " },
                                                {
                                                    type: "element",
                                                    name: "hp:charPr",
                                                    elements: [
                                                        { type: "text", text: "\n                            " },
                                                        {
                                                            type: "element",
                                                            name: "hp:rFonts",
                                                            attributes: { "hp:eastAsia": "Times New Roman" },
                                                        },
                                                        { type: "text", text: "\n                            " },
                                                        {
                                                            type: "element",
                                                            name: "hp:kern",
                                                            attributes: { "hp:val": "0" },
                                                        },
                                                        { type: "text", text: "\n                            " },
                                                        {
                                                            type: "element",
                                                            name: "hp:sz",
                                                            attributes: { "hp:val": "20" },
                                                        },
                                                        { type: "text", text: "\n                            " },
                                                        {
                                                            type: "element",
                                                            name: "hp:language",
                                                            attributes: {
                                                                "hp:val": "en-US",
                                                                "hp:eastAsia": "en-US",
                                                                "hp:bidi": "ar-SA",
                                                            },
                                                        },
                                                        { type: "text", text: "\n                        " },
                                                    ],
                                                },
                                                { type: "text", text: "\n                        " },
                                                {
                                                    type: "element",
                                                    name: "hp:t",
                                                    elements: [{ type: "text", text: "a" }],
                                                },
                                                { type: "text", text: "\n                    " },
                                            ],
                                        },
                                        { type: "text", text: "\n                    " },
                                        {
                                            type: "element",
                                            name: "hp:run",
                                            elements: [
                                                { type: "text", text: "\n                        " },
                                                {
                                                    type: "element",
                                                    name: "hp:charPr",
                                                    elements: [
                                                        { type: "text", text: "\n                            " },
                                                        {
                                                            type: "element",
                                                            name: "hp:rFonts",
                                                            attributes: { "hp:eastAsia": "Times New Roman" },
                                                        },
                                                        { type: "text", text: "\n                            " },
                                                        {
                                                            type: "element",
                                                            name: "hp:kern",
                                                            attributes: { "hp:val": "0" },
                                                        },
                                                        { type: "text", text: "\n            " },
                                                        {
                                                            type: "element",
                                                            name: "hp:sz",
                                                            attributes: { "hp:val": "20" },
                                                        },
                                                        { type: "text", text: "\n                            " },
                                                        {
                                                            type: "element",
                                                            name: "hp:language",
                                                            attributes: {
                                                                "hp:val": "en-US",
                                                                "hp:eastAsia": "en-US",
                                                                "hp:bidi": "ar-SA",
                                                            },
                                                        },
                                                        { type: "text", text: "\n                        " },
                                                    ],
                                                },
                                                { type: "text", text: "\n                        " },
                                                {
                                                    type: "element",
                                                    name: "hp:t",
                                                    elements: [{ type: "text", text: "ddr" }],
                                                },
                                                { type: "text", text: "\n                    " },
                                            ],
                                        },
                                        { type: "text", text: "\n                    " },
                                        {
                                            type: "element",
                                            name: "hp:run",
                                            elements: [
                                                { type: "text", text: "\n                        " },
                                                {
                                                    type: "element",
                                                    name: "hp:charPr",
                                                    elements: [
                                                        { type: "text", text: "\n                            " },
                                                        {
                                                            type: "element",
                                                            name: "hp:rFonts",
                                                            attributes: { "hp:eastAsia": "Times New Roman" },
                                                        },
                                                        { type: "text", text: "\n                            " },
                                                        {
                                                            type: "element",
                                                            name: "hp:kern",
                                                            attributes: { "hp:val": "0" },
                                                        },
                                                        { type: "text", text: "\n                            " },
                                                        {
                                                            type: "element",
                                                            name: "hp:sz",
                                                            attributes: { "hp:val": "20" },
                                                        },
                                                        { type: "text", text: "\n                            " },
                                                        {
                                                            type: "element",
                                                            name: "hp:language",
                                                            attributes: {
                                                                "hp:val": "en-US",
                                                                "hp:eastAsia": "en-US",
                                                                "hp:bidi": "ar-SA",
                                                            },
                                                        },
                                                        { type: "text", text: "\n                        " },
                                                    ],
                                                },
                                                { type: "text", text: "\n                        " },
                                                {
                                                    type: "element",
                                                    name: "hp:t",
                                                    elements: [{ type: "text", text: "ess" }],
                                                },
                                                { type: "text", text: "\n                    " },
                                            ],
                                        },
                                        { type: "text", text: "\n                    " },
                                        {
                                            type: "element",
                                            name: "hp:run",
                                            elements: [
                                                { type: "text", text: "\n      " },
                                                {
                                                    type: "element",
                                                    name: "hp:charPr",
                                                    elements: [
                                                        { type: "text", text: "\n                            " },
                                                        {
                                                            type: "element",
                                                            name: "hp:rFonts",
                                                            attributes: { "hp:eastAsia": "Times New Roman" },
                                                        },
                                                        { type: "text", text: "\n                            " },
                                                        {
                                                            type: "element",
                                                            name: "hp:kern",
                                                            attributes: { "hp:val": "0" },
                                                        },
                                                        { type: "text", text: "\n                            " },
                                                        {
                                                            type: "element",
                                                            name: "hp:sz",
                                                            attributes: { "hp:val": "20" },
                                                        },
                                                        { type: "text", text: "\n                            " },
                                                        {
                                                            type: "element",
                                                            name: "hp:language",
                                                            attributes: {
                                                                "hp:val": "en-US",
                                                                "hp:eastAsia": "en-US",
                                                                "hp:bidi": "ar-SA",
                                                            },
                                                        },
                                                        { type: "text", text: "\n                        " },
                                                    ],
                                                },
                                                { type: "text", text: "\n                        " },
                                                {
                                                    type: "element",
                                                    name: "hp:t",
                                                    elements: [{ type: "text", text: "}}" }],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                // cspell:enable
                patch: {
                    type: PatchType.PARAGRAPH,
                    children: [new Paragraph("Lorem ipsum paragraph")],
                },
                patchText: "{{address}}",
                context: {
                    file: {} as unknown as File,
                    viewWrapper: {
                        Relationships: {},
                    } as unknown as IViewWrapper,
                    stack: [],
                },
            });

            expect(JSON.stringify(element)).to.contain("Lorem ipsum paragraph");
            expect(didFindOccurrence).toBe(true);
        });

        it("should handle empty runs in patches", () => {
            // cspell:disable
            const { element, didFindOccurrence } = replacer({
                json: {
                    elements: [
                        {
                            type: "element",
                            name: "w:hdr",
                            elements: [
                                {
                                    type: "element",
                                    name: "hp:p",
                                    elements: [
                                        {
                                            type: "element",
                                            name: "hp:run",
                                            elements: [
                                                { type: "text", text: "\n                        " },
                                                {
                                                    type: "element",
                                                    name: "hp:charPr",
                                                    elements: [
                                                        { type: "text", text: "\n                            " },
                                                        {
                                                            type: "element",
                                                            name: "hp:rFonts",
                                                            attributes: { "hp:eastAsia": "Times New Roman" },
                                                        },
                                                        { type: "text", text: "\n                        " },
                                                    ],
                                                },
                                                { type: "text", text: "\n                        " },
                                                {
                                                    type: "element",
                                                    name: "hp:t",
                                                    elements: [{ type: "text", text: "{{empty}}" }],
                                                },
                                                { type: "text", text: "\n                    " },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                // cspell:enable
                patch: {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun({})],
                },
                patchText: "{{empty}}",
                context: {
                    file: {} as unknown as File,
                    viewWrapper: {
                        Relationships: {},
                    } as unknown as IViewWrapper,
                    stack: [],
                },
                keepOriginalStyles: true,
            });

            expect(JSON.stringify(element)).not.to.contain("{{empty}}");
            expect(didFindOccurrence).toBe(true);
        });
    });
});
