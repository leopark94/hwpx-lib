import { describe, expect, it } from "vitest";
import { Formatter } from "@export/formatter";
import { Symbol } from "./symbol";
describe("Symbol", () => {
    describe("#constructor", () => {
        it("creates an empty symbol run if no character is given", () => {
            const s = new Symbol();
            const f = new Formatter().format(s);
            expect(f).to.deep.equal({ "w:sym": { _attr: { "w:char": "", "hh:font": "Wingdings" } } });
        });
        it("creates the provided symbol with default font", () => {
            const s = new Symbol("F071");
            const f = new Formatter().format(s);
            expect(f).to.deep.equal({ "w:sym": { _attr: { "w:char": "F071", "hh:font": "Wingdings" } } });
        });
        it("creates the provided symbol with the provided font", () => {
            const s = new Symbol("F071", "Arial");
            const f = new Formatter().format(s);
            expect(f).to.deep.equal({ "w:sym": { _attr: { "w:char": "F071", "hh:font": "Arial" } } });
        });
    });
});
//# sourceMappingURL=symbol.spec.js.map