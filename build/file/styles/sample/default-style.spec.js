import { describe, expect, it } from "vitest";
import { DefaultStyle } from "./default-style";
describe("DefaultStyle", () => {
    it("creates an initially empty property object", () => {
        const style = DefaultStyle();
        expect(style).to.have.property("hh:styles");
        expect(style["hh:styles"].length).to.be.greaterThan(1);
        expect(style["hh:styles"][1]).to.have.property("hp:docDefaults");
    });
});
//# sourceMappingURL=default-style.spec.js.map