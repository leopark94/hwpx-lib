/**
 * 최소한의 HWPX 생성 테스트 (실제 HWPX 분석 기반)
 */
import JSZip from "jszip";
import fs from "fs";

async function generateMinimalHwpx() {
    const zip = new JSZip();
    
    // 네임스페이스 정의
    const namespaces = `xmlns:ha="http://www.hancom.co.kr/hwpml/2011/app" xmlns:hp="http://www.hancom.co.kr/hwpml/2011/paragraph" xmlns:hp10="http://www.hancom.co.kr/hwpml/2016/paragraph" xmlns:hs="http://www.hancom.co.kr/hwpml/2011/section" xmlns:hc="http://www.hancom.co.kr/hwpml/2011/core" xmlns:hh="http://www.hancom.co.kr/hwpml/2011/head" xmlns:hhs="http://www.hancom.co.kr/hwpml/2011/history" xmlns:hm="http://www.hancom.co.kr/hwpml/2011/master-page" xmlns:hpf="http://www.hancom.co.kr/schema/2011/hpf" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf/" xmlns:ooxmlchart="http://www.hancom.co.kr/hwpml/2016/ooxmlchart" xmlns:hwpunitchar="http://www.hancom.co.kr/hwpml/2016/HwpUnitChar" xmlns:epub="http://www.idpf.org/2007/ops" xmlns:config="urn:oasis:names:tc:opendocument:xmlns:config:1.0"`;
    
    // 1. mimetype
    zip.file("mimetype", "application/hwp+zip", { compression: "STORE" });
    
    // 2. version.xml (오타 수정: tagetApplication → targetApplication)
    zip.file("version.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<hv:HCFVersion xmlns:hv="http://www.hancom.co.kr/hwpml/2011/version" targetApplication="WORDPROCESSOR" major="5" minor="1" micro="1" buildNumber="0" os="10" xmlVersion="1.5" application="Hancom Office Hangul" appVersion="12.30.0.5708"/>`);
    
    // 3. META-INF/container.xml
    zip.folder("META-INF").file("container.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<container xmlns="urn:oasis:names:tc:opendocument:xmlns:container" version="1.0">
    <rootfiles>
        <rootfile full-path="Contents/content.hpf" media-type="application/hwp+zip"/>
    </rootfiles>
</container>`);
    
    // 4. META-INF/manifest.xml
    zip.folder("META-INF").file("manifest.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0">
    <manifest:file-entry manifest:media-type="application/hwp+zip" manifest:full-path="/"/>
    <manifest:file-entry manifest:media-type="application/xml" manifest:full-path="version.xml"/>
    <manifest:file-entry manifest:media-type="application/xml" manifest:full-path="settings.xml"/>
    <manifest:file-entry manifest:media-type="application/xml" manifest:full-path="Contents/content.hpf"/>
    <manifest:file-entry manifest:media-type="application/xml" manifest:full-path="Contents/header.xml"/>
    <manifest:file-entry manifest:media-type="application/xml" manifest:full-path="Contents/section0.xml"/>
</manifest:manifest>`);
    
    // 5. META-INF/container.rdf
    zip.folder("META-INF").file("container.rdf", `<?xml version="1.0" encoding="UTF-8"?>
<RDF:RDF xmlns:RDF="http://www.w3.org/1999/02/22-rdf-syntax-ns#"/>`);
    
    // 6. Contents/content.hpf
    zip.folder("Contents").file("content.hpf", `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<hpf:contents xmlns:hpf="http://www.hancom.co.kr/schema/2011/hpf">
<hpf:header>header.xml</hpf:header>
<hpf:section src="section0.xml"/>
</hpf:contents>`);
    
    // 7. Contents/header.xml (올바른 fontFaceList 사용)
    const headerXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?><hh:head ${namespaces}>
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
<hh:beforeProc beforeSpace="1">!%),.:;?]}¢°'"′″℃〉》」』】〕ぁぃぅぇぉっゃゅょゎ゛゜ゝゞァィゥェォヵㇰヶㇱㇲッㇳㇴㇵㇶㇷㇸㇹㇺャュョヮㇻㇼㇽㇾㇿヷヺ"ヽヾ</hh:beforeProc>
<hh:afterProc afterSpace="1">#$(\\[{£¥'"〈《「『【〔</hh:afterProc>
<hh:betweenProc koreanLineUnit="10000" otherLineUnit="10000"/>
</hh:ForbiddenWord>
</hh:Forbidden>
</hh:refList>
<hh:fontFaceList itemCnt="4">
<hh:fontFace id="0" flags="0" bold="None" fontCmpType="COPY" fontName="함초롬바탕" fontType="TTF" fontTypeInfoID="0" italic="None" subset="0" symbolic="0" underline="None">
<hh:fontTypefaceNameList>
<hh:fontTypefaceName lang="HANGUL" name="함초롬바탕"/>
<hh:fontTypefaceName lang="ENGLISH" name="HANBatang"/>
</hh:fontTypefaceNameList>
</hh:fontFace>
<hh:fontFace id="1" flags="0" bold="None" fontCmpType="COPY" fontName="함초롬돋움" fontType="TTF" fontTypeInfoID="0" italic="None" subset="0" symbolic="0" underline="None">
<hh:fontTypefaceNameList>
<hh:fontTypefaceName lang="HANGUL" name="함초롬돋움"/>
<hh:fontTypefaceName lang="ENGLISH" name="HANDotum"/>
</hh:fontTypefaceNameList>
</hh:fontFace>
<hh:fontFace id="2" flags="0" bold="None" fontCmpType="COPY" fontName="함초롬바탕 확장" fontType="TTF" fontTypeInfoID="0" italic="None" subset="0" symbolic="0" underline="None">
<hh:fontTypefaceNameList>
<hh:fontTypefaceName lang="HANGUL" name="함초롬바탕 확장"/>
<hh:fontTypefaceName lang="LATIN_EXT" name="HANBatang-B"/>
</hh:fontTypefaceNameList>
</hh:fontFace>
<hh:fontFace id="3" flags="0" bold="None" fontCmpType="COPY" fontName="함초롬돋움 확장" fontType="TTF" fontTypeInfoID="0" italic="None" subset="0" symbolic="0" underline="None">
<hh:fontTypefaceNameList>
<hh:fontTypefaceName lang="HANGUL" name="함초롬돋움 확장"/>
<hh:fontTypefaceName lang="LATIN_EXT" name="HANDotum-B"/>
</hh:fontTypefaceNameList>
</hh:fontFace>
</hh:fontFaceList>
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
<hh:charPrList itemCnt="1">
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
</hh:charPrList>
<hh:tabPrList itemCnt="0"/>
<hh:numberingList itemCnt="0"/>
<hh:bulletList itemCnt="0"/>
<hh:paraPrList itemCnt="1">
<hh:paraPr id="0" tabPrIDRef="0" condense="0" fontLineHeight="0" snapToGrid="1" suppressLineNumbers="0" checked="0">
<hh:align>LEFT</hh:align>
<hh:heading></hh:heading>
<hh:breakLatinWord>KEEP_WORD</hh:breakLatinWord>
<hh:breakNonLatinWord>KEEP_WORD</hh:breakNonLatinWord>
<hh:widowOrphan>0</hh:widowOrphan>
<hh:keepWithNext>0</hh:keepWithNext>
<hh:keepLines>0</hh:keepLines>
<hh:pageBreakBefore>0</hh:pageBreakBefore>
<hh:lineWrap>BREAK</hh:lineWrap>
<hh:verAlign>BASELINE</hh:verAlign>
<hh:margin left="0" right="0" indent="0" prev="0" next="0"/>
<hh:lineSpacing type="PERCENT" value="160" unit=""/>
<hh:border borderFillIDRef="0"/>
</hh:paraPr>
</hh:paraPrList>
<hh:styleList itemCnt="0"/>
<hh:memoShapeList itemCnt="0"/>
<hh:trackChangeList itemCnt="0"/>
<hh:trackChangeAuthorList itemCnt="0"/>
<hm:outlineShapeList itemCnt="1">
<hm:outlineShape id="1">
<hm:outline level="1" type="DIGIT" format="%n." start="1" textOffset="50"/>
<hm:outline level="2" type="DIGIT" format="%n." start="1" textOffset="50"/>
<hm:outline level="3" type="DIGIT" format="%n)" start="1" textOffset="50"/>
<hm:outline level="4" type="DIGIT" format="(%n)" start="1" textOffset="50"/>
<hm:outline level="5" type="DIGIT" format="%n)" start="1" textOffset="50"/>
<hm:outline level="6" type="DIGIT" format="(%n)" start="1" textOffset="50"/>
<hm:outline level="7" type="DIGIT" format="%n." start="1" textOffset="50"/>
<hm:outline level="8" type="DIGIT" format="%n." start="1" textOffset="50"/>
<hm:outline level="9" type="DIGIT" format="%n." start="1" textOffset="50"/>
<hm:outline level="10" type="DIGIT" format="%n." start="1" textOffset="50"/>
</hm:outlineShape>
</hm:outlineShapeList>
</hh:head>`;
    zip.folder("Contents").file("header.xml", headerXml);
    
    // 8. Contents/section0.xml (최소한의 내용)
    const sectionXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?><hs:sec ${namespaces}>
<hp:p id="2147483648" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0"><hp:run charPrIDRef="0"><hp:secPr id="" textDirection="HORIZONTAL" spaceColumns="1134" tabStop="8000" tabStopVal="4000" tabStopUnit="HWPUNIT" outlineShapeIDRef="1" memoShapeIDRef="0" textVerticalWidthHead="0" masterPageCnt="0"><hp:grid lineGrid="0" charGrid="0" wonggojiFormat="0"/><hp:startNum pageStartsOn="BOTH" page="0" pic="0" tbl="0" equation="0"/><hp:visibility hideFirstHeader="0" hideFirstFooter="0" hideFirstMasterPage="0" border="SHOW_ALL" fill="SHOW_ALL" hideFirstPageNum="0" hideFirstEmptyLine="0" showLineNumber="0"/><hp:lineNumberShape restartType="0" countBy="0" distance="0" startNumber="0"/><hp:pagePr landscape="WIDELY" width="59528" height="84186" gutterType="LEFT_ONLY"><hp:margin header="4252" footer="4252" gutter="0" left="8504" right="8504" top="5668" bottom="4252"/></hp:pagePr><hp:footNotePr><hp:autoNumFormat type="DIGIT" userChar="" prefixChar="" suffixChar=")" supscript="0"/><hp:noteLine length="-1" type="SOLID" width="0.12 mm" color="#000000"/><hp:noteSpacing betweenNotes="283" belowLine="567" aboveLine="850"/><hp:numbering type="CONTINUOUS" newNum="1"/><hp:placement place="EACH_COLUMN" beneathText="0"/></hp:footNotePr><hp:endNotePr><hp:autoNumFormat type="DIGIT" userChar="" prefixChar="" suffixChar=")" supscript="0"/><hp:noteLine length="14692344" type="SOLID" width="0.12 mm" color="#000000"/><hp:noteSpacing betweenNotes="0" belowLine="567" aboveLine="850"/><hp:numbering type="CONTINUOUS" newNum="1"/><hp:placement place="END_OF_DOCUMENT" beneathText="0"/></hp:endNotePr><hp:pageBorderFill type="BOTH" borderFillIDRef="1" textBorder="PAPER" headerInside="0" footerInside="0" fillArea="PAPER"><hp:offset left="1417" right="1417" top="1417" bottom="1417"/></hp:pageBorderFill><hp:pageBorderFill type="EVEN" borderFillIDRef="1" textBorder="PAPER" headerInside="0" footerInside="0" fillArea="PAPER"><hp:offset left="1417" right="1417" top="1417" bottom="1417"/></hp:pageBorderFill><hp:pageBorderFill type="ODD" borderFillIDRef="1" textBorder="PAPER" headerInside="0" footerInside="0" fillArea="PAPER"><hp:offset left="1417" right="1417" top="1417" bottom="1417"/></hp:pageBorderFill></hp:secPr><hp:ctrl><hp:colPr id="" type="NEWSPAPER" layout="LEFT" colCount="1" sameSz="1" sameGap="0"/></hp:ctrl></hp:run><hp:run charPrIDRef="0"><hp:ctrl><hp:bookmark name="isPasted"/></hp:ctrl><hp:t></hp:t></hp:run><hp:linesegarray><hp:lineseg textpos="0" vertpos="0" vertsize="2400" textheight="2400" baseline="2040" spacing="480" horzpos="0" horzsize="42520" flags="393216"/></hp:linesegarray></hp:p>
<hp:p id="2147483649" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0"><hp:run charPrIDRef="0"><hp:t>템플릿 기반 HWPX 변환이 정상적으로 작동합니다.</hp:t></hp:run><hp:linesegarray><hp:lineseg textpos="0" vertpos="0" vertsize="2400" textheight="2400" baseline="2040" spacing="480" horzpos="0" horzsize="42520" flags="393216"/></hp:linesegarray></hp:p>
</hs:sec>`;
    zip.folder("Contents").file("section0.xml", sectionXml);
    
    // 9. settings.xml
    const settingsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<ha:HwpApplicationSetting xmlns:ha="http://www.hancom.co.kr/hwpml/2011/app" xmlns:config="urn:oasis:names:tc:opendocument:xmlns:config:1.0">
<ha:ConfigItemSet>
<config:config-item config:name="MasterPageCnt" config:type="long">0</config:config-item>
<config:config-item config:name="CaretType" config:type="short">0</config:config-item>
<config:config-item config:name="CaretWidth" config:type="short">2</config:config-item>
<config:config-item config:name="CaretBlinkingTime" config:type="short">500</config:config-item>
<config:config-item config:name="ViewZoomType" config:type="short">0</config:config-item>
<config:config-item config:name="ViewZoomRatio" config:type="short">100</config:config-item>
<config:config-item config:name="CurViewPageType" config:type="short">0</config:config-item>
<config:config-item config:name="PageBreakMode" config:type="boolean">false</config:config-item>
<config:config-item config:name="ShowGrid" config:type="boolean">false</config:config-item>
<config:config-item config:name="SnapToGrid" config:type="boolean">false</config:config-item>
<config:config-item config:name="GridHor" config:type="long">283</config:config-item>
<config:config-item config:name="GridVer" config:type="long">283</config:config-item>
<config:config-item config:name="GridType" config:type="short">2</config:config-item>
<config:config-item config:name="ShowRuler" config:type="boolean">true</config:config-item>
<config:config-item config:name="HideMenuBar" config:type="boolean">false</config:config-item>
<config:config-item config:name="HideToolBar" config:type="boolean">false</config:config-item>
<config:config-item config:name="HideStatusBar" config:type="boolean">false</config:config-item>
<config:config-item config:name="HideScrollBar" config:type="boolean">false</config:config-item>
<config:config-item config:name="ShowPageBorder" config:type="boolean">true</config:config-item>
<config:config-item config:name="ShowTab" config:type="boolean">false</config:config-item>
<config:config-item config:name="ShowPaper" config:type="boolean">true</config:config-item>
<config:config-item config:name="ShowMark" config:type="boolean">false</config:config-item>
<config:config-item config:name="ShowHyperText" config:type="boolean">true</config:config-item>
<config:config-item config:name="ShowDocVariable" config:type="boolean">false</config:config-item>
<config:config-item config:name="ShowCtrlChar" config:type="boolean">false</config:config-item>
<config:config-item config:name="ShowLineNumber" config:type="boolean">false</config:config-item>
<config:config-item config:name="ShowFieldEdit" config:type="boolean">false</config:config-item>
<config:config-item config:name="ShowInvisibleChar" config:type="boolean">false</config:config-item>
<config:config-item config:name="WndHorzPos" config:type="long">44</config:config-item>
<config:config-item config:name="WndVertPos" config:type="long">22</config:config-item>
<config:config-item config:name="WndExtent" config:type="long">-8</config:config-item>
<config:config-item config:name="WndExtentVert" config:type="long">-8</config:config-item>
<config:config-item config:name="WndNormal" config:type="boolean">true</config:config-item>
</ha:ConfigItemSet>
</ha:HwpApplicationSetting>`;
    zip.file("settings.xml", settingsXml);
    
    // 10. Preview/PrvText.txt
    zip.folder("Preview").file("PrvText.txt", "템플릿 기반 HWPX 변환이 정상적으로 작동합니다.");
    
    // ZIP 생성
    const content = await zip.generateAsync({ type: "nodebuffer" });
    fs.writeFileSync("demo/test-minimal.hwpx", content);
    console.log("✅ 최소한의 HWPX 파일 생성 완료: test-minimal.hwpx");
    
    // 파일 크기 확인
    const stats = fs.statSync("demo/test-minimal.hwpx");
    console.log(`📦 파일 크기: ${Math.round(stats.size / 1024)}KB`);
}

generateMinimalHwpx().catch(console.error);
