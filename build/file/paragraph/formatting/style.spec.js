import { describe, expect, it } from "vitest";
import { Formatter } from "@export/formatter";
import { Style } from "./style";
describe("ParagraphStyle", () => {
    let style;
    describe("#constructor()", () => {
        it("should create a style with given value", () => {
            style = new Style("test");
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hp:pStyle": {
                    _attr: {
                        "hp:val": "test",
                    },
                },
            });
        });
        it("should create a style with blank val", () => {
            style = new Style("");
            const tree = new Formatter().format(style);
            expect(tree).to.deep.equal({
                "hp:pStyle": {
                    _attr: {
                        "hp:val": "",
                    },
                },
            });
        });
    });
});
//# sourceMappingURL=style.spec.js.map