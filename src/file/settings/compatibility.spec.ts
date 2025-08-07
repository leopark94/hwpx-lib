import { describe, expect, it } from "vitest";

import { Formatter } from "@export/formatter";

import { Compatibility } from "./compatibility";

describe("Compatibility", () => {
    describe("#constructor", () => {
        it("creates an initially empty property object", () => {
            const compatibility = new Compatibility({});

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": {} });
        });
    });

    describe("#version", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                version: 10,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({
                "ha:compat": [
                    {
                        "ha:compatSetting": {
                            _attr: {
                                "hh:name": "compatibilityMode",
                                "ha:uri": "http://schemas.microsoft.com/office/word",
                                "hp:val": 10,
                            },
                        },
                    },
                ],
            });
        });
    });

    describe("#useSingleBorderforContiguousCells", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                useSingleBorderforContiguousCells: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:useSingleBorderforContiguousCells": {} }] });
        });
    });

    describe("#wordPerfectJustification", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                wordPerfectJustification: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:wpJustification": {} }] });
        });
    });

    describe("#noTabStopForHangingIndent", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                noTabStopForHangingIndent: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:noTabHangInd": {} }] });
        });
    });

    describe("#noLeading", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                noLeading: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:noLeading": {} }] });
        });
    });

    describe("#spaceForUnderline", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                spaceForUnderline: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:spaceForUL": {} }] });
        });
    });

    describe("#noColumnBalance", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                noColumnBalance: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:noColumnBalance": {} }] });
        });
    });

    describe("#balanceSingleByteDoubleByteWidth", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                balanceSingleByteDoubleByteWidth: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:balanceSingleByteDoubleByteWidth": {} }] });
        });
    });

    describe("#noExtraLineSpacing", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                noExtraLineSpacing: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:noExtraLineSpacing": {} }] });
        });
    });

    describe("#doNotLeaveBackslashAlone", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                doNotLeaveBackslashAlone: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:doNotLeaveBackslashAlone": {} }] });
        });
    });

    describe("#underlineTrailingSpaces", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                underlineTrailingSpaces: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:ulTrailSpace": {} }] });
        });
    });

    describe("#doNotExpandShiftReturn", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                doNotExpandShiftReturn: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:doNotExpandShiftReturn": {} }] });
        });
    });

    describe("#spacingInWholePoints", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                spacingInWholePoints: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:spacingInWholePoints": {} }] });
        });
    });

    describe("#lineWrapLikeWord6", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                lineWrapLikeWord6: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:lineWrapLikeWord6": {} }] });
        });
    });

    describe("#printBodyTextBeforeHeader", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                printBodyTextBeforeHeader: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:printBodyTextBeforeHeader": {} }] });
        });
    });

    describe("#printColorsBlack", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                printColorsBlack: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:printColBlack": {} }] });
        });
    });

    describe("#spaceWidth", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                spaceWidth: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:wpSpaceWidth": {} }] });
        });
    });

    describe("#showBreaksInFrames", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                showBreaksInFrames: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:showBreaksInFrames": {} }] });
        });
    });

    describe("#subFontBySize", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                subFontBySize: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:subFontBySize": {} }] });
        });
    });

    describe("#suppressBottomSpacing", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                suppressBottomSpacing: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:suppressBottomSpacing": {} }] });
        });
    });

    describe("#suppressTopSpacing", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                suppressTopSpacing: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:suppressTopSpacing": {} }] });
        });
    });

    describe("#suppressSpacingAtTopOfPage", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                suppressSpacingAtTopOfPage: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:suppressSpacingAtTopOfPage": {} }] });
        });
    });

    describe("#suppressTopSpacingWP", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                suppressTopSpacingWP: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:suppressTopSpacingWP": {} }] });
        });
    });

    describe("#suppressSpBfAfterPgBrk", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                suppressSpBfAfterPgBrk: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:suppressSpBfAfterPgBrk": {} }] });
        });
    });

    describe("#swapBordersFacingPages", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                swapBordersFacingPages: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:swapBordersFacingPages": {} }] });
        });
    });

    describe("#convertMailMergeEsc", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                convertMailMergeEsc: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:convMailMergeEsc": {} }] });
        });
    });

    describe("#truncateFontHeightsLikeWP6", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                truncateFontHeightsLikeWP6: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:truncateFontHeightsLikeWP6": {} }] });
        });
    });

    describe("#macWordSmallCaps", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                macWordSmallCaps: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:mwSmallCaps": {} }] });
        });
    });

    describe("#usePrinterMetrics", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                usePrinterMetrics: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:usePrinterMetrics": {} }] });
        });
    });

    describe("#doNotSuppressParagraphBorders", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                doNotSuppressParagraphBorders: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:doNotSuppressParagraphBorders": {} }] });
        });
    });

    describe("#wrapTrailSpaces", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                wrapTrailSpaces: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:wrapTrailSpaces": {} }] });
        });
    });

    describe("#footnoteLayoutLikeWW8", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                footnoteLayoutLikeWW8: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:footnoteLayoutLikeWW8": {} }] });
        });
    });

    describe("#shapeLayoutLikeWW8", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                shapeLayoutLikeWW8: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:shapeLayoutLikeWW8": {} }] });
        });
    });

    describe("#alignTablesRowByRow", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                alignTablesRowByRow: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:alignTablesRowByRow": {} }] });
        });
    });

    describe("#forgetLastTabAlignment", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                forgetLastTabAlignment: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:forgetLastTabAlignment": {} }] });
        });
    });

    describe("#adjustLineHeightInTable", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                adjustLineHeightInTable: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:adjustLineHeightInTable": {} }] });
        });
    });

    describe("#autoSpaceLikeWord95", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                autoSpaceLikeWord95: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:autoSpaceLikeWord95": {} }] });
        });
    });

    describe("#noSpaceRaiseLower", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                noSpaceRaiseLower: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:noSpaceRaiseLower": {} }] });
        });
    });

    describe("#doNotUseHTMLParagraphAutoSpacing", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                doNotUseHTMLParagraphAutoSpacing: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:doNotUseHTMLParagraphAutoSpacing": {} }] });
        });
    });

    describe("#layoutRawTableWidth", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                layoutRawTableWidth: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:layoutRawTableWidth": {} }] });
        });
    });

    describe("#layoutTableRowsApart", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                layoutTableRowsApart: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:layoutTableRowsApart": {} }] });
        });
    });

    describe("#useWord97LineBreakRules", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                useWord97LineBreakRules: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:useWord97LineBreakRules": {} }] });
        });
    });

    describe("#doNotBreakWrappedTables", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                doNotBreakWrappedTables: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:doNotBreakWrappedTables": {} }] });
        });
    });

    describe("#doNotSnapToGridInCell", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                doNotSnapToGridInCell: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:doNotSnapToGridInCell": {} }] });
        });
    });

    describe("#selectFieldWithFirstOrLastCharacter", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                selectFieldWithFirstOrLastCharacter: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:selectFldWithFirstOrLastChar": {} }] });
        });
    });

    describe("#applyBreakingRules", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                applyBreakingRules: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:applyBreakingRules": {} }] });
        });
    });

    describe("#doNotWrapTextWithPunctuation", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                doNotWrapTextWithPunctuation: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:doNotWrapTextWithPunct": {} }] });
        });
    });

    describe("#doNotUseEastAsianBreakRules", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                doNotUseEastAsianBreakRules: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:doNotUseEastAsianBreakRules": {} }] });
        });
    });

    describe("#useWord2002TableStyleRules", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                useWord2002TableStyleRules: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:useWord2002TableStyleRules": {} }] });
        });
    });

    describe("#growAutofit", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                growAutofit: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:growAutofit": {} }] });
        });
    });

    describe("#useFELayout", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                useFELayout: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:useFELayout": {} }] });
        });
    });

    describe("#useNormalStyleForList", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                useNormalStyleForList: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:useNormalStyleForList": {} }] });
        });
    });

    describe("#doNotUseIndentAsNumberingTabStop", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                doNotUseIndentAsNumberingTabStop: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:doNotUseIndentAsNumberingTabStop": {} }] });
        });
    });

    describe("#useAlternateEastAsianLineBreakRules", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                useAlternateEastAsianLineBreakRules: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:useAltKinsokuLineBreakRules": {} }] });
        });
    });

    describe("#allowSpaceOfSameStyleInTable", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                allowSpaceOfSameStyleInTable: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:allowSpaceOfSameStyleInTable": {} }] });
        });
    });

    describe("#doNotSuppressIndentation", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                doNotSuppressIndentation: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:doNotSuppressIndentation": {} }] });
        });
    });

    describe("#doNotAutofitConstrainedTables", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                doNotAutofitConstrainedTables: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:doNotAutofitConstrainedTables": {} }] });
        });
    });

    describe("#autofitToFirstFixedWidthCell", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                autofitToFirstFixedWidthCell: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:autofitToFirstFixedWidthCell": {} }] });
        });
    });

    describe("#underlineTabInNumberingList", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                underlineTabInNumberingList: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:underlineTabInNumList": {} }] });
        });
    });

    describe("#displayHangulFixedWidth", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                displayHangulFixedWidth: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:displayHangulFixedWidth": {} }] });
        });
    });

    describe("#splitPgBreakAndParaMark", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                splitPgBreakAndParaMark: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:splitPgBreakAndParaMark": {} }] });
        });
    });

    describe("#doNotVerticallyAlignCellWithSp", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                doNotVerticallyAlignCellWithSp: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:doNotVertAlignCellWithSp": {} }] });
        });
    });

    describe("#doNotBreakConstrainedForcedTable", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                doNotBreakConstrainedForcedTable: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:doNotBreakConstrainedForcedTable": {} }] });
        });
    });

    describe("#ignoreVerticalAlignmentInTextboxes", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                ignoreVerticalAlignmentInTextboxes: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:doNotVertAlignInTxbx": {} }] });
        });
    });

    describe("#useAnsiKerningPairs", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                useAnsiKerningPairs: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:useAnsiKerningPairs": {} }] });
        });
    });

    describe("#cachedColumnBalance", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility({
                cachedColumnBalance: true,
            });

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "ha:compat": [{ "ha:cachedColBalance": {} }] });
        });
    });
});
