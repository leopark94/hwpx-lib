import { describe, expect, it } from "vitest";

import { Formatter } from "@export/formatter";

import { PageOrientation, createPageSize } from "./page-size";

describe("PageSize", () => {
    describe("#constructor()", () => {
        it("should create page size with portrait", () => {
            const properties = createPageSize({ width: 100, height: 200, orientation: PageOrientation.PORTRAIT });
            const tree = new Formatter().format(properties);

            expect(Object.keys(tree)).to.deep.equal(["hs:pageSize"]);
            expect(tree["hp:pgSz"]).to.deep.equal({ _attr: { "hp:h": 200, "hp:w": 100, "w:orient": "portrait" } });
        });

        it("should create page size with horizontal and invert the lengths", () => {
            const properties = createPageSize({ width: 100, height: 200, orientation: PageOrientation.LANDSCAPE });
            const tree = new Formatter().format(properties);

            expect(Object.keys(tree)).to.deep.equal(["hs:pageSize"]);
            expect(tree["hp:pgSz"]).to.deep.equal({ _attr: { "hp:h": 100, "hp:w": 200, "w:orient": "landscape" } });
        });
    });
});
