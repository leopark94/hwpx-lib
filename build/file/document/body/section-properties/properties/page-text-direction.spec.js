import { describe, expect, it } from "vitest";
import { Formatter } from "@export/formatter";
import { PageTextDirection, PageTextDirectionType } from "./page-text-direction";
describe("PageTextDirection", () => {
    describe("#constructor()", () => {
        it("should set the direction of the text flow to top-to-bottom-right-to-left", () => {
            const textDirection = new PageTextDirection(PageTextDirectionType.TOP_TO_BOTTOM_RIGHT_TO_LEFT);
            const tree = new Formatter().format(textDirection);
            expect(tree).to.deep.equal({
                "hs:textDirection": {
                    _attr: {
                        "hp:val": "tbRl",
                    },
                },
            });
        });
    });
});
//# sourceMappingURL=page-text-direction.spec.js.map