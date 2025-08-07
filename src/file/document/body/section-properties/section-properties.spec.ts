/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from "vitest";

import { Formatter } from "@export/formatter";
import { FooterWrapper } from "@file/footer-wrapper";
import { HeaderWrapper } from "@file/header-wrapper";
import { Media } from "@file/media";
import { NumberFormat } from "@file/shared/number-format";
import { VerticalAlignSection } from "@file/vertical-align";
import { convertInchesToTwip } from "@util/convenience-functions";

import { PageOrientation } from "./properties";
import { DocumentGridType } from "./properties/doc-grid";
import { LineNumberRestartFormat } from "./properties/line-number";
import { PageBorderOffsetFrom } from "./properties/page-borders";
import { PageTextDirectionType } from "./properties/page-text-direction";
import { SectionType } from "./properties/section-type";
import { SectionProperties, sectionMarginDefaults, sectionPageSizeDefaults } from "./section-properties";

const DEFAULT_MARGINS = {
    "hp:bottom": sectionMarginDefaults.BOTTOM,
    "hp:footer": sectionMarginDefaults.FOOTER,
    "hp:top": sectionMarginDefaults.TOP,
    "hp:right": sectionMarginDefaults.RIGHT,
    "hp:left": sectionMarginDefaults.LEFT,
    "hp:header": sectionMarginDefaults.HEADER,
    "hp:gutter": sectionMarginDefaults.GUTTER,
};

const PAGE_SIZE_DEFAULTS = {
    "hp:h": sectionPageSizeDefaults.HEIGHT,
    "w:orient": sectionPageSizeDefaults.ORIENTATION,
    "hp:w": sectionPageSizeDefaults.WIDTH,
};

describe("SectionProperties", () => {
    describe("#constructor()", () => {
        it("should create section properties with options", () => {
            const media = new Media();

            const properties = new SectionProperties({
                page: {
                    size: {
                        width: 1190,
                        height: 1680,
                        orientation: PageOrientation.PORTRAIT,
                    },
                    margin: {
                        top: "2in",
                        right: "2in",
                        bottom: "2in",
                        left: "2in",
                        header: 808,
                        footer: 808,
                        gutter: 10,
                    },
                    pageNumbers: {
                        start: 10,
                        formatType: NumberFormat.CARDINAL_TEXT,
                    },
                },
                column: {
                    space: 208,
                    count: 2,
                    separate: true,
                },
                grid: {
                    linePitch: convertInchesToTwip(0.25),
                    type: DocumentGridType.LINES,
                },
                headerWrapperGroup: {
                    default: new HeaderWrapper(media, 100),
                },
                footerWrapperGroup: {
                    even: new FooterWrapper(media, 200),
                },
                titlePage: true,
                verticalAlign: VerticalAlignSection.TOP,
            });

            const tree = new Formatter().format(properties);

            expect(Object.keys(tree)).to.deep.equal(["hs:sectPr"]);
            expect(tree["hp:sectPr"]).to.be.an.instanceof(Array);
            expect(tree["hp:sectPr"][0]).to.deep.equal({ "hs:headerReference": { _attr: { "r:id": "rId100", "hp:type": "default" } } });
            expect(tree["hp:sectPr"][1]).to.deep.equal({ "hs:footerReference": { _attr: { "r:id": "rId200", "hp:type": "even" } } });
            expect(tree["hp:sectPr"][2]).to.deep.equal({
                "hs:pageSize": { _attr: { "hp:h": 1680, "hp:w": 1190, "w:orient": "portrait" } },
            });
            expect(tree["hp:sectPr"][3]).to.deep.equal({
                "hs:pageMargin": {
                    _attr: {
                        "hp:bottom": "2in",
                        "hp:footer": 808,
                        "hp:top": "2in",
                        "hp:right": "2in",
                        "hp:left": "2in",
                        "hp:header": 808,
                        "hp:gutter": 10,
                    },
                },
            });

            expect(tree["hp:sectPr"][4]).to.deep.equal({ "hs:pageNumbers": { _attr: { "w:fmt": "cardinalText", "w:start": 10 } } });
            expect(tree["hp:sectPr"][5]).to.deep.equal({ "w:cols": { _attr: { "hp:space": 208, "w:sep": true, "w:num": 2 } } });
            expect(tree["hp:sectPr"][6]).to.deep.equal({ "w:vAlign": { _attr: { "hp:val": "top" } } });
            expect(tree["hp:sectPr"][7]).to.deep.equal({ "hs:titlePg": {} });
            expect(tree["hp:sectPr"][8]).to.deep.equal({ "hs:docGrid": { _attr: { "hp:linePitch": 360, "hp:type": "lines" } } });
        });

        it("should create section properties with no options", () => {
            const properties = new SectionProperties();
            const tree = new Formatter().format(properties);
            expect(Object.keys(tree)).to.deep.equal(["hs:sectPr"]);
            expect(tree["hp:sectPr"]).to.be.an.instanceof(Array);
            expect(tree["hp:sectPr"][0]).to.deep.equal({ "hs:pageSize": { _attr: PAGE_SIZE_DEFAULTS } });
            expect(tree["hp:sectPr"][1]).to.deep.equal({
                "hs:pageMargin": { _attr: DEFAULT_MARGINS },
            });
            // expect(tree["hp:sectPr"][3]).to.deep.equal({ "w:cols": { _attr: { "hp:space": 708, "w:sep": false, "w:num": 1 } } });
            expect(tree["hp:sectPr"][3]).to.deep.equal({ "hs:docGrid": { _attr: { "hp:linePitch": 360 } } });
        });

        it("should create section properties with changed options", () => {
            const properties = new SectionProperties({
                page: {
                    margin: {
                        top: 0,
                    },
                },
            });
            const tree = new Formatter().format(properties);
            expect(Object.keys(tree)).to.deep.equal(["hs:sectPr"]);
            expect(tree["hp:sectPr"]).to.be.an.instanceof(Array);
            expect(tree["hp:sectPr"][0]).to.deep.equal({ "hs:pageSize": { _attr: PAGE_SIZE_DEFAULTS } });
            expect(tree["hp:sectPr"][1]).to.deep.equal({
                "hs:pageMargin": {
                    _attr: {
                        ...DEFAULT_MARGINS,
                        "hp:top": 0,
                    },
                },
            });
        });

        it("should create section properties with changed options", () => {
            const properties = new SectionProperties({
                page: {
                    margin: {
                        bottom: 0,
                    },
                },
            });
            const tree = new Formatter().format(properties);
            expect(Object.keys(tree)).to.deep.equal(["hs:sectPr"]);
            expect(tree["hp:sectPr"]).to.be.an.instanceof(Array);
            expect(tree["hp:sectPr"][0]).to.deep.equal({ "hs:pageSize": { _attr: PAGE_SIZE_DEFAULTS } });
            expect(tree["hp:sectPr"][1]).to.deep.equal({
                "hs:pageMargin": {
                    _attr: {
                        ...DEFAULT_MARGINS,
                        "hp:bottom": 0,
                    },
                },
            });
        });

        it("should create section properties with changed options", () => {
            const properties = new SectionProperties({
                page: {
                    size: {
                        width: 0,
                        height: 0,
                        orientation: PageOrientation.LANDSCAPE,
                    },
                },
            });
            const tree = new Formatter().format(properties);
            expect(Object.keys(tree)).to.deep.equal(["hs:sectPr"]);
            expect(tree["hp:sectPr"]).to.be.an.instanceof(Array);
            expect(tree["hp:sectPr"][0]).to.deep.equal({
                "hs:pageSize": {
                    _attr: {
                        "hp:h": 0,
                        "w:orient": PageOrientation.LANDSCAPE,
                        "hp:w": 0,
                    },
                },
            });
            expect(tree["hp:sectPr"][1]).to.deep.equal({
                "hs:pageMargin": {
                    _attr: DEFAULT_MARGINS,
                },
            });
        });

        it("should create section properties with page borders", () => {
            const properties = new SectionProperties({
                page: {
                    borders: {
                        pageBorders: {
                            offsetFrom: PageBorderOffsetFrom.PAGE,
                        },
                    },
                },
            });
            const tree = new Formatter().format(properties);
            expect(Object.keys(tree)).to.deep.equal(["hs:sectPr"]);
            const pgBorders = tree["hp:sectPr"].find((item: any) => item["w:pgBorders"] !== undefined);
            expect(pgBorders).to.deep.equal({
                "w:pgBorders": { _attr: { "w:offsetFrom": "page" } },
            });
        });

        it("should create section properties with page number type, but without start attribute", () => {
            const properties = new SectionProperties({
                page: {
                    pageNumbers: {
                        formatType: NumberFormat.UPPER_ROMAN,
                    },
                },
            });
            const tree = new Formatter().format(properties);
            expect(Object.keys(tree)).to.deep.equal(["hs:sectPr"]);
            const pgNumType = tree["hp:sectPr"].find((item: any) => item["hs:pageNumbers"] !== undefined);
            expect(pgNumType).to.deep.equal({
                "hs:pageNumbers": { _attr: { "w:fmt": "upperRoman" } },
            });
        });

        it("should create section properties with a page number type by default", () => {
            const properties = new SectionProperties({});
            const tree = new Formatter().format(properties);
            expect(Object.keys(tree)).to.deep.equal(["hs:sectPr"]);
            const pgNumType = tree["hp:sectPr"].find((item: any) => item["hs:pageNumbers"] !== undefined);
            expect(pgNumType).to.deep.equal({ "hs:pageNumbers": { _attr: {} } });
        });

        it("should create section properties with section type", () => {
            const properties = new SectionProperties({
                type: SectionType.CONTINUOUS,
            });
            const tree = new Formatter().format(properties);
            expect(Object.keys(tree)).to.deep.equal(["hs:sectPr"]);
            const type = tree["hp:sectPr"].find((item: any) => item["hp:type"] !== undefined);
            expect(type).to.deep.equal({
                "hp:type": { _attr: { "hp:val": "continuous" } },
            });
        });

        it("should create section properties line number type", () => {
            const properties = new SectionProperties({
                lineNumbers: {
                    countBy: 2,
                    start: 2,
                    restart: LineNumberRestartFormat.CONTINUOUS,
                    distance: 4,
                },
            });
            const tree = new Formatter().format(properties);
            expect(Object.keys(tree)).to.deep.equal(["hs:sectPr"]);
            const type = tree["hp:sectPr"].find((item: any) => item["w:lnNumType"] !== undefined);
            expect(type).to.deep.equal({
                "w:lnNumType": { _attr: { "w:countBy": 2, "w:distance": 4, "w:restart": "continuous", "w:start": 2 } },
            });
        });

        it("should create section properties with text flow direction", () => {
            const properties = new SectionProperties({
                page: {
                    textDirection: PageTextDirectionType.TOP_TO_BOTTOM_RIGHT_TO_LEFT,
                },
            });
            const tree = new Formatter().format(properties);
            expect(Object.keys(tree)).to.deep.equal(["hs:sectPr"]);
            const type = tree["hp:sectPr"].find((item: any) => item["hs:textDirection"] !== undefined);
            expect(type).to.deep.equal({
                "hs:textDirection": { _attr: { "hp:val": "tbRl" } },
            });
        });
    });
});
