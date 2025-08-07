import { describe, expect, it } from "vitest";
import { Formatter } from "@export/formatter";
import { EMPTY_OBJECT } from "@file/xml-components";
import { Styles } from "./styles";
describe("Styles", () => {
    describe("#createParagraphStyle", () => {
        it("should create a new paragraph style and push it onto this collection", () => {
            const styles = new Styles({
                paragraphStyles: [
                    {
                        id: "pStyleId",
                    },
                ],
            });
            const tree = new Formatter().format(styles)["hh:styles"].filter((x) => !x._attr);
            expect(tree).to.deep.equal([
                {
                    "hh:style": { _attr: { "hp:type": "paragraph", "hh:styleId": "pStyleId" } },
                },
            ]);
        });
        it("should set the paragraph name if given", () => {
            const styles = new Styles({
                paragraphStyles: [
                    {
                        id: "pStyleId",
                        name: "Paragraph Style",
                    },
                ],
            });
            const tree = new Formatter().format(styles)["hh:styles"].filter((x) => !x._attr);
            expect(tree).to.deep.equal([
                {
                    "hh:style": [
                        { _attr: { "hp:type": "paragraph", "hh:styleId": "pStyleId" } },
                        { "hh:name": { _attr: { "hp:val": "Paragraph Style" } } },
                    ],
                },
            ]);
        });
    });
    describe("#createCharacterStyle", () => {
        it("should create a new character style and push it onto this collection", () => {
            const styles = new Styles({
                characterStyles: [
                    {
                        id: "pStyleId",
                    },
                ],
            });
            const tree = new Formatter().format(styles)["hh:styles"].filter((x) => !x._attr);
            expect(tree).to.deep.equal([
                {
                    "hh:style": [
                        { _attr: { "hp:type": "character", "hh:styleId": "pStyleId" } },
                        {
                            "hh:uiPriority": {
                                _attr: {
                                    "hp:val": 99,
                                },
                            },
                        },
                        {
                            "hh:unhideWhenUsed": EMPTY_OBJECT,
                        },
                    ],
                },
            ]);
        });
        it("should set the character name if given", () => {
            const styles = new Styles({
                characterStyles: [
                    {
                        id: "pStyleId",
                        name: "Character Style",
                    },
                ],
            });
            const tree = new Formatter().format(styles)["hh:styles"].filter((x) => !x._attr);
            expect(tree).to.deep.equal([
                {
                    "hh:style": [
                        { _attr: { "hp:type": "character", "hh:styleId": "pStyleId" } },
                        { "hh:name": { _attr: { "hp:val": "Character Style" } } },
                        {
                            "hh:uiPriority": {
                                _attr: {
                                    "hp:val": 99,
                                },
                            },
                        },
                        {
                            "hh:unhideWhenUsed": EMPTY_OBJECT,
                        },
                    ],
                },
            ]);
        });
    });
});
//# sourceMappingURL=styles.spec.js.map