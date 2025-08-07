#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// DOCX to HWPX mappings based on comprehensive analysis
const DOCX_TO_HWPX_MAPPINGS = {
    // Element mappings
    '"w:p"': '"hp:p"',
    '"w:r"': '"hp:run"',
    '"w:t"': '"hp:t"',
    '"w:rPr"': '"hp:charPr"',
    '"w:pPr"': '"hp:paraPr"',
    '"w:b"': '"hp:bold"',
    '"w:i"': '"hp:italic"',
    '"w:u"': '"hp:underline"',
    '"w:strike"': '"hp:strikeout"',
    '"w:br"': '"hp:br"',
    '"w:tab"': '"hp:tab"',
    '"w:document"': '"hml:document"',
    '"w:body"': '"hs:sec"',
    
    // Table elements
    '"w:tbl"': '"hp:tbl"',
    '"w:tr"': '"hp:tr"',
    '"w:tc"': '"hp:tc"',
    '"w:tblPr"': '"hp:tblPr"',
    '"w:tcPr"': '"hp:tcPr"',
    '"w:trPr"': '"hp:trPr"',
    
    // Attribute mappings
    '"w:val"': '"hp:val"',
    '"w:color"': '"hp:color"',
    '"w:fill"': '"hp:fill"',
    '"w:space"': '"hp:space"',
    '"w:sz"': '"hp:sz"',
    '"w:type"': '"hp:type"',
    '"w:id"': '"hp:id"',
    '"w:name"': '"hp:name"',
    '"w:rsidR"': '"hp:rsidR"',
    '"w:rsidRPr"': '"hp:rsidRPr"',
    '"w:rsidSect"': '"hp:rsidSect"',
    '"w:w"': '"hp:w"',
    '"w:h"': '"hp:h"',
    '"w:top"': '"hp:top"',
    '"w:right"': '"hp:right"',
    '"w:bottom"': '"hp:bottom"',
    '"w:left"': '"hp:left"',
    '"w:header"': '"hp:header"',
    '"w:footer"': '"hp:footer"',
    '"w:gutter"': '"hp:gutter"',
    '"w:linePitch"': '"hp:linePitch"',
    '"w:pos"': '"hp:pos"',
    
    // Style elements
    '"w:styles"': '"hh:styles"',
    '"w:style"': '"hh:style"',
    '"w:name"': '"hh:name"',
    '"w:uiPriority"': '"hh:uiPriority"',
    
    // Section properties
    '"w:sectPr"': '"hs:sectPr"',
    '"w:pgSz"': '"hs:pageSize"',
    '"w:pgMar"': '"hs:pageMargin"',
    '"w:pgNumType"': '"hs:pageNumbers"',
    '"w:docGrid"': '"hs:docGrid"',
    
    // Footnotes
    '"w:footnotes"': '"hh:footnotes"',
    '"w:footnote"': '"hh:footnote"',
    '"w:footnoteRef"': '"hp:footnoteRef"',
    '"w:footnoteReference"': '"hp:footnoteRef"',
    '"w:separator"': '"hp:separator"',
    '"w:continuationSeparator"': '"hp:continuationSeparator"',
    
    // Document defaults and styles
    '"w:docDefaults"': '"hh:docDefaults"',
    '"w:rPrDefault"': '"hh:rPrDefault"',
    '"w:pPrDefault"': '"hh:pPrDefault"',
    
    // Character style elements
    '"w:rStyle"': '"hp:styleRef"',
    
    // Settings elements
    '"w:settings"': '"ha:settings"',
    '"w:displayBackgroundShape"': '"ha:displayBackgroundShape"',
    '"w:evenAndOddHeaders"': '"ha:evenAndOddHeaders"',
    '"w:updateFields"': '"ha:updateFields"',
    '"w:defaultTabStop"': '"ha:defaultTabStop"',
    '"w:autoHyphenation"': '"ha:autoHyphenation"',
    '"w:hyphenationZone"': '"ha:hyphenationZone"',
    '"w:consecutiveHyphenLimit"': '"ha:consecutiveHyphenLimit"',
    '"w:doNotHyphenateCaps"': '"ha:doNotHyphenateCaps"',
    '"w:trackRevisions"': '"ha:trackRevisions"',
    
    // Spacing and alignment
    '"w:spacing"': '"hp:lineSpacing"',
    '"w:jc"': '"hp:align"',
    '"w:wordWrap"': '"hp:wordWrap"',
    '"w:textDirection"': '"hs:textDirection"',
    '"w:compatSetting"': '"ha:compatSetting"',
    
    // Other elements
    '"w:lang"': '"hp:language"',
    '"w:instrText"': '"hp:instrText"',
    '"w:outlineLvl"': '"w:outlineLvl"', // Keep some as they are for now
    '"w:vAlign"': '"w:vAlign"',
    
    // Compatibility elements - convert to ha: namespace
    '"w:useSingleBorderforContiguousCells"': '"ha:useSingleBorderforContiguousCells"',
    '"w:wpJustification"': '"ha:wpJustification"',
    '"w:noTabHangInd"': '"ha:noTabHangInd"',
    '"w:noLeading"': '"ha:noLeading"',
    '"w:spaceForUL"': '"ha:spaceForUL"',
    '"w:noColumnBalance"': '"ha:noColumnBalance"',
    '"w:balanceSingleByteDoubleByteWidth"': '"ha:balanceSingleByteDoubleByteWidth"',
    '"w:noExtraLineSpacing"': '"ha:noExtraLineSpacing"',
    '"w:doNotLeaveBackslashAlone"': '"ha:doNotLeaveBackslashAlone"',
    '"w:ulTrailSpace"': '"ha:ulTrailSpace"',
    '"w:doNotExpandShiftReturn"': '"ha:doNotExpandShiftReturn"',
    '"w:spacingInWholePoints"': '"ha:spacingInWholePoints"',
    '"w:lineWrapLikeWord6"': '"ha:lineWrapLikeWord6"',
    '"w:printBodyTextBeforeHeader"': '"ha:printBodyTextBeforeHeader"',
    '"w:printColBlack"': '"ha:printColBlack"',
    '"w:wpSpaceWidth"': '"ha:wpSpaceWidth"',
    '"w:showBreaksInFrames"': '"ha:showBreaksInFrames"',
    '"w:subFontBySize"': '"ha:subFontBySize"',
    '"w:suppressBottomSpacing"': '"ha:suppressBottomSpacing"',
    '"w:suppressTopSpacing"': '"ha:suppressTopSpacing"',
    '"w:suppressSpacingAtTopOfPage"': '"ha:suppressSpacingAtTopOfPage"',
    '"w:suppressTopSpacingWP"': '"ha:suppressTopSpacingWP"',
    '"w:suppressSpBfAfterPgBrk"': '"ha:suppressSpBfAfterPgBrk"',
    '"w:swapBordersFacingPages"': '"ha:swapBordersFacingPages"',
    '"w:convMailMergeEsc"': '"ha:convMailMergeEsc"',
    '"w:truncateFontHeightsLikeWP6"': '"ha:truncateFontHeightsLikeWP6"',
    '"w:mwSmallCaps"': '"ha:mwSmallCaps"',
    '"w:usePrinterMetrics"': '"ha:usePrinterMetrics"',
    '"w:doNotSuppressParagraphBorders"': '"ha:doNotSuppressParagraphBorders"',
    '"w:wrapTrailSpaces"': '"ha:wrapTrailSpaces"',
    '"w:footnoteLayoutLikeWW8"': '"ha:footnoteLayoutLikeWW8"',
    '"w:shapeLayoutLikeWW8"': '"ha:shapeLayoutLikeWW8"',
    '"w:alignTablesRowByRow"': '"ha:alignTablesRowByRow"',
    '"w:forgetLastTabAlignment"': '"ha:forgetLastTabAlignment"',
    '"w:adjustLineHeightInTable"': '"ha:adjustLineHeightInTable"',
    '"w:autoSpaceLikeWord95"': '"ha:autoSpaceLikeWord95"',
    '"w:noSpaceRaiseLower"': '"ha:noSpaceRaiseLower"',
    '"w:doNotUseHTMLParagraphAutoSpacing"': '"ha:doNotUseHTMLParagraphAutoSpacing"',
    '"w:layoutRawTableWidth"': '"ha:layoutRawTableWidth"',
    '"w:layoutTableRowsApart"': '"ha:layoutTableRowsApart"',
    '"w:useWord97LineBreakRules"': '"ha:useWord97LineBreakRules"',
    '"w:doNotBreakWrappedTables"': '"ha:doNotBreakWrappedTables"',
    '"w:doNotSnapToGridInCell"': '"ha:doNotSnapToGridInCell"',
    '"w:selectFldWithFirstOrLastChar"': '"ha:selectFldWithFirstOrLastChar"',
    '"w:applyBreakingRules"': '"ha:applyBreakingRules"',
    '"w:doNotWrapTextWithPunct"': '"ha:doNotWrapTextWithPunct"',
    '"w:doNotUseEastAsianBreakRules"': '"ha:doNotUseEastAsianBreakRules"',
    '"w:useWord2002TableStyleRules"': '"ha:useWord2002TableStyleRules"',
    '"w:growAutofit"': '"ha:growAutofit"',
    '"w:useFELayout"': '"ha:useFELayout"',
    '"w:useNormalStyleForList"': '"ha:useNormalStyleForList"',
    '"w:doNotUseIndentAsNumberingTabStop"': '"ha:doNotUseIndentAsNumberingTabStop"',
    '"w:useAltKinsokuLineBreakRules"': '"ha:useAltKinsokuLineBreakRules"',
    '"w:allowSpaceOfSameStyleInTable"': '"ha:allowSpaceOfSameStyleInTable"',
    '"w:doNotSuppressIndentation"': '"ha:doNotSuppressIndentation"',
    '"w:doNotAutofitConstrainedTables"': '"ha:doNotAutofitConstrainedTables"',
    '"w:autofitToFirstFixedWidthCell"': '"ha:autofitToFirstFixedWidthCell"',
    '"w:underlineTabInNumList"': '"ha:underlineTabInNumList"',
    '"w:displayHangulFixedWidth"': '"ha:displayHangulFixedWidth"',
    '"w:splitPgBreakAndParaMark"': '"ha:splitPgBreakAndParaMark"',
    '"w:doNotVertAlignCellWithSp"': '"ha:doNotVertAlignCellWithSp"',
    '"w:doNotBreakConstrainedForcedTable"': '"ha:doNotBreakConstrainedForcedTable"',
    '"w:doNotVertAlignInTxbx"': '"ha:doNotVertAlignInTxbx"',
    '"w:useAnsiKerningPairs"': '"ha:useAnsiKerningPairs"',
    '"w:cachedColBalance"': '"ha:cachedColBalance"',
    
    // Compatibility mapping for tests
    '"w:compat"': '"ha:compat"',
    
    // More remaining elements that need conversion
    '"w:x"': '"hp:x"', // Generic element for tests
    '"w:rFonts"': '"hp:rFonts"',
    '"w:kern"': '"hp:kern"',
    '"w:eastAsia"': '"hp:eastAsia"',
    '"w:bidi"': '"hp:bidi"',
    
    // Header and Footer references
    '"w:headerReference"': '"hs:headerReference"',
    '"w:footerReference"': '"hs:footerReference"',
    
    // Additional section properties
    '"w:sectPrChange"': '"hs:sectPrChange"',
    '"w:headerFtr"': '"hs:headerFtr"',
    
    // Style-related elements
    '"w:styleId"': '"hh:styleId"',
    '"w:basedOn"': '"hh:basedOn"',
    '"w:link"': '"hh:link"',
    '"w:next"': '"hh:next"',
    '"w:aliases"': '"hh:aliases"',
    '"w:autoRedefine"': '"hh:autoRedefine"',
    '"w:hidden"': '"hh:hidden"',
    '"w:semiHidden"': '"hh:semiHidden"',
    '"w:unhideWhenUsed"': '"hh:unhideWhenUsed"',
    '"w:qFormat"': '"hh:qFormat"',
    '"w:priority"': '"hh:priority"',
    
    // More elements found in failing tests
    '"w:uri"': '"ha:uri"',
    '"w:overrideTableStyleFontSizeAndJustification"': '"ha:overrideTableStyleFontSizeAndJustification"',
    '"w:compatSetting"': '"ha:compatSetting"'
};

// Additional regex patterns for more complex replacements
const REGEX_PATTERNS = [
    // newJson["w:p"] -> newJson["hp:p"]
    [/newJson\["w:([^"]+)"\]/g, 'newJson["hp:$1"]'],
    
    // tree["w:p"] -> tree["hp:p"]  
    [/tree\["w:([^"]+)"\]/g, 'tree["hp:$1"]'],
    
    // assert.isDefined(newJson["w:p"]) -> assert.isDefined(newJson["hp:p"])
    [/assert\.isDefined\(newJson\["w:([^"]+)"\]\)/g, 'assert.isDefined(newJson["hp:$1"])'],
    
    // expect(tree).to.have.property("w:p") -> expect(tree).to.have.property("hp:p")
    [/\.to\.have\.property\("w:([^"]+)"\)/g, '.to.have.property("hp:$1")'],
    
    // Code patterns for hardcoded DOCX element checks
    [/element\.name === "w:r"/g, 'element.name === "hp:run"'],
    [/element\.name === "w:t"/g, 'element.name === "hp:t"'],
    [/e\.name === "w:r"/g, 'e.name === "hp:run"'],
    [/e\.name === "w:t"/g, 'e.name === "hp:t"'],
    [/name === "w:r"/g, 'name === "hp:run"'],
    [/name === "w:t"/g, 'name === "hp:t"'],
    [/"w:r"/g, '"hp:run"'],
    [/"w:t"/g, '"hp:t"'],
];

function convertFileContent(content) {
    let updatedContent = content;
    
    // Apply direct mappings
    for (const [docxPattern, hwpxReplacement] of Object.entries(DOCX_TO_HWPX_MAPPINGS)) {
        const regex = new RegExp(docxPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        updatedContent = updatedContent.replace(regex, hwpxReplacement);
    }
    
    // Apply regex patterns
    for (const [pattern, replacement] of REGEX_PATTERNS) {
        updatedContent = updatedContent.replace(pattern, replacement);
    }
    
    return updatedContent;
}

function processTestFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const updatedContent = convertFileContent(content);
        
        // Only write if content changed
        if (content !== updatedContent) {
            fs.writeFileSync(filePath, updatedContent, 'utf8');
            console.log(`✅ Updated: ${filePath}`);
            return true;
        } else {
            console.log(`⏭️  No changes: ${filePath}`);
            return false;
        }
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
        return false;
    }
}

function findTestFiles(dir) {
    const testFiles = [];
    
    function walkDir(currentPath) {
        const items = fs.readdirSync(currentPath);
        
        for (const item of items) {
            const fullPath = path.join(currentPath, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                walkDir(fullPath);
            } else if (item.endsWith('.spec.ts')) {
                testFiles.push(fullPath);
            }
        }
    }
    
    walkDir(dir);
    return testFiles;
}

function findSourceFiles(dir) {
    const sourceFiles = [];
    
    function walkDir(currentPath) {
        const items = fs.readdirSync(currentPath);
        
        for (const item of items) {
            const fullPath = path.join(currentPath, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                walkDir(fullPath);
            } else if (item.endsWith('.ts') && !item.endsWith('.spec.ts') && !item.endsWith('.d.ts')) {
                sourceFiles.push(fullPath);
            }
        }
    }
    
    walkDir(dir);
    return sourceFiles;
}

function main() {
    console.log('🚀 Starting DOCX to HWPX test conversion...\n');
    
    const testFiles = findTestFiles('./src');
    const sourceFiles = findSourceFiles('./src');
    const allFiles = [...testFiles, ...sourceFiles];
    console.log(`📁 Found ${testFiles.length} test files and ${sourceFiles.length} source files (${allFiles.length} total)\n`);
    
    let processedCount = 0;
    let updatedCount = 0;
    
    for (const file of allFiles) {
        processedCount++;
        const wasUpdated = processTestFile(file);
        if (wasUpdated) updatedCount++;
        
        // Progress indicator
        if (processedCount % 20 === 0) {
            console.log(`\n📊 Progress: ${processedCount}/${allFiles.length} files processed\n`);
        }
    }
    
    console.log('\n🎉 Conversion completed!');
    console.log(`📊 Summary:`);
    console.log(`   - Total files: ${allFiles.length}`);
    console.log(`   - Updated files: ${updatedCount}`);
    console.log(`   - Unchanged files: ${allFiles.length - updatedCount}`);
}

if (require.main === module) {
    main();
}