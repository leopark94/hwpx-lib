import { describe, expect, it } from "vitest";
import { Formatter } from "@export/formatter";
import { Shading, ShadingType } from "./shading";
describe("Shading", () => {
    describe("#constructor", () => {
        it("should create", () => {
            const shading = new Shading({});
            const tree = new Formatter().format(shading);
            expect(tree).to.deep.equal({
                "hp:shd": {
                    _attr: {},
                },
            });
        });
        it("should create with params", () => {
            const shading = new Shading({ type: ShadingType.PERCENT_40, color: "FF0000", fill: "555555" });
            const tree = new Formatter().format(shading);
            expect(tree).to.deep.equal({
                "hp:shd": {
                    _attr: {
                        "hp:color": "FF0000",
                        "hp:fill": "555555",
                        "hp:val": "pct40",
                    },
                },
            });
        });
    });
});
//# sourceMappingURL=shading.spec.js.map