import { describe, expect, it } from "vitest";

import { findRunElementIndexWithToken, splitRunElement } from "./paragraph-split-inject";

describe("paragraph-split-inject", () => {
    describe("findRunElementIndexWithToken", () => {
        it("should find the index of a run element with a token", () => {
            const output = findRunElementIndexWithToken(
                {
                    name: "hp:p",
                    type: "element",
                    elements: [
                        {
                            name: "hp:run",
                            type: "element",
                            elements: [
                                {
                                    name: "hp:t",
                                    type: "element",
                                    elements: [
                                        {
                                            type: "text",
                                            text: "hello world",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                "hello",
            );
            expect(output).to.deep.equal(0);
        });

        it("should throw an exception when ran with empty elements", () => {
            expect(() =>
                findRunElementIndexWithToken(
                    {
                        name: "hp:p",
                        type: "element",
                    },
                    "hello",
                ),
            ).to.throw();
        });

        it("should throw an exception when ran with empty elements", () => {
            expect(() =>
                findRunElementIndexWithToken(
                    {
                        name: "hp:p",
                        type: "element",
                        elements: [
                            {
                                name: "hp:run",
                                type: "element",
                            },
                        ],
                    },
                    "hello",
                ),
            ).to.throw();
        });

        it("should throw an exception when ran with empty elements", () => {
            expect(() =>
                findRunElementIndexWithToken(
                    {
                        name: "hp:p",
                        type: "element",
                        elements: [
                            {
                                name: "hp:run",
                                type: "element",
                                elements: [
                                    {
                                        name: "hp:t",
                                        type: "element",
                                    },
                                ],
                            },
                        ],
                    },
                    "hello",
                ),
            ).to.throw();
        });

        it("should continue if text run doesn't have text", () => {
            expect(() =>
                findRunElementIndexWithToken(
                    {
                        name: "hp:p",
                        type: "element",
                        elements: [
                            {
                                name: "hp:run",
                                type: "element",
                                elements: [
                                    {
                                        name: "hp:t",
                                        type: "element",
                                    },
                                ],
                            },
                        ],
                    },
                    "hello",
                ),
            ).to.throw();
        });

        it("should continue if text run doesn't have text", () => {
            expect(() =>
                findRunElementIndexWithToken(
                    {
                        name: "hp:p",
                        type: "element",
                        elements: [
                            {
                                name: "hp:run",
                                type: "element",
                                elements: [
                                    {
                                        name: "hp:t",
                                        type: "element",
                                        elements: [
                                            {
                                                type: "text",
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    "hello",
                ),
            ).to.throw();
        });
    });

    describe("splitRunElement", () => {
        it("should split a run element", () => {
            const output = splitRunElement(
                {
                    name: "hp:run",
                    type: "element",
                    elements: [
                        {
                            name: "hp:t",
                            type: "element",
                            elements: [
                                {
                                    type: "text",
                                    text: "hello*world",
                                },
                            ],
                        },
                        {
                            name: "hp:x",
                            type: "element",
                        },
                    ],
                },
                "*",
            );

            expect(output).to.deep.equal({
                left: {
                    elements: [
                        {
                            attributes: {
                                "xml:space": "preserve",
                            },
                            elements: [
                                {
                                    text: "hello",
                                    type: "text",
                                },
                            ],
                            name: "hp:t",
                            type: "element",
                        },
                    ],
                    name: "hp:run",
                    type: "element",
                },
                right: {
                    elements: [
                        {
                            attributes: {
                                "xml:space": "preserve",
                            },
                            elements: [
                                {
                                    text: "world",
                                    type: "text",
                                },
                            ],
                            name: "hp:t",
                            type: "element",
                        },
                        {
                            name: "hp:x",
                            type: "element",
                        },
                    ],
                    name: "hp:run",
                    type: "element",
                },
            });
        });

        it("should try to split even if elements is empty for text", () => {
            const output = splitRunElement(
                {
                    name: "hp:run",
                    type: "element",
                    elements: [
                        {
                            name: "hp:t",
                            type: "element",
                        },
                    ],
                },
                "*",
            );

            expect(output).to.deep.equal({
                left: {
                    elements: [
                        {
                            attributes: {
                                "xml:space": "preserve",
                            },
                            elements: [],
                            name: "hp:t",
                            type: "element",
                        },
                    ],
                    name: "hp:run",
                    type: "element",
                },
                right: {
                    elements: [],
                    name: "hp:run",
                    type: "element",
                },
            });
        });

        it("should return empty elements", () => {
            const output = splitRunElement(
                {
                    name: "hp:run",
                    type: "element",
                },
                "*",
            );

            expect(output).to.deep.equal({
                left: {
                    elements: [],
                    name: "hp:run",
                    type: "element",
                },
                right: {
                    elements: [],
                    name: "hp:run",
                    type: "element",
                },
            });
        });

        it("should create an empty end element if it is at the end", () => {
            const output = splitRunElement(
                {
                    type: "element",
                    name: "hp:run",
                    elements: [
                        {
                            type: "element",
                            name: "hp:charPr",
                            elements: [
                                { type: "element", name: "hp:rFonts", attributes: { "hp:eastAsia": "Times New Roman" } },
                                { type: "element", name: "hp:kern", attributes: { "hp:val": "0" } },
                                { type: "element", name: "hp:sz", attributes: { "hp:val": "20" } },
                                {
                                    type: "element",
                                    name: "hp:language",
                                    attributes: { "hp:val": "en-US", "hp:eastAsia": "en-US", "hp:bidi": "ar-SA" },
                                },
                            ],
                        },
                        { type: "element", name: "hp:t", elements: [], attributes: { "xml:space": "preserve" } },
                        { type: "element", name: "hp:br" },
                        { type: "element", name: "hp:t", elements: [{ type: "text", text: "ɵ" }] },
                    ],
                },
                "ɵ",
            );

            expect(output).to.deep.equal({
                left: {
                    type: "element",
                    name: "hp:run",
                    elements: [
                        {
                            type: "element",
                            name: "hp:charPr",
                            elements: [
                                { type: "element", name: "hp:rFonts", attributes: { "hp:eastAsia": "Times New Roman" } },
                                { type: "element", name: "hp:kern", attributes: { "hp:val": "0" } },
                                { type: "element", name: "hp:sz", attributes: { "hp:val": "20" } },
                                {
                                    type: "element",
                                    name: "hp:language",
                                    attributes: { "hp:val": "en-US", "hp:eastAsia": "en-US", "hp:bidi": "ar-SA" },
                                },
                            ],
                        },
                        { type: "element", name: "hp:t", elements: [], attributes: { "xml:space": "preserve" } },
                        { type: "element", name: "hp:br" },
                        { type: "element", name: "hp:t", elements: [], attributes: { "xml:space": "preserve" } },
                    ],
                },
                right: {
                    type: "element",
                    name: "hp:run",
                    elements: [{ type: "element", name: "hp:t", elements: [], attributes: { "xml:space": "preserve" } }],
                },
            });
        });
    });
});
