import { describe, expect, it } from "vitest";
import { Formatter } from "@export/formatter";
import * as components from "./components";
describe("Style components", () => {
    it("Name#constructor", () => {
        const style = new components.Name("Style Name");
        const tree = new Formatter().format(style);
        expect(tree).to.deep.equal({ "hh:name": { _attr: { "hp:val": "Style Name" } } });
    });
    it("UiPriority#constructor", () => {
        const style = new components.UiPriority(123);
        const tree = new Formatter().format(style);
        expect(tree).to.deep.equal({ "hh:uiPriority": { _attr: { "hp:val": 123 } } });
    });
});
//# sourceMappingURL=components.spec.js.map