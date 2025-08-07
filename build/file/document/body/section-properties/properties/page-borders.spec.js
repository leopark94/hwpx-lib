import { describe, expect, it } from "vitest";
import { Formatter } from "@export/formatter";
import { BorderStyle } from "@file/border";
import { PageBorderDisplay, PageBorderZOrder, PageBorders } from "./page-borders";
describe("PageBorders", () => {
    describe("#constructor()", () => {
        it("should create empty element when no options are passed", () => {
            const properties = new PageBorders();
            expect(() => new Formatter().format(properties)).to.throw();
        });
        it("should create page borders with some configuration", () => {
            const properties = new PageBorders({
                pageBorders: {
                    display: PageBorderDisplay.FIRST_PAGE,
                },
            });
            const tree = new Formatter().format(properties);
            expect(Object.keys(tree)).to.deep.equal(["w:pgBorders"]);
            expect(tree["hp:pgBorders"]).to.deep.equal({ _attr: { "w:display": "firstPage" } });
        });
        it("should create page borders with default configuration", () => {
            const properties = new PageBorders({});
            const tree = new Formatter().format(properties);
            expect(Object.keys(tree)).to.deep.equal(["w:pgBorders"]);
            expect(tree).to.deep.equal({
                "w:pgBorders": {
                    _attr: {},
                },
            });
        });
        it("should create page borders with full configuration", () => {
            const properties = new PageBorders({
                pageBorders: {
                    display: PageBorderDisplay.FIRST_PAGE,
                    zOrder: PageBorderZOrder.BACK,
                },
                pageBorderTop: {
                    style: BorderStyle.DOUBLE_WAVE,
                    size: 10,
                    color: "001122",
                },
                pageBorderRight: {
                    style: BorderStyle.DOUBLE,
                    size: 20,
                    color: "223344",
                },
                pageBorderBottom: {
                    style: BorderStyle.SINGLE,
                    size: 30,
                    color: "556677",
                },
                pageBorderLeft: {
                    style: BorderStyle.DOTTED,
                    size: 40,
                    color: "889900",
                },
            });
            const tree = new Formatter().format(properties);
            expect(Object.keys(tree)).to.deep.equal(["w:pgBorders"]);
            expect(tree["hp:pgBorders"]).to.be.an.instanceof(Array);
            expect(tree["hp:pgBorders"][0]).to.deep.equal({ _attr: { "w:display": "firstPage", "w:zOrder": "back" } });
            expect(tree["hp:pgBorders"][1]).to.deep.equal({
                "hp:top": {
                    _attr: { "hp:color": "001122", "hp:sz": 10, "hp:val": "doubleWave" },
                },
            });
            expect(tree["hp:pgBorders"][2]).to.deep.equal({
                "hp:left": {
                    _attr: { "hp:color": "889900", "hp:sz": 40, "hp:val": "dotted" },
                },
            });
            expect(tree["hp:pgBorders"][3]).to.deep.equal({
                "hp:bottom": {
                    _attr: { "hp:color": "556677", "hp:sz": 30, "hp:val": "single" },
                },
            });
            expect(tree["hp:pgBorders"][4]).to.deep.equal({
                "hp:right": {
                    _attr: { "hp:color": "223344", "hp:sz": 20, "hp:val": "double" },
                },
            });
        });
    });
});
//# sourceMappingURL=page-borders.spec.js.map