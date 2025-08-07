import { OnOffElement, XmlComponent } from "@file/xml-components";
import { CompatibilitySetting } from "./compatibility-setting/compatibility-setting";
export class Compatibility extends XmlComponent {
    constructor(options) {
        super("ha:compat");
        if (options.version) {
            this.root.push(new CompatibilitySetting(options.version));
        }
        if (options.useSingleBorderforContiguousCells) {
            this.root.push(new OnOffElement("ha:useSingleBorderforContiguousCells", options.useSingleBorderforContiguousCells));
        }
        if (options.wordPerfectJustification) {
            this.root.push(new OnOffElement("ha:wpJustification", options.wordPerfectJustification));
        }
        if (options.noTabStopForHangingIndent) {
            this.root.push(new OnOffElement("ha:noTabHangInd", options.noTabStopForHangingIndent));
        }
        if (options.noLeading) {
            this.root.push(new OnOffElement("ha:noLeading", options.noLeading));
        }
        if (options.spaceForUnderline) {
            this.root.push(new OnOffElement("ha:spaceForUL", options.spaceForUnderline));
        }
        if (options.noColumnBalance) {
            this.root.push(new OnOffElement("ha:noColumnBalance", options.noColumnBalance));
        }
        if (options.balanceSingleByteDoubleByteWidth) {
            this.root.push(new OnOffElement("ha:balanceSingleByteDoubleByteWidth", options.balanceSingleByteDoubleByteWidth));
        }
        if (options.noExtraLineSpacing) {
            this.root.push(new OnOffElement("ha:noExtraLineSpacing", options.noExtraLineSpacing));
        }
        if (options.doNotLeaveBackslashAlone) {
            this.root.push(new OnOffElement("ha:doNotLeaveBackslashAlone", options.doNotLeaveBackslashAlone));
        }
        if (options.underlineTrailingSpaces) {
            this.root.push(new OnOffElement("ha:ulTrailSpace", options.underlineTrailingSpaces));
        }
        if (options.doNotExpandShiftReturn) {
            this.root.push(new OnOffElement("ha:doNotExpandShiftReturn", options.doNotExpandShiftReturn));
        }
        if (options.spacingInWholePoints) {
            this.root.push(new OnOffElement("ha:spacingInWholePoints", options.spacingInWholePoints));
        }
        if (options.lineWrapLikeWord6) {
            this.root.push(new OnOffElement("ha:lineWrapLikeWord6", options.lineWrapLikeWord6));
        }
        if (options.printBodyTextBeforeHeader) {
            this.root.push(new OnOffElement("ha:printBodyTextBeforeHeader", options.printBodyTextBeforeHeader));
        }
        if (options.printColorsBlack) {
            this.root.push(new OnOffElement("ha:printColBlack", options.printColorsBlack));
        }
        if (options.spaceWidth) {
            this.root.push(new OnOffElement("ha:wpSpaceWidth", options.spaceWidth));
        }
        if (options.showBreaksInFrames) {
            this.root.push(new OnOffElement("ha:showBreaksInFrames", options.showBreaksInFrames));
        }
        if (options.subFontBySize) {
            this.root.push(new OnOffElement("ha:subFontBySize", options.subFontBySize));
        }
        if (options.suppressBottomSpacing) {
            this.root.push(new OnOffElement("ha:suppressBottomSpacing", options.suppressBottomSpacing));
        }
        if (options.suppressTopSpacing) {
            this.root.push(new OnOffElement("ha:suppressTopSpacing", options.suppressTopSpacing));
        }
        if (options.suppressSpacingAtTopOfPage) {
            this.root.push(new OnOffElement("ha:suppressSpacingAtTopOfPage", options.suppressSpacingAtTopOfPage));
        }
        if (options.suppressTopSpacingWP) {
            this.root.push(new OnOffElement("ha:suppressTopSpacingWP", options.suppressTopSpacingWP));
        }
        if (options.suppressSpBfAfterPgBrk) {
            this.root.push(new OnOffElement("ha:suppressSpBfAfterPgBrk", options.suppressSpBfAfterPgBrk));
        }
        if (options.swapBordersFacingPages) {
            this.root.push(new OnOffElement("ha:swapBordersFacingPages", options.swapBordersFacingPages));
        }
        if (options.convertMailMergeEsc) {
            this.root.push(new OnOffElement("ha:convMailMergeEsc", options.convertMailMergeEsc));
        }
        if (options.truncateFontHeightsLikeWP6) {
            this.root.push(new OnOffElement("ha:truncateFontHeightsLikeWP6", options.truncateFontHeightsLikeWP6));
        }
        if (options.macWordSmallCaps) {
            this.root.push(new OnOffElement("ha:mwSmallCaps", options.macWordSmallCaps));
        }
        if (options.usePrinterMetrics) {
            this.root.push(new OnOffElement("ha:usePrinterMetrics", options.usePrinterMetrics));
        }
        if (options.doNotSuppressParagraphBorders) {
            this.root.push(new OnOffElement("ha:doNotSuppressParagraphBorders", options.doNotSuppressParagraphBorders));
        }
        if (options.wrapTrailSpaces) {
            this.root.push(new OnOffElement("ha:wrapTrailSpaces", options.wrapTrailSpaces));
        }
        if (options.footnoteLayoutLikeWW8) {
            this.root.push(new OnOffElement("ha:footnoteLayoutLikeWW8", options.footnoteLayoutLikeWW8));
        }
        if (options.shapeLayoutLikeWW8) {
            this.root.push(new OnOffElement("ha:shapeLayoutLikeWW8", options.shapeLayoutLikeWW8));
        }
        if (options.alignTablesRowByRow) {
            this.root.push(new OnOffElement("ha:alignTablesRowByRow", options.alignTablesRowByRow));
        }
        if (options.forgetLastTabAlignment) {
            this.root.push(new OnOffElement("ha:forgetLastTabAlignment", options.forgetLastTabAlignment));
        }
        if (options.adjustLineHeightInTable) {
            this.root.push(new OnOffElement("ha:adjustLineHeightInTable", options.adjustLineHeightInTable));
        }
        if (options.autoSpaceLikeWord95) {
            this.root.push(new OnOffElement("ha:autoSpaceLikeWord95", options.autoSpaceLikeWord95));
        }
        if (options.noSpaceRaiseLower) {
            this.root.push(new OnOffElement("ha:noSpaceRaiseLower", options.noSpaceRaiseLower));
        }
        if (options.doNotUseHTMLParagraphAutoSpacing) {
            this.root.push(new OnOffElement("ha:doNotUseHTMLParagraphAutoSpacing", options.doNotUseHTMLParagraphAutoSpacing));
        }
        if (options.layoutRawTableWidth) {
            this.root.push(new OnOffElement("ha:layoutRawTableWidth", options.layoutRawTableWidth));
        }
        if (options.layoutTableRowsApart) {
            this.root.push(new OnOffElement("ha:layoutTableRowsApart", options.layoutTableRowsApart));
        }
        if (options.useWord97LineBreakRules) {
            this.root.push(new OnOffElement("ha:useWord97LineBreakRules", options.useWord97LineBreakRules));
        }
        if (options.doNotBreakWrappedTables) {
            this.root.push(new OnOffElement("ha:doNotBreakWrappedTables", options.doNotBreakWrappedTables));
        }
        if (options.doNotSnapToGridInCell) {
            this.root.push(new OnOffElement("ha:doNotSnapToGridInCell", options.doNotSnapToGridInCell));
        }
        if (options.selectFieldWithFirstOrLastCharacter) {
            this.root.push(new OnOffElement("ha:selectFldWithFirstOrLastChar", options.selectFieldWithFirstOrLastCharacter));
        }
        if (options.applyBreakingRules) {
            this.root.push(new OnOffElement("ha:applyBreakingRules", options.applyBreakingRules));
        }
        if (options.doNotWrapTextWithPunctuation) {
            this.root.push(new OnOffElement("ha:doNotWrapTextWithPunct", options.doNotWrapTextWithPunctuation));
        }
        if (options.doNotUseEastAsianBreakRules) {
            this.root.push(new OnOffElement("ha:doNotUseEastAsianBreakRules", options.doNotUseEastAsianBreakRules));
        }
        if (options.useWord2002TableStyleRules) {
            this.root.push(new OnOffElement("ha:useWord2002TableStyleRules", options.useWord2002TableStyleRules));
        }
        if (options.growAutofit) {
            this.root.push(new OnOffElement("ha:growAutofit", options.growAutofit));
        }
        if (options.useFELayout) {
            this.root.push(new OnOffElement("ha:useFELayout", options.useFELayout));
        }
        if (options.useNormalStyleForList) {
            this.root.push(new OnOffElement("ha:useNormalStyleForList", options.useNormalStyleForList));
        }
        if (options.doNotUseIndentAsNumberingTabStop) {
            this.root.push(new OnOffElement("ha:doNotUseIndentAsNumberingTabStop", options.doNotUseIndentAsNumberingTabStop));
        }
        if (options.useAlternateEastAsianLineBreakRules) {
            this.root.push(new OnOffElement("ha:useAltKinsokuLineBreakRules", options.useAlternateEastAsianLineBreakRules));
        }
        if (options.allowSpaceOfSameStyleInTable) {
            this.root.push(new OnOffElement("ha:allowSpaceOfSameStyleInTable", options.allowSpaceOfSameStyleInTable));
        }
        if (options.doNotSuppressIndentation) {
            this.root.push(new OnOffElement("ha:doNotSuppressIndentation", options.doNotSuppressIndentation));
        }
        if (options.doNotAutofitConstrainedTables) {
            this.root.push(new OnOffElement("ha:doNotAutofitConstrainedTables", options.doNotAutofitConstrainedTables));
        }
        if (options.autofitToFirstFixedWidthCell) {
            this.root.push(new OnOffElement("ha:autofitToFirstFixedWidthCell", options.autofitToFirstFixedWidthCell));
        }
        if (options.underlineTabInNumberingList) {
            this.root.push(new OnOffElement("ha:underlineTabInNumList", options.underlineTabInNumberingList));
        }
        if (options.displayHangulFixedWidth) {
            this.root.push(new OnOffElement("ha:displayHangulFixedWidth", options.displayHangulFixedWidth));
        }
        if (options.splitPgBreakAndParaMark) {
            this.root.push(new OnOffElement("ha:splitPgBreakAndParaMark", options.splitPgBreakAndParaMark));
        }
        if (options.doNotVerticallyAlignCellWithSp) {
            this.root.push(new OnOffElement("ha:doNotVertAlignCellWithSp", options.doNotVerticallyAlignCellWithSp));
        }
        if (options.doNotBreakConstrainedForcedTable) {
            this.root.push(new OnOffElement("ha:doNotBreakConstrainedForcedTable", options.doNotBreakConstrainedForcedTable));
        }
        if (options.ignoreVerticalAlignmentInTextboxes) {
            this.root.push(new OnOffElement("ha:doNotVertAlignInTxbx", options.ignoreVerticalAlignmentInTextboxes));
        }
        if (options.useAnsiKerningPairs) {
            this.root.push(new OnOffElement("ha:useAnsiKerningPairs", options.useAnsiKerningPairs));
        }
        if (options.cachedColumnBalance) {
            this.root.push(new OnOffElement("ha:cachedColBalance", options.cachedColumnBalance));
        }
    }
}
//# sourceMappingURL=compatibility.js.map