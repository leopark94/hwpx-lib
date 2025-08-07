import { describe, expect, it } from "vitest";
import { Formatter } from "@export/formatter";
import { WordWrap } from "./word-wrap";
describe("WordWrap", () => {
    it("should create", () => {
        const wordWrap = new WordWrap();
        const tree = new Formatter().format(wordWrap);
        expect(tree).to.deep.equal({
            "hp:wordWrap": {
                _attr: {
                    "hp:val": 0,
                },
            },
        });
    });
});
//# sourceMappingURL=word-wrap.spec.js.map