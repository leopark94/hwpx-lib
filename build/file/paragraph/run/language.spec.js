import { describe, expect, it } from "vitest";
import { Formatter } from "@export/formatter";
import { createLanguageComponent } from "./language";
describe("Language", () => {
    describe("#createLanguageComponent", () => {
        it("should create a language component", () => {
            const tree = new Formatter().format(createLanguageComponent({
                value: "en-US",
                eastAsia: "zh-CN",
                bidirectional: "ar-SA",
            }));
            expect(tree).to.deep.equal({
                "hp:language": {
                    _attr: {
                        "hp:bidi": "ar-SA",
                        "hp:eastAsia": "zh-CN",
                        "hp:val": "en-US",
                    },
                },
            });
        });
    });
});
//# sourceMappingURL=language.spec.js.map