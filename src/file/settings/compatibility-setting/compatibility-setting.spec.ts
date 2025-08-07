import { describe, expect, it } from "vitest";

import { Formatter } from "@export/formatter";

import { CompatibilitySetting } from "./compatibility-setting";

describe("CompatibilitySetting", () => {
    describe("#constructor", () => {
        it("creates an initially empty property object", () => {
            const compatibilitySetting = new CompatibilitySetting(15);

            const tree = new Formatter().format(compatibilitySetting);
            expect(tree).to.deep.equal({
                "ha:compatSetting": {
                    _attr: {
                        "hh:name": "compatibilityMode",
                        "ha:uri": "http://schemas.microsoft.com/office/word",
                        "hp:val": 15,
                    },
                },
            });
        });
    });
});
