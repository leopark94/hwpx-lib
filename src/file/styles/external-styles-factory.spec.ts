import { beforeEach, describe, expect, it } from "vitest";

import { ExternalStylesFactory } from "./external-styles-factory";

describe("External styles factory", () => {
    let externalStyles: string;

    beforeEach(() => {
        externalStyles = `
        <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <w:styles xmlns:mc="first" xmlns:r="second">
            <w:docDefaults>
            <w:rPrDefault>
                <w:rPr>
                    <w:rFonts w:ascii="Arial" w:eastAsiaTheme="minorHAnsi" w:hAnsi="Arial" w:cstheme="minorHAnsi"/>
                    <w:lang w:val="en-US" w:eastAsia="en-US" w:bidi="ar-SA"/>
                </w:rPr>
            </w:rPrDefault>
            <w:pPrDefault>
                <w:pPr>
                    <w:spacing w:after="160" w:line="259" w:lineRule="auto"/>
                </w:pPr>
            </w:pPrDefault>
            </w:docDefaults>

            <w:latentStyles w:defLockedState="1" w:defUIPriority="99">
            </w:latentStyles>

            <w:style w:type="paragraph" w:default="1" w:styleId="Normal">
                <w:name w:val="Normal"/>
                <w:qFormat/>
            </w:style>

            <w:style w:type="paragraph" w:styleId="Heading1">
                <w:name w:val="heading 1"/>
                <w:basedOn w:val="Normal"/>
                <w:pPr>
                    <w:keepNext/>
                    <w:keepLines/>

                    <w:pBdr>
                        <w:bottom w:val="single" w:sz="4" w:space="1" w:color="auto"/>
                  </w:pBdr>
                </w:pPr>
            </w:style>
        </w:styles>`;
    });

    describe("#parse", () => {
        it("should parse w:styles attributes", () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const importedStyle = new ExternalStylesFactory().newInstance(externalStyles) as any;

            expect(importedStyle.rootKey).to.equal("hh:styles");
            expect(importedStyle.root[0]._attr).to.deep.equal({
                "xmlns:mc": "first",
                "xmlns:r": "second",
            });
        });

        it("should parse other child elements of w:styles", () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const importedStyle = new ExternalStylesFactory().newInstance(externalStyles) as any;
            expect(JSON.parse(JSON.stringify(importedStyle.root[1]))).to.deep.equal({
                root: [
                    {
                        root: [
                            {
                                root: [
                                    {
                                        root: [
                                            {
                                                root: {
                                                    "w:ascii": "Arial",
                                                    "w:cstheme": "minorHAnsi",
                                                    "w:eastAsiaTheme": "minorHAnsi",
                                                    "w:hAnsi": "Arial",
                                                },
                                                rootKey: "_attr",
                                            },
                                        ],
                                        rootKey: "hp:rFonts",
                                    },
                                    {
                                        root: [
                                            {
                                                root: {
                                                    "hp:bidi": "ar-SA",
                                                    "hp:eastAsia": "en-US",
                                                    "hp:val": "en-US",
                                                },
                                                rootKey: "_attr",
                                            },
                                        ],
                                        rootKey: "hp:language",
                                    },
                                ],
                                rootKey: "hp:charPr",
                            },
                        ],
                        rootKey: "hh:rPrDefault",
                    },
                    {
                        root: [
                            {
                                root: [
                                    {
                                        root: [
                                            {
                                                root: {
                                                    "w:after": "160",
                                                    "w:line": "259",
                                                    "w:lineRule": "auto",
                                                },
                                                rootKey: "_attr",
                                            },
                                        ],
                                        rootKey: "hp:lineSpacing",
                                    },
                                ],
                                rootKey: "hp:paraPr",
                            },
                        ],
                        rootKey: "hh:pPrDefault",
                    },
                ],
                rootKey: "hh:docDefaults",
            });
            expect(JSON.parse(JSON.stringify(importedStyle.root[2]))).to.deep.equal({
                root: [
                    {
                        root: {
                            "w:defLockedState": "1",
                            "w:defUIPriority": "99",
                        },
                        rootKey: "_attr",
                    },
                ],
                rootKey: "w:latentStyles",
            });
        });

        it("should throw when style element isn't found", () => {
            expect(() => new ExternalStylesFactory().newInstance(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><foo/>`)).to.throw(
                "can not find styles element",
            );

            expect(() => new ExternalStylesFactory().newInstance(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>`)).to.throw(
                "can not find styles element",
            );
        });

        it("should parse styles elements", () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const importedStyle = new ExternalStylesFactory().newInstance(externalStyles) as any;

            expect(importedStyle.root.length).to.equal(5);
            expect(JSON.parse(JSON.stringify(importedStyle.root[3]))).to.deep.equal({
                root: [
                    {
                        root: {
                            "w:default": "1",
                            "w:styleId": "Normal",
                            "hp:type": "paragraph",
                        },
                        rootKey: "_attr",
                    },
                    {
                        root: [
                            {
                                root: {
                                    "hp:val": "Normal",
                                },
                                rootKey: "_attr",
                            },
                        ],
                        rootKey: "hh:name",
                    },
                    {
                        root: [],
                        rootKey: "w:qFormat",
                    },
                ],
                rootKey: "hh:style",
            });

            expect(JSON.parse(JSON.stringify(importedStyle.root[4]))).to.deep.equal({
                root: [
                    {
                        root: {
                            "w:styleId": "Heading1",
                            "hp:type": "paragraph",
                        },
                        rootKey: "_attr",
                    },
                    {
                        root: [
                            {
                                root: {
                                    "hp:val": "heading 1",
                                },
                                rootKey: "_attr",
                            },
                        ],
                        rootKey: "hh:name",
                    },
                    {
                        root: [
                            {
                                root: {
                                    "hp:val": "Normal",
                                },
                                rootKey: "_attr",
                            },
                        ],
                        rootKey: "w:basedOn",
                    },
                    {
                        root: [
                            {
                                root: [],
                                rootKey: "w:keepNext",
                            },
                            {
                                root: [],
                                rootKey: "w:keepLines",
                            },
                            {
                                root: [
                                    {
                                        root: [
                                            {
                                                root: {
                                                    "hp:color": "auto",
                                                    "hp:space": "1",
                                                    "hp:sz": "4",
                                                    "hp:val": "single",
                                                },
                                                rootKey: "_attr",
                                            },
                                        ],
                                        rootKey: "hp:bottom",
                                    },
                                ],
                                rootKey: "w:pBdr",
                            },
                        ],
                        rootKey: "hp:paraPr",
                    },
                ],
                rootKey: "hh:style",
            });
        });
    });
});
