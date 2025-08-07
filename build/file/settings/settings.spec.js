import { describe, expect, it } from "vitest";
import { Formatter } from "@export/formatter";
import { Settings } from "./settings";
describe("Settings", () => {
    describe("#constructor", () => {
        it("should create a empty Settings with correct rootKey", () => {
            const settings = new Settings({});
            const tree = new Formatter().format(settings);
            expect(Object.keys(tree)).has.length(1);
            expect(tree["ha:settings"]).to.be.an("array");
        });
        it("should add updateFields setting", () => {
            const settings = new Settings({
                updateFields: true,
            });
            const tree = new Formatter().format(settings);
            expect(Object.keys(tree)).has.length(1);
            expect(tree["ha:settings"]).to.be.an("array");
            expect(tree["ha:settings"]).to.deep.include({
                "ha:updateFields": {},
            });
        });
        it("should indicate modern word compatibility by default", () => {
            const settings = new Settings({});
            const tree = new Formatter().format(settings);
            expect(Object.keys(tree)).has.length(1);
            expect(tree["ha:settings"]).to.be.an("array");
            const compat = tree["ha:settings"][2];
            expect(compat).to.be.an("object").with.keys("ha:compat");
            expect(compat["ha:compat"]).to.deep.include({
                "ha:compatSetting": {
                    _attr: {
                        "hp:val": 15,
                        "ha:uri": "http://schemas.microsoft.com/office/word",
                        "hh:name": "compatibilityMode",
                    },
                },
            });
        });
        it("should add trackRevisions setting", () => {
            const settings = new Settings({
                trackRevisions: true,
            });
            const tree = new Formatter().format(settings);
            expect(Object.keys(tree)).has.length(1);
            expect(tree["ha:settings"]).to.be.an("array");
            expect(tree["ha:settings"]).to.deep.include({
                "ha:trackRevisions": {},
            });
        });
        it("should add compatibility setting with default compatability version", () => {
            const settings = new Settings({
                compatibility: {},
            });
            const tree = new Formatter().format(settings);
            expect(Object.keys(tree)).has.length(1);
            expect(tree["ha:settings"]).to.be.an("array");
            expect(tree["ha:settings"]).to.deep.include({
                "ha:compat": [
                    {
                        "ha:compatSetting": {
                            _attr: {
                                "hh:name": "compatibilityMode",
                                "ha:uri": "http://schemas.microsoft.com/office/word",
                                "hp:val": 15,
                            },
                        },
                    },
                ],
            });
        });
        it("should add compatibility setting with version", () => {
            const settings = new Settings({
                compatibility: {
                    version: 99,
                },
            });
            const tree = new Formatter().format(settings);
            expect(Object.keys(tree)).has.length(1);
            expect(tree["ha:settings"]).to.be.an("array");
            expect(tree["ha:settings"]).to.deep.include({
                "ha:compat": [
                    {
                        "ha:compatSetting": {
                            _attr: {
                                "hh:name": "compatibilityMode",
                                "ha:uri": "http://schemas.microsoft.com/office/word",
                                "hp:val": 99,
                            },
                        },
                    },
                ],
            });
        });
        it("should add defaultTabStop setting with version", () => {
            const settings = new Settings({
                defaultTabStop: 100,
            });
            const tree = new Formatter().format(settings);
            expect(Object.keys(tree)).has.length(1);
            expect(tree["ha:settings"]).to.be.an("array");
            expect(tree["ha:settings"]).to.deep.include({
                "ha:defaultTabStop": {
                    _attr: {
                        "hp:val": 100,
                    },
                },
            });
        });
        it("should add autoHyphenation setting", () => {
            const options = {
                hyphenation: {
                    autoHyphenation: true,
                },
            };
            const tree = new Formatter().format(new Settings(options));
            expect(Object.keys(tree)).has.length(1);
            expect(tree["ha:settings"]).to.be.an("array");
            expect(tree["ha:settings"]).to.deep.include({
                "ha:autoHyphenation": {},
            });
        });
        it("should add doNotHyphenateCaps setting", () => {
            const options = {
                hyphenation: {
                    doNotHyphenateCaps: true,
                },
            };
            const tree = new Formatter().format(new Settings(options));
            expect(Object.keys(tree)).has.length(1);
            expect(tree["ha:settings"]).to.be.an("array");
            expect(tree["ha:settings"]).to.deep.include({
                "ha:doNotHyphenateCaps": {},
            });
        });
        it("should add hyphenationZone setting", () => {
            const options = {
                hyphenation: {
                    hyphenationZone: 200,
                },
            };
            const tree = new Formatter().format(new Settings(options));
            expect(Object.keys(tree)).has.length(1);
            expect(tree["ha:settings"]).to.be.an("array");
            expect(tree["ha:settings"]).to.deep.include({
                "ha:hyphenationZone": {
                    _attr: {
                        "hp:val": 200,
                    },
                },
            });
        });
        it("should add consecutiveHyphenLimit setting", () => {
            const options = {
                hyphenation: {
                    consecutiveHyphenLimit: 3,
                },
            };
            const tree = new Formatter().format(new Settings(options));
            expect(Object.keys(tree)).has.length(1);
            expect(tree["ha:settings"]).to.be.an("array");
            expect(tree["ha:settings"]).to.deep.include({
                "ha:consecutiveHyphenLimit": {
                    _attr: {
                        "hp:val": 3,
                    },
                },
            });
        });
        it("should add compatibility setting with legacy version", () => {
            const settings = new Settings({
                compatibilityModeVersion: 99,
            });
            const tree = new Formatter().format(settings);
            expect(Object.keys(tree)).has.length(1);
            expect(tree["ha:settings"]).to.be.an("array");
            expect(tree["ha:settings"]).to.deep.include({
                "ha:compat": [
                    {
                        "ha:compatSetting": {
                            _attr: {
                                "hh:name": "compatibilityMode",
                                "ha:uri": "http://schemas.microsoft.com/office/word",
                                "hp:val": 99,
                            },
                        },
                    },
                ],
            });
        });
    });
});
//# sourceMappingURL=settings.spec.js.map