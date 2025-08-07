import { describe, expect, it } from "vitest";

import { Formatter } from "@export/formatter";
import { Paragraph } from "@file/paragraph";

import { Textbox } from "./textbox";

describe("VmlTextbox", () => {
    it("should work", () => {
        const tree = new Formatter().format(
            new Textbox({
                style: {
                    width: "10pt",
                },
                children: [new Paragraph("test-content")],
            }),
        );

        expect(tree).toStrictEqual({
            "hp:p": [
                {
                    "w:pict": [
                        {
                            "v:shape": [
                                { _attr: { id: expect.any(String), type: "#_x0000_t202", style: "width:10pt" } },
                                {
                                    "v:textbox": [
                                        { _attr: { insetmode: "auto", style: "mso-fit-shape-to-text:t;" } },
                                        {
                                            "w:txbxContent": [
                                                {
                                                    "hp:p": [
                                                        {
                                                            "hp:run": [
                                                                { "hp:t": [{ _attr: { "xml:space": "preserve" } }, "test-content"] },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
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
