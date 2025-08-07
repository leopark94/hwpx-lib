import { beforeEach, describe, expect, it } from "vitest";

import { Formatter } from "@export/formatter";

import { Body } from "./body";
import { sectionMarginDefaults } from "./section-properties";

describe("Body", () => {
    let body: Body;

    beforeEach(() => {
        body = new Body();
    });

    describe("#addSection", () => {
        it("should add section with default parameters", () => {
            body.addSection({
                page: {
                    size: {
                        width: 10000,
                        height: 10000,
                    },
                },
            });

            const tree = new Formatter().format(body);

            expect(tree).to.deep.equal({
                "hs:sec": [
                    {
                        "hs:sectPr": [
                            { "hs:pageSize": { _attr: { "hp:w": 10000, "hp:h": 10000, "w:orient": "portrait" } } },
                            {
                                "hs:pageMargin": {
                                    _attr: {
                                        "hp:top": sectionMarginDefaults.TOP,
                                        "hp:right": sectionMarginDefaults.RIGHT,
                                        "hp:bottom": sectionMarginDefaults.BOTTOM,
                                        "hp:left": sectionMarginDefaults.LEFT,
                                        "hp:header": sectionMarginDefaults.HEADER,
                                        "hp:footer": sectionMarginDefaults.FOOTER,
                                        "hp:gutter": sectionMarginDefaults.GUTTER,
                                    },
                                },
                            },
                            {
                                "hs:pageNumbers": {
                                    _attr: {},
                                },
                            },
                            // { "w:cols": { _attr: { "hp:space": 708, "w:sep": false, "w:num": 1 } } },
                            { "hs:docGrid": { _attr: { "hp:linePitch": 360 } } },
                        ],
                    },
                ],
            });
        });
    });
});
