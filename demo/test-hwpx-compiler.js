/**
 * 간단한 HWPX 생성 테스트
 */
import JSZip from "jszip";
import fs from "fs";

async function generateSimpleHwpx() {
    const zip = new JSZip();
    
    // 1. mimetype
    zip.file("mimetype", "application/hwp+zip", { compression: "STORE" });
    
    // 2. version.xml
    const versionXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<hv:HCFVersion xmlns:hv="http://www.hancom.co.kr/hwpml/2011/version" tagetApplication="WORDPROCESSOR" major="5" minor="1" micro="1" buildNumber="0" os="10" xmlVersion="1.5" application="Hancom Office Hangul" appVersion="12.30.0.5708"/>`;
    zip.file("version.xml", versionXml);
    
    // 3. META-INF/container.xml
    const containerXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<container xmlns="urn:oasis:names:tc:opendocument:xmlns:container" version="1.0">
    <rootfiles>
        <rootfile full-path="Contents/content.hpf" media-type="application/hwp+zip"/>
    </rootfiles>
</container>`;
    zip.folder("META-INF").file("container.xml", containerXml);
    
    // 4. META-INF/manifest.xml
    const manifestXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0">
    <manifest:file-entry manifest:media-type="application/hwp+zip" manifest:full-path="/"/>
    <manifest:file-entry manifest:media-type="application/xml" manifest:full-path="version.xml"/>
    <manifest:file-entry manifest:media-type="application/xml" manifest:full-path="settings.xml"/>
    <manifest:file-entry manifest:media-type="application/xml" manifest:full-path="Contents/content.hpf"/>
    <manifest:file-entry manifest:media-type="application/xml" manifest:full-path="Contents/header.xml"/>
    <manifest:file-entry manifest:media-type="application/xml" manifest:full-path="Contents/section0.xml"/>
</manifest:manifest>`;
    zip.folder("META-INF").file("manifest.xml", manifestXml);
    
    // 5. META-INF/container.rdf
    zip.folder("META-INF").file("container.rdf", `<?xml version="1.0" encoding="UTF-8"?>
<RDF:RDF xmlns:RDF="http://www.w3.org/1999/02/22-rdf-syntax-ns#"/>`);
    
    // 6. Contents/content.hpf
    const contentHpf = `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<hpf:contents xmlns:hpf="http://www.hancom.co.kr/schema/2011/hpf">
<hpf:header>header.xml</hpf:header>
<hpf:section src="section0.xml"/>
</hpf:contents>`;
    zip.folder("Contents").file("content.hpf", contentHpf);
    
    // 7. Contents/header.xml (간단한 버전)
    const headerXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?><hh:head xmlns:ha="http://www.hancom.co.kr/hwpml/2011/app" xmlns:hp="http://www.hancom.co.kr/hwpml/2011/paragraph" xmlns:hp10="http://www.hancom.co.kr/hwpml/2016/paragraph" xmlns:hs="http://www.hancom.co.kr/hwpml/2011/section" xmlns:hc="http://www.hancom.co.kr/hwpml/2011/core" xmlns:hh="http://www.hancom.co.kr/hwpml/2011/head" xmlns:hhs="http://www.hancom.co.kr/hwpml/2011/history" xmlns:hm="http://www.hancom.co.kr/hwpml/2011/master-page" xmlns:hpf="http://www.hancom.co.kr/schema/2011/hpf" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf/" xmlns:ooxmlchart="http://www.hancom.co.kr/hwpml/2016/ooxmlchart" xmlns:hwpunitchar="http://www.hancom.co.kr/hwpml/2016/HwpUnitChar" xmlns:epub="http://www.idpf.org/2007/ops" xmlns:config="urn:oasis:names:tc:opendocument:xmlns:config:1.0">
<hh:docInfo>
<hh:docSetting TabStop="8000" PageNumType="0" PageStartNum="0" PageStartNumDisp="1" PageNumPos="BOTTOM" TextDir="HORIZONTAL" Gutters="0" WidowOrphan="0" SpellerIgnoreDigit="0" SpellerProcessEnd="1" SpellerUseReplaceList="0" Watermark="0" BorderFlag="ALL" ApplyPageNumType="0" PageNumCtrl="0" MailMergeByBlock="0" MailMergeSort="0" TrackChange="0" TrackChangeOpen="0" LineWrapForLetter="0" OverflowToFootnote="0" HideAnchor="0" EmptyLine="1" Numberig="0" TabAutoExpand="0" BlockFromNonWord="0"/>
</hh:docInfo>
<hh:DocumentProperties/>
<hh:CompatibleDocument>
<hh:TargetProgram>HWP2018</hh:TargetProgram>
<hh:MinVersion/>
</hh:CompatibleDocument>
<hh:LayoutCompatibility>
<hh:LayoutFlag ApplyExtendedCharSpacing="0" ApplyFontWeightToBold="0" UseInnerUnderline="0" FixedUnderlineWidth="0" DoNotApplyDiacSymMarkOfNoneTextPart="0" DoNotAlignWhitespaceOnRight="0" DoNotDrawLastCharWithSpacing="0" DisableGrowShrinkTextToFit="0" TreatQuotationAsLatin="0" DoNotApplyLineBreakAtWordBreakForPuctuation="0" AllowBreakingFontForLargeChar="0" AllowBreakLatinWord="0" AllowWordSuffixBetweenWhiteSpace="0" AllowWordBreakOverflow="0" ApplyMinColumnWidthTo1mm="0" ApplyTabPosBasedOnSegment="0" BreakTabOverLine="0" AdjustMarginFromArabicStyle="0" BreakLatinWordWithinQuotation="0" DrawOverlineOnBottomOfText="0" ApplyBaseCharSpacingOfLetterList="0" ApplyLineHeightPercent="0" DoNotAdjustWordInJustify="0" CheckMaxTextExtentWhenLineBreak="0" UsePrevSpacingAtParaStart="0" TruncateAtLineFeed="0" UnderlineFollowBold="0" DoNotSplitTable="0" LineBreakLikeWord97="0" LineBreakWithNonStrictRule="0" ApplyAtLeastToPercent="0" DisableVerticalCenterOfFolderNameText="0" TreatTimeAsChar="0" UseDailyNewspaperPaperType="0" AllowSpaceOfCharOuterCellInTable="0" ApplyZeroSpacingAtBlankLine="0" ApplyParaBorderToOutside="0"/>
</hh:LayoutCompatibility>
<hh:DocData>
<hh:VariableDocumentProperty VariableDocumentPropertyCnt="0"/>
</hh:DocData>
<hh:refList>
<hh:Forbidden>
<hh:ForbiddenWord>
<hh:beforeProc beforeSpace="1">!%),.:;?]}¢°'\"′″℃〉》」』】〕ぁぃぅぇぉっゃゅょゎ゛゜ゝゞァィゥェォヵㇰヶㇱㇲッㇳㇴㇵㇶㇷㇸㇹㇺャュョヮㇻㇼㇽㇾㇿヷヺ"ヽヾ</hh:beforeProc>
<hh:afterProc afterSpace="1">#$(\\[{£¥'\"〈《「『【〔</hh:afterProc>
<hh:betweenProc koreanLineUnit="10000" otherLineUnit="10000"/>
</hh:ForbiddenWord>
</hh:Forbidden>
</hh:refList>
<hh:fontfaces itemCnt="1">
<hh:fontface lang="HANGUL" fontCnt="1">
<hh:font id="0" face="함초롬돋움" type="TTF">
<hh:typeInfo familyType="FCAT_SERIF" serifStyle="SERIF_CLAS_NORMAL_SANS" weight="400" proportion="PROP_MODERN" contrast="CONTRAST_NONE" strokeVariation="STROKE_GRADUAL_TRAN" armStyle="ARM_STRAIGHT_ARMS_VERT" letterform="LETTER_NORMAL_CONTACT" midline="MIDLINE_STANDARD_TRIMMED" xHeight="XHEIGHT_CONSTANT_LARGE"/>
</hh:font>
</hh:fontface>
<hh:fontface lang="LATIN" fontCnt="1">
<hh:font id="0" face="함초롬돋움" type="TTF">
<hh:typeInfo familyType="FCAT_SERIF" serifStyle="SERIF_CLAS_NORMAL_SANS" weight="400" proportion="PROP_MODERN" contrast="CONTRAST_NONE" strokeVariation="STROKE_GRADUAL_TRAN" armStyle="ARM_STRAIGHT_ARMS_VERT" letterform="LETTER_NORMAL_CONTACT" midline="MIDLINE_STANDARD_TRIMMED" xHeight="XHEIGHT_CONSTANT_LARGE"/>
</hh:font>
</hh:fontface>
<hh:fontface lang="HANJA" fontCnt="1">
<hh:font id="0" face="함초롬돋움" type="TTF">
<hh:typeInfo familyType="FCAT_SERIF" serifStyle="SERIF_CLAS_NORMAL_SANS" weight="400" proportion="PROP_MODERN" contrast="CONTRAST_NONE" strokeVariation="STROKE_GRADUAL_TRAN" armStyle="ARM_STRAIGHT_ARMS_VERT" letterform="LETTER_NORMAL_CONTACT" midline="MIDLINE_STANDARD_TRIMMED" xHeight="XHEIGHT_CONSTANT_LARGE"/>
</hh:font>
</hh:fontface>
<hh:fontface lang="JAPANESE" fontCnt="1">
<hh:font id="0" face="함초롬돋움" type="TTF">
<hh:typeInfo familyType="FCAT_SERIF" serifStyle="SERIF_CLAS_NORMAL_SANS" weight="400" proportion="PROP_MODERN" contrast="CONTRAST_NONE" strokeVariation="STROKE_GRADUAL_TRAN" armStyle="ARM_STRAIGHT_ARMS_VERT" letterform="LETTER_NORMAL_CONTACT" midline="MIDLINE_STANDARD_TRIMMED" xHeight="XHEIGHT_CONSTANT_LARGE"/>
</hh:font>
</hh:fontface>
<hh:fontface lang="OTHER" fontCnt="1">
<hh:font id="0" face="함초롬돋움" type="TTF">
<hh:typeInfo familyType="FCAT_SERIF" serifStyle="SERIF_CLAS_NORMAL_SANS" weight="400" proportion="PROP_MODERN" contrast="CONTRAST_NONE" strokeVariation="STROKE_GRADUAL_TRAN" armStyle="ARM_STRAIGHT_ARMS_VERT" letterform="LETTER_NORMAL_CONTACT" midline="MIDLINE_STANDARD_TRIMMED" xHeight="XHEIGHT_CONSTANT_LARGE"/>
</hh:font>
</hh:fontface>
<hh:fontface lang="SYMBOL" fontCnt="1">
<hh:font id="0" face="함초롬돋움" type="TTF">
<hh:typeInfo familyType="FCAT_SERIF" serifStyle="SERIF_CLAS_NORMAL_SANS" weight="400" proportion="PROP_MODERN" contrast="CONTRAST_NONE" strokeVariation="STROKE_GRADUAL_TRAN" armStyle="ARM_STRAIGHT_ARMS_VERT" letterform="LETTER_NORMAL_CONTACT" midline="MIDLINE_STANDARD_TRIMMED" xHeight="XHEIGHT_CONSTANT_LARGE"/>
</hh:font>
</hh:fontface>
<hh:fontface lang="USER" fontCnt="1">
<hh:font id="0" face="함초롬돋움" type="TTF">
<hh:typeInfo familyType="FCAT_SERIF" serifStyle="SERIF_CLAS_NORMAL_SANS" weight="400" proportion="PROP_MODERN" contrast="CONTRAST_NONE" strokeVariation="STROKE_GRADUAL_TRAN" armStyle="ARM_STRAIGHT_ARMS_VERT" letterform="LETTER_NORMAL_CONTACT" midline="MIDLINE_STANDARD_TRIMMED" xHeight="XHEIGHT_CONSTANT_LARGE"/>
</hh:font>
</hh:fontface>
</hh:fontfaces>
<hh:borderFillList itemCnt="2">
<hh:borderFill id="1">
<hh:slash type="NONE"/>
<hh:backSlash type="NONE"/>
<hh:leftBorder type="NONE" width="0.1 mm" color="#000000"/>
<hh:rightBorder type="NONE" width="0.1 mm" color="#000000"/>
<hh:topBorder type="NONE" width="0.1 mm" color="#000000"/>
<hh:bottomBorder type="NONE" width="0.1 mm" color="#000000"/>
<hh:diagonal type="NONE" width="0.1 mm" color="#000000"/>
</hh:borderFill>
<hh:borderFill id="2">
<hh:slash type="NONE"/>
<hh:backSlash type="NONE"/>
<hh:leftBorder type="SOLID" width="0.12 mm" color="#000000"/>
<hh:rightBorder type="SOLID" width="0.12 mm" color="#000000"/>
<hh:topBorder type="SOLID" width="0.12 mm" color="#000000"/>
<hh:bottomBorder type="SOLID" width="0.12 mm" color="#000000"/>
<hh:diagonal type="NONE" width="0.12 mm" color="#000000"/>
<hh:fillBrush>
<hh:fillColorPattern type="SOLID" patternColor="#FFFFFF" backgroundColor="#FFFFFF"/>
</hh:fillBrush>
</hh:borderFill>
</hh:borderFillList>
<hh:charPrList itemCnt="2">
<hh:charPr id="0" height="1000" textColor="#000000" shadeColor="none" useFontSpace="0" useKerning="0" symMark="NONE" borderFillIDRef="2">
<hh:fontRef hangul="0" latin="0" hanja="0" japanese="0" other="0" symbol="0" user="0"/>
<hh:ratio hangul="100" latin="100" hanja="100" japanese="100" other="100" symbol="100" user="100"/>
<hh:spacing hangul="0" latin="0" hanja="0" japanese="0" other="0" symbol="0" user="0"/>
<hh:relSz hangul="100" latin="100" hanja="100" japanese="100" other="100" symbol="100" user="100"/>
<hh:offset hangul="0" latin="0" hanja="0" japanese="0" other="0" symbol="0" user="0"/>
<hh:underline type="NONE" shape="SOLID" color="#000000"/>
<hh:strikeout shape="NONE" color="#000000"/>
<hh:outline type="NONE"/>
<hh:shadow type="NONE" color="#C0C0C0" offsetX="10" offsetY="10"/>
</hh:charPr>
<hh:charPr id="1" height="1400" textColor="#000000" shadeColor="none" useFontSpace="0" useKerning="0" symMark="NONE" borderFillIDRef="2">
<hh:fontRef hangul="0" latin="0" hanja="0" japanese="0" other="0" symbol="0" user="0"/>
<hh:ratio hangul="100" latin="100" hanja="100" japanese="100" other="100" symbol="100" user="100"/>
<hh:spacing hangul="0" latin="0" hanja="0" japanese="0" other="0" symbol="0" user="0"/>
<hh:relSz hangul="100" latin="100" hanja="100" japanese="100" other="100" symbol="100" user="100"/>
<hh:offset hangul="0" latin="0" hanja="0" japanese="0" other="0" symbol="0" user="0"/>
<hh:underline type="NONE" shape="SOLID" color="#000000"/>
<hh:strikeout shape="NONE" color="#000000"/>
<hh:outline type="NONE"/>
<hh:shadow type="NONE" color="#C0C0C0" offsetX="10" offsetY="10"/>
</hh:charPr>
</hh:charPrList>
<hh:tabPrList itemCnt="0"/>
<hh:numberingList itemCnt="0"/>
<hh:bulletList itemCnt="0"/>
<hh:paraPrList itemCnt="2">
<hh:paraPr id="0" tabPrIDRef="0" condense="0" fontLineHeight="0" snapToGrid="1" suppressLineNumbers="0" checked="0">
<hh:align horizontal="LEFT" vertical="BASELINE"/>
<hh:heading type="NONE" idRef="0" level="0"/>
<hh:breakSetting breakLatinWord="KEEP_WORD" breakNonLatinWord="KEEP_WORD" widowOrphan="false" keepWithNext="false" keepLines="false" pageBreakBefore="false" lineWrap="BREAK" nonStartCharSet="" nonEndCharSet=""/>
<hh:autoSpacing eAsianEng="false" eAsianNum="false"/>
<hh:margin intent="0" left="0" right="0" prev="0" next="0"/>
<hh:lineSpacing type="PERCENT" value="160" unit=""/>
<hh:border borderFillIDRef="1"/>
</hh:paraPr>
<hh:paraPr id="1" tabPrIDRef="0" condense="0" fontLineHeight="0" snapToGrid="1" suppressLineNumbers="0" checked="0">
<hh:align horizontal="CENTER" vertical="BASELINE"/>
<hh:heading type="NONE" idRef="0" level="0"/>
<hh:breakSetting breakLatinWord="KEEP_WORD" breakNonLatinWord="KEEP_WORD" widowOrphan="false" keepWithNext="false" keepLines="false" pageBreakBefore="false" lineWrap="BREAK" nonStartCharSet="" nonEndCharSet=""/>
<hh:autoSpacing eAsianEng="false" eAsianNum="false"/>
<hh:margin intent="0" left="0" right="0" prev="0" next="0"/>
<hh:lineSpacing type="PERCENT" value="160" unit=""/>
<hh:border borderFillIDRef="1"/>
</hh:paraPr>
</hh:paraPrList>
<hh:styleList itemCnt="0"/>
<hh:memoShapeList itemCnt="0"/>
<hh:trackChangeList itemCnt="0"/>
<hh:trackChangeAuthorList itemCnt="0"/>
</hh:head>`;
    zip.folder("Contents").file("header.xml", headerXml);
    
    // 8. Contents/section0.xml (간단한 버전)
    const sectionXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?><hs:sec xmlns:ha="http://www.hancom.co.kr/hwpml/2011/app" xmlns:hp="http://www.hancom.co.kr/hwpml/2011/paragraph" xmlns:hp10="http://www.hancom.co.kr/hwpml/2016/paragraph" xmlns:hs="http://www.hancom.co.kr/hwpml/2011/section" xmlns:hc="http://www.hancom.co.kr/hwpml/2011/core" xmlns:hh="http://www.hancom.co.kr/hwpml/2011/head" xmlns:hhs="http://www.hancom.co.kr/hwpml/2011/history" xmlns:hm="http://www.hancom.co.kr/hwpml/2011/master-page" xmlns:hpf="http://www.hancom.co.kr/schema/2011/hpf" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf/" xmlns:ooxmlchart="http://www.hancom.co.kr/hwpml/2016/ooxmlchart" xmlns:hwpunitchar="http://www.hancom.co.kr/hwpml/2016/HwpUnitChar" xmlns:epub="http://www.idpf.org/2007/ops" xmlns:config="urn:oasis:names:tc:opendocument:xmlns:config:1.0">
<hp:p id="2147483648" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0"><hp:run charPrIDRef="0"><hp:secPr id="" textDirection="HORIZONTAL" spaceColumns="1134" tabStop="8000" tabStopVal="4000" tabStopUnit="HWPUNIT" outlineShapeIDRef="1" memoShapeIDRef="0" textVerticalWidthHead="0" masterPageCnt="0"><hp:grid lineGrid="0" charGrid="0" wonggojiFormat="0"/><hp:startNum pageStartsOn="BOTH" page="0" pic="0" tbl="0" equation="0"/><hp:visibility hideFirstHeader="0" hideFirstFooter="0" hideFirstMasterPage="0" border="SHOW_ALL" fill="SHOW_ALL" hideFirstPageNum="0" hideFirstEmptyLine="0" showLineNumber="0"/><hp:lineNumberShape restartType="0" countBy="0" distance="0" startNumber="0"/><hp:pagePr landscape="WIDELY" width="59528" height="84186" gutterType="LEFT_ONLY"><hp:margin header="4252" footer="4252" gutter="0" left="8504" right="8504" top="5668" bottom="4252"/></hp:pagePr><hp:footNotePr><hp:autoNumFormat type="DIGIT" userChar="" prefixChar="" suffixChar=")" supscript="0"/><hp:noteLine length="-1" type="SOLID" width="0.12 mm" color="#000000"/><hp:noteSpacing betweenNotes="283" belowLine="567" aboveLine="850"/><hp:numbering type="CONTINUOUS" newNum="1"/><hp:placement place="EACH_COLUMN" beneathText="0"/></hp:footNotePr><hp:endNotePr><hp:autoNumFormat type="DIGIT" userChar="" prefixChar="" suffixChar=")" supscript="0"/><hp:noteLine length="14692344" type="SOLID" width="0.12 mm" color="#000000"/><hp:noteSpacing betweenNotes="0" belowLine="567" aboveLine="850"/><hp:numbering type="CONTINUOUS" newNum="1"/><hp:placement place="END_OF_DOCUMENT" beneathText="0"/></hp:endNotePr><hp:pageBorderFill type="BOTH" borderFillIDRef="1" textBorder="PAPER" headerInside="0" footerInside="0" fillArea="PAPER"><hp:offset left="1417" right="1417" top="1417" bottom="1417"/></hp:pageBorderFill><hp:pageBorderFill type="EVEN" borderFillIDRef="1" textBorder="PAPER" headerInside="0" footerInside="0" fillArea="PAPER"><hp:offset left="1417" right="1417" top="1417" bottom="1417"/></hp:pageBorderFill><hp:pageBorderFill type="ODD" borderFillIDRef="1" textBorder="PAPER" headerInside="0" footerInside="0" fillArea="PAPER"><hp:offset left="1417" right="1417" top="1417" bottom="1417"/></hp:pageBorderFill></hp:secPr><hp:ctrl><hp:colPr id="" type="NEWSPAPER" layout="LEFT" colCount="1" sameSz="1" sameGap="0"/></hp:ctrl></hp:run><hp:run charPrIDRef="0"><hp:ctrl><hp:bookmark name="isPasted"/></hp:ctrl><hp:t></hp:t></hp:run><hp:linesegarray><hp:lineseg textpos="0" vertpos="0" vertsize="2400" textheight="2400" baseline="2040" spacing="480" horzpos="0" horzsize="42520" flags="393216"/></hp:linesegarray></hp:p>
<hp:p id="2147483649" paraPrIDRef="1" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0"><hp:run charPrIDRef="1"><hp:t>HWPX 변환 테스트 문서</hp:t></hp:run><hp:linesegarray><hp:lineseg textpos="0" vertpos="0" vertsize="2400" textheight="2400" baseline="2040" spacing="480" horzpos="0" horzsize="42520" flags="393216"/></hp:linesegarray></hp:p>
<hp:p id="2147483650" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0"><hp:run charPrIDRef="0"><hp:t>이것은 한글 HWPX 형식으로 변환된 문서입니다.</hp:t></hp:run><hp:linesegarray><hp:lineseg textpos="0" vertpos="0" vertsize="2400" textheight="2400" baseline="2040" spacing="480" horzpos="0" horzsize="42520" flags="393216"/></hp:linesegarray></hp:p>
<hp:tbl id="2147483651" zOrder="0" numberingType="TABLE" textWrap="TOP_AND_BOTTOM" textFlow="BOTH_SIDES" lock="0" dropcapstyle="None" pageBreak="CELL" repeatHeader="1" rowCnt="2" colCnt="2" cellSpacing="0" borderFillIDRef="2" noAdjust="0">
<hp:sz width="47630" widthRelTo="ABSOLUTE" height="5862" heightRelTo="ABSOLUTE" protect="0"/>
<hp:pos treatAsChar="1" affectLSpacing="0" flowWithText="1" allowOverlap="0" holdAnchorAndSO="0" vertRelTo="PARA" horzRelTo="PARA" vertPos="0" horzPos="0" vertOffset="0" horzOffset="0"/>
<hp:outMargin left="0" right="0" top="0" bottom="0"/>
<hp:caption pos="0" gap="850" width="0" height="0" sideMargin="0" fullSz="1"/>
<hp:tr>
<hp:tc name="" header="0" hasMargin="0" protect="0" editable="0" dirty="0" borderFillIDRef="2">
<hp:cellAddr colAddr="0" rowAddr="0"/>
<hp:cellSpan colSpan="1" rowSpan="1"/>
<hp:cellSz width="23815" height="2931" protect="0"/>
<hp:cellMargin left="283" right="283" top="283" bottom="283"/>
<hp:p id="2147483652" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0"><hp:run charPrIDRef="0"><hp:t>항목</hp:t></hp:run><hp:linesegarray><hp:lineseg textpos="0" vertpos="0" vertsize="2400" textheight="2400" baseline="2040" spacing="480" horzpos="0" horzsize="42520" flags="393216"/></hp:linesegarray></hp:p>
</hp:tc>
<hp:tc name="" header="0" hasMargin="0" protect="0" editable="0" dirty="0" borderFillIDRef="2">
<hp:cellAddr colAddr="1" rowAddr="0"/>
<hp:cellSpan colSpan="1" rowSpan="1"/>
<hp:cellSz width="23815" height="2931" protect="0"/>
<hp:cellMargin left="283" right="283" top="283" bottom="283"/>
<hp:p id="2147483653" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0"><hp:run charPrIDRef="0"><hp:t>내용</hp:t></hp:run><hp:linesegarray><hp:lineseg textpos="0" vertpos="0" vertsize="2400" textheight="2400" baseline="2040" spacing="480" horzpos="0" horzsize="42520" flags="393216"/></hp:linesegarray></hp:p>
</hp:tc>
</hp:tr>
<hp:tr>
<hp:tc name="" header="0" hasMargin="0" protect="0" editable="0" dirty="0" borderFillIDRef="2">
<hp:cellAddr colAddr="0" rowAddr="1"/>
<hp:cellSpan colSpan="1" rowSpan="1"/>
<hp:cellSz width="23815" height="2931" protect="0"/>
<hp:cellMargin left="283" right="283" top="283" bottom="283"/>
<hp:p id="2147483654" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0"><hp:run charPrIDRef="0"><hp:t>테스트</hp:t></hp:run><hp:linesegarray><hp:lineseg textpos="0" vertpos="0" vertsize="2400" textheight="2400" baseline="2040" spacing="480" horzpos="0" horzsize="42520" flags="393216"/></hp:linesegarray></hp:p>
</hp:tc>
<hp:tc name="" header="0" hasMargin="0" protect="0" editable="0" dirty="0" borderFillIDRef="2">
<hp:cellAddr colAddr="1" rowAddr="1"/>
<hp:cellSpan colSpan="1" rowSpan="1"/>
<hp:cellSz width="23815" height="2931" protect="0"/>
<hp:cellMargin left="283" right="283" top="283" bottom="283"/>
<hp:p id="2147483655" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0"><hp:run charPrIDRef="0"><hp:t>성공</hp:t></hp:run><hp:linesegarray><hp:lineseg textpos="0" vertpos="0" vertsize="2400" textheight="2400" baseline="2040" spacing="480" horzpos="0" horzsize="42520" flags="393216"/></hp:linesegarray></hp:p>
</hp:tc>
</hp:tr>
</hp:tbl>
</hs:sec>`;
    zip.folder("Contents").file("section0.xml", sectionXml);
    
    // 9. settings.xml
    const settingsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<ha:HwpApplicationSetting xmlns:ha="http://www.hancom.co.kr/hwpml/2011/app" xmlns:config="urn:oasis:names:tc:opendocument:xmlns:config:1.0">
<ha:ConfigItemSet>
<config:config-item config:name="ColorPicker" config:type="int">0</config:config-item>
<config:config-item config:name="FontSize" config:type="int">9</config:config-item>
<config:config-item config:name="LineUnit" config:type="int">86</config:config-item>
<config:config-item config:name="PrintDevice" config:type="int">0</config:config-item>
<config:config-item config:name="ShowGuideLine" config:type="int">1</config:config-item>
<config:config-item config:name="ShowRuler" config:type="int">1</config:config-item>
<config:config-item config:name="ShowPaper" config:type="int">1</config:config-item>
<config:config-item config:name="ShowMenuBar" config:type="int">1</config:config-item>
<config:config-item config:name="ShowToolBar" config:type="int">127</config:config-item>
<config:config-item config:name="ShowStatusBar" config:type="int">1</config:config-item>
<config:config-item config:name="ShowScrollBar" config:type="int">1</config:config-item>
<config:config-item config:name="HideTabBar" config:type="int">0</config:config-item>
<config:config-item config:name="GridDisplay" config:type="int">2</config:config-item>
<config:config-item config:name="GridPropertyLine" config:type="int">0</config:config-item>
<config:config-item config:name="GridPropertyRuler" config:type="int">1</config:config-item>
<config:config-item config:name="GridInfoHorSpacing" config:type="int">850</config:config-item>
<config:config-item config:name="GridInfoVerSpacing" config:type="int">850</config:config-item>
<config:config-item config:name="GridInfoHorSecCnt" config:type="int">10</config:config-item>
<config:config-item config:name="GridInfoVerSecCnt" config:type="int">10</config:config-item>
<config:config-item config:name="GridViewLine" config:type="int">2</config:config-item>
<config:config-item config:name="ViewKind" config:type="int">0</config:config-item>
<config:config-item config:name="ViewMode" config:type="int">1</config:config-item>
<config:config-item config:name="UserInfo" config:type="int">0</config:config-item>
<config:config-item config:name="NullLayoutModeEnable" config:type="int">0</config:config-item>
<config:config-item config:name="LineNumberDisplay" config:type="int">0</config:config-item>
<config:config-item config:name="ResearchPanelAutoStart" config:type="int">0</config:config-item>
<config:config-item config:name="ResearchPanelShowState" config:type="int">0</config:config-item>
<config:config-item config:name="CaretPosition" config:type="long">0</config:config-item>
<config:config-item config:name="HtmlExportMethod" config:type="int">1</config:config-item>
<config:config-item config:name="SecurityLevel" config:type="int">2</config:config-item>
<config:config-item config:name="InitToolBar" config:type="boolean">false</config:config-item>
<config:config-item config:name="InitMenuBar" config:type="boolean">false</config:config-item>
<config:config-item config:name="DirtyFlag" config:type="boolean">false</config:config-item>
<config:config-item config:name="ZoomType" config:type="int">2</config:config-item>
<config:config-item config:name="ZoomLevel" config:type="int">163</config:config-item>
<config:config-item config:name="ReadOnlyOpen" config:type="boolean">false</config:config-item>
<config:config-item config:name="FieldCode" config:type="boolean">false</config:config-item>
<config:config-item config:name="Memo" config:type="boolean">false</config:config-item>
<config:config-item config:name="PresentMode" config:type="boolean">false</config:config-item>
<config:config-item config:name="BorderView" config:type="boolean">true</config:config-item>
<config:config-item config:name="VRuler" config:type="boolean">true</config:config-item>
<config:config-item config:name="HRuler" config:type="boolean">true</config:config-item>
<config:config-item config:name="SymMark" config:type="boolean">false</config:config-item>
<config:config-item config:name="HighlightCheck" config:type="boolean">false</config:config-item>
<config:config-item config:name="TypeHangulEngNumChar" config:type="boolean">true</config:config-item>
<config:config-item config:name="PgMargin" config:type="boolean">false</config:config-item>
<config:config-item config:name="Hide" config:type="boolean">false</config:config-item>
<config:config-item config:name="ShowFrame" config:type="boolean">false</config:config-item>
<config:config-item config:name="PgNumDisp" config:type="boolean">true</config:config-item>
<config:config-item config:name="ShowGrid" config:type="boolean">false</config:config-item>
<config:config-item config:name="Wnd0Left" config:type="int">0</config:config-item>
<config:config-item config:name="Wnd0Top" config:type="int">0</config:config-item>
<config:config-item config:name="Wnd0Right" config:type="int">1</config:config-item>
<config:config-item config:name="Wnd0Bottom" config:type="int">1</config:config-item>
<config:config-item config:name="WndNormal" config:type="boolean">true</config:config-item>
</ha:ConfigItemSet>
</ha:HwpApplicationSetting>`;
    zip.file("settings.xml", settingsXml);
    
    // 10. Preview/PrvText.txt
    zip.folder("Preview").file("PrvText.txt", "HWPX 변환 테스트 문서\n이것은 한글 HWPX 형식으로 변환된 문서입니다.");
    
    // ZIP 생성
    const content = await zip.generateAsync({ type: "nodebuffer" });
    fs.writeFileSync("demo/test-simple.hwpx", content);
    console.log("✅ 간단한 HWPX 파일 생성 완료: test-simple.hwpx");
}

generateSimpleHwpx().catch(console.error);
