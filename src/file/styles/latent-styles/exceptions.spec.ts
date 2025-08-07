import { describe, expect, it } from "vitest";

import { Formatter } from "@export/formatter";

import { LatentStyleException } from "./exceptions";

describe("LatentStyleException", () => {
    describe("#constructor()", () => {
        it("should create", () => {
            const currentLatentStyleException = new LatentStyleException({
                name: "test-name",
                uiPriority: "test-uiPriority",
                qFormat: "test-qFormat",
                semiHidden: "test-semiHidden",
                unhideWhenUsed: "test-unhideWhenUsed",
            });

            const tree = new Formatter().format(currentLatentStyleException);
            expect(tree).to.deep.equal({
                "w:lsdException": {
                    _attr: {
                        "hh:name": "test-name",
                        "hh:qFormat": "test-qFormat",
                        "hh:semiHidden": "test-semiHidden",
                        "hh:uiPriority": "test-uiPriority",
                        "hh:unhideWhenUsed": "test-unhideWhenUsed",
                    },
                },
            });
        });
    });
});
