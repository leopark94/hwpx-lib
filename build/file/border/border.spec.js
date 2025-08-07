import { describe, expect, it } from "vitest";
import { Formatter } from "@export/formatter";
import { BorderStyle } from "@file/border";
import { BorderElement } from "./border";
describe("BorderElement", () => {
    describe("#constructor", () => {
        it("should create a simple border element", () => {
            const border = new BorderElement("hp:top", {
                style: BorderStyle.SINGLE,
            });
            const tree = new Formatter().format(border);
            expect(tree).to.deep.equal({
                "hp:top": {
                    _attr: {
                        "hp:val": "single",
                    },
                },
            });
        });
        it("should create a simple border element with a size", () => {
            const border = new BorderElement("hp:top", {
                style: BorderStyle.SINGLE,
                size: 22,
            });
            const tree = new Formatter().format(border);
            expect(tree).to.deep.equal({
                "hp:top": {
                    _attr: {
                        "hp:val": "single",
                        "hp:sz": 22,
                    },
                },
            });
        });
        it("should create a simple border element with space", () => {
            const border = new BorderElement("hp:top", {
                style: BorderStyle.SINGLE,
                space: 22,
            });
            const tree = new Formatter().format(border);
            expect(tree).to.deep.equal({
                "hp:top": {
                    _attr: {
                        "hp:val": "single",
                        "hp:space": 22,
                    },
                },
            });
        });
    });
});
//# sourceMappingURL=border.spec.js.map