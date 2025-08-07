import { describe, expect, it } from "vitest";

import { replaceTokenInParagraphElement } from "./paragraph-token-replacer";

describe("paragraph-token-replacer", () => {
    describe("replaceTokenInParagraphElement", () => {
        it("should replace token in paragraph", () => {
            const output = replaceTokenInParagraphElement({
                paragraphElement: {
                    name: "hp:p",
                    elements: [
                        {
                            name: "hp:run",
                            elements: [
                                {
                                    name: "hp:t",
                                    elements: [
                                        {
                                            type: "text",
                                            text: "hello",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                renderedParagraph: {
                    index: 0,
                    pathToParagraph: [0],
                    runs: [
                        {
                            end: 4,
                            index: 0,
                            parts: [
                                {
                                    end: 4,
                                    index: 0,
                                    start: 0,
                                    text: "hello",
                                },
                            ],
                            start: 0,
                            text: "hello",
                        },
                    ],
                    text: "hello",
                },
                originalText: "hello",
                replacementText: "world",
            });

            expect(output).to.deep.equal({
                elements: [
                    {
                        elements: [
                            {
                                elements: [
                                    {
                                        text: "world",
                                        type: "text",
                                    },
                                ],
                                name: "hp:t",
                            },
                        ],
                        name: "hp:run",
                    },
                ],
                name: "hp:p",
            });
        });

        it("should handle case where it cannot find any text to replace", () => {
            const output = replaceTokenInParagraphElement({
                paragraphElement: {
                    name: "hp:p",
                    attributes: {
                        "w14:paraId": "2499FE9F",
                        "w14:textId": "27B4FBC2",
                        "hp:rsidR": "00B51233",
                        "w:rsidRDefault": "007B52ED",
                        "w:rsidP": "007B52ED",
                    },
                    elements: [
                        {
                            type: "element",
                            name: "hp:paraPr",
                            elements: [{ type: "element", name: "hp:pStyle", attributes: { "hp:val": "Title" } }],
                        },
                        {
                            type: "element",
                            name: "hp:run",
                            elements: [
                                {
                                    type: "element",
                                    name: "hp:t",
                                    attributes: { "xml:space": "preserve" },
                                    elements: [{ type: "text", text: "Hello " }],
                                },
                            ],
                        },
                        {
                            type: "element",
                            name: "hp:run",
                            attributes: { "hp:rsidR": "007F116B" },
                            elements: [
                                {
                                    type: "element",
                                    name: "hp:t",
                                    attributes: { "xml:space": "preserve" },
                                    elements: [{ type: "text", text: "{{name}} " }],
                                },
                            ],
                        },
                        {
                            type: "element",
                            name: "hp:run",
                            elements: [{ type: "element", name: "hp:t", elements: [{ type: "text", text: "World" }] }],
                        },
                    ],
                },
                renderedParagraph: {
                    text: "Hello {{name}} World",
                    runs: [
                        { text: "Hello ", parts: [{ text: "Hello ", index: 0, start: 0, end: 5 }], index: 1, start: 0, end: 5 },
                        { text: "{{name}} ", parts: [{ text: "{{name}} ", index: 0, start: 6, end: 14 }], index: 2, start: 6, end: 14 },
                        { text: "World", parts: [{ text: "World", index: 0, start: 15, end: 19 }], index: 3, start: 15, end: 19 },
                    ],
                    index: 0,
                    pathToParagraph: [0, 1, 0, 0],
                },
                originalText: "{{name}}",
                replacementText: "John",
            });

            expect(output).to.deep.equal({
                attributes: {
                    "w14:paraId": "2499FE9F",
                    "w14:textId": "27B4FBC2",
                    "w:rsidP": "007B52ED",
                    "hp:rsidR": "00B51233",
                    "w:rsidRDefault": "007B52ED",
                },
                elements: [
                    {
                        elements: [
                            {
                                attributes: {
                                    "hp:val": "Title",
                                },
                                name: "hp:pStyle",
                                type: "element",
                            },
                        ],
                        name: "hp:paraPr",
                        type: "element",
                    },
                    {
                        elements: [
                            {
                                attributes: {
                                    "xml:space": "preserve",
                                },
                                elements: [
                                    {
                                        text: "Hello ",
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
                    {
                        attributes: {
                            "hp:rsidR": "007F116B",
                        },
                        elements: [
                            {
                                attributes: {
                                    "xml:space": "preserve",
                                },
                                elements: [
                                    {
                                        text: "John ",
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
                    {
                        elements: [
                            {
                                attributes: {
                                    "xml:space": "preserve",
                                },
                                elements: [
                                    {
                                        text: "World",
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
                ],
                name: "hp:p",
            });
        });

        // Try to fill rest of test coverage
        // it("should replace token in paragraph", () => {
        //     const output = replaceTokenInParagraphElement({
        //         paragraphElement: {
        //             name: "hp:p",
        //             elements: [
        //                 {
        //                     name: "hp:run",
        //                     elements: [
        //                         {
        //                             name: "hp:t",
        //                             elements: [
        //                                 {
        //                                     type: "text",
        //                                     text: "test ",
        //                                 },
        //                             ],
        //                         },
        //                         {
        //                             name: "hp:t",
        //                             elements: [
        //                                 {
        //                                     type: "text",
        //                                     text: " hello ",
        //                                 },
        //                             ],
        //                         },
        //                     ],
        //                 },
        //             ],
        //         },
        //         renderedParagraph: {
        //             index: 0,
        //             path: [0],
        //             runs: [
        //                 {
        //                     end: 4,
        //                     index: 0,
        //                     parts: [
        //                         {
        //                             end: 4,
        //                             index: 0,
        //                             start: 0,
        //                             text: "test ",
        //                         },
        //                     ],
        //                     start: 0,
        //                     text: "test ",
        //                 },
        //                 {
        //                     end: 10,
        //                     index: 0,
        //                     parts: [
        //                         {
        //                             end: 10,
        //                             index: 0,
        //                             start: 5,
        //                             text: "hello ",
        //                         },
        //                     ],
        //                     start: 5,
        //                     text: "hello ",
        //                 },
        //             ],
        //             text: "test hello ",
        //         },
        //         originalText: "hello",
        //         replacementText: "world",
        //     });

        //     expect(output).to.deep.equal({
        //         elements: [
        //             {
        //                 elements: [
        //                     {
        //                         elements: [
        //                             {
        //                                 text: "test world ",
        //                                 type: "text",
        //                             },
        //                         ],
        //                         name: "hp:t",
        //                     },
        //                 ],
        //                 name: "hp:run",
        //             },
        //         ],
        //         name: "hp:p",
        //     });
        // });
    });
});
