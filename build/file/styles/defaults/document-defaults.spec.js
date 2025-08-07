import { describe, expect, it } from "vitest";
import { Formatter } from "@export/formatter";
import { DocumentDefaults } from "./document-defaults";
describe("DocumentDefaults", () => {
    it("#constructor", () => {
        const defaults = new DocumentDefaults({
            paragraph: { spacing: { line: 240 } },
            run: { color: "808080" },
        });
        const tree = new Formatter().format(defaults);
        expect(tree).to.deep.equal({
            "hh:docDefaults": [
                {
                    "hh:rPrDefault": [
                        {
                            "hp:charPr": [
                                {
                                    "hp:color": { _attr: { "hp:val": "808080" } },
                                },
                            ],
                        },
                    ],
                },
                {
                    "hh:pPrDefault": [
                        {
                            "hp:paraPr": [
                                {
                                    "hp:lineSpacing": {
                                        _attr: {
                                            "w:line": 240,
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    });
});
//# sourceMappingURL=document-defaults.spec.js.map