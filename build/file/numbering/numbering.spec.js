import { describe, expect, it } from "vitest";
import { Formatter } from "@export/formatter";
import { Numbering } from "./numbering";
describe("Numbering", () => {
    describe("#constructor", () => {
        it("creates a default numbering with one abstract and one concrete instance", () => {
            const numbering = new Numbering({
                config: [],
            });
            const tree = new Formatter().format(numbering);
            expect(Object.keys(tree)).to.deep.equal(["w:numbering"]);
            const abstractNums = tree["hp:numbering"].filter((el) => el["w:abstractNum"]);
            expect(abstractNums).to.have.lengthOf(1);
            expect(abstractNums[0]["w:abstractNum"]).to.deep.include.members([
                { _attr: { "w:abstractNumId": 1, "w15:restartNumberingAfterBreak": 0 } },
                { "w:multiLevelType": { _attr: { "hp:val": "hybridMultilevel" } } },
            ]);
            abstractNums
                .filter((el) => el["w:lvl"])
                .forEach((el, ix) => {
                expect(Object.keys(el)).to.have.lengthOf(1);
                expect(Object.keys(el["w:lvl"])).to.deep.equal(["_attr", "w:start", "w:lvlJc", "w:numFmt", "hp:paraPr", "hp:charPr"]);
                expect(el["w:lvl"]).to.have.deep.members([
                    { _attr: { "w:ilvl": ix, "w15:tentative": 1 } },
                    { "w:start": [{ _attr: { "hp:val": 1 } }] },
                    { "w:lvlJc": [{ _attr: { "hp:val": "left" } }] },
                    { "w:numFmt": [{ _attr: { "hp:val": "bullet" } }] },
                ]);
            });
        });
        describe("#createConcreteNumberingInstance", () => {
            it("should create a concrete numbering instance", () => {
                const numbering = new Numbering({
                    config: [
                        {
                            reference: "test-reference",
                            levels: [
                                {
                                    level: 0,
                                },
                            ],
                        },
                    ],
                });
                expect(numbering.ConcreteNumbering).to.have.length(1);
                numbering.createConcreteNumberingInstance("test-reference", 0);
                expect(numbering.ConcreteNumbering).to.have.length(2);
            });
            it("should not create a concrete numbering instance if reference is invalid", () => {
                const numbering = new Numbering({
                    config: [
                        {
                            reference: "test-reference",
                            levels: [
                                {
                                    level: 0,
                                },
                            ],
                        },
                    ],
                });
                expect(numbering.ConcreteNumbering).to.have.length(1);
                numbering.createConcreteNumberingInstance("invalid-reference", 0);
                expect(numbering.ConcreteNumbering).to.have.length(1);
            });
            it("should not create a concrete numbering instance if one already exists", () => {
                const numbering = new Numbering({
                    config: [
                        {
                            reference: "test-reference",
                            levels: [
                                {
                                    level: 0,
                                },
                            ],
                        },
                    ],
                });
                expect(numbering.ConcreteNumbering).to.have.length(1);
                numbering.createConcreteNumberingInstance("test-reference", 0);
                numbering.createConcreteNumberingInstance("test-reference", 0);
                expect(numbering.ConcreteNumbering).to.have.length(2);
            });
        });
        describe("#referenceConfigMap", () => {
            it("should store level configs into referenceConfigMap", () => {
                const numbering = new Numbering({
                    config: [
                        {
                            reference: "test-reference",
                            levels: [
                                {
                                    level: 0,
                                    start: 10,
                                },
                            ],
                        },
                    ],
                });
                numbering.createConcreteNumberingInstance("test-reference", 0);
                const referenceConfig = numbering.ReferenceConfig[0];
                const zeroLevelConfig = referenceConfig[0];
                expect(zeroLevelConfig.start).to.be.equal(10);
            });
        });
    });
});
//# sourceMappingURL=numbering.spec.js.map