var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import JSZip from "jszip";
import * as fs from "fs";
import * as path from "path";
import { Paragraph } from "@file/paragraph";
import { Table } from "@file/table";
import { TextRun } from "@file/paragraph/run";
export class HwpxTemplateCompiler {
    constructor() {
        Object.defineProperty(this, "nextElementId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 2147483648
        });
        Object.defineProperty(this, "nextCharPrId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "nextParaPrId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "nextBorderFillId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        Object.defineProperty(this, "charPrStyles", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "paraPrStyles", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "borderFillStyles", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "namespaces", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: `xmlns:ha="http://www.hancom.co.kr/hwpml/2011/app" xmlns:hp="http://www.hancom.co.kr/hwpml/2011/paragraph" xmlns:hp10="http://www.hancom.co.kr/hwpml/2016/paragraph" xmlns:hs="http://www.hancom.co.kr/hwpml/2011/section" xmlns:hc="http://www.hancom.co.kr/hwpml/2011/core" xmlns:hh="http://www.hancom.co.kr/hwpml/2011/head" xmlns:hhs="http://www.hancom.co.kr/hwpml/2011/history" xmlns:hm="http://www.hancom.co.kr/hwpml/2011/master-page" xmlns:hpf="http://www.hancom.co.kr/schema/2011/hpf" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf/" xmlns:ooxmlchart="http://www.hancom.co.kr/hwpml/2016/ooxmlchart" xmlns:hwpunitchar="http://www.hancom.co.kr/hwpml/2016/HwpUnitChar" xmlns:epub="http://www.idpf.org/2007/ops" xmlns:config="urn:oasis:names:tc:opendocument:xmlns:config:1.0"`
        });
        this._initializeStyles();
    }
    compile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const templatePath = path.join(process.cwd(), 'templates/empty_template.hwpx');
                if (!fs.existsSync(templatePath)) {
                    return this.compileFromScratch(file);
                }
                const templateData = fs.readFileSync(templatePath);
                const zip = new JSZip();
                const loadedZip = yield zip.loadAsync(templateData);
                const headerXml = this._generateHeader(file);
                loadedZip.file("Contents/header.xml", headerXml);
                const sectionXml = this._generateSection(file.Document);
                loadedZip.file("Contents/section0.xml", sectionXml);
                const previewText = this._extractPreviewText(file.Document);
                loadedZip.file("Preview/PrvText.txt", previewText);
                for (const imageData of file.Media.Array) {
                    loadedZip.folder("Contents").folder("Bindata").file(imageData.fileName, imageData.data);
                }
                return loadedZip;
            }
            catch (error) {
                console.warn('템플릿 로드 실패, 기본 구조로 생성:', error);
                return this.compileFromScratch(file);
            }
        });
    }
    compileFromScratch(file) {
        const zip = new JSZip();
        zip.file("mimetype", "application/hwp+zip", { compression: "STORE" });
        zip.file("version.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<hv:HCFVersion xmlns:hv="http://www.hancom.co.kr/hwpml/2011/version" targetApplication="WORDPROCESSOR" major="5" minor="1" micro="1" buildNumber="0" os="10" xmlVersion="1.5" application="Hancom Office Hangul" appVersion="12.30.0.5708"/>`);
        zip.folder("META-INF").file("container.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<container xmlns="urn:oasis:names:tc:opendocument:xmlns:container" version="1.0">
    <rootfiles>
        <rootfile full-path="Contents/content.hpf" media-type="application/hwp+zip"/>
    </rootfiles>
</container>`);
        zip.folder("META-INF").file("manifest.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0">
    <manifest:file-entry manifest:media-type="application/hwp+zip" manifest:full-path="/"/>
    <manifest:file-entry manifest:media-type="application/xml" manifest:full-path="version.xml"/>
    <manifest:file-entry manifest:media-type="application/xml" manifest:full-path="settings.xml"/>
    <manifest:file-entry manifest:media-type="application/xml" manifest:full-path="Contents/content.hpf"/>
    <manifest:file-entry manifest:media-type="application/xml" manifest:full-path="Contents/header.xml"/>
    <manifest:file-entry manifest:media-type="application/xml" manifest:full-path="Contents/section0.xml"/>
</manifest:manifest>`);
        zip.folder("META-INF").file("container.rdf", `<?xml version="1.0" encoding="UTF-8"?>
<RDF:RDF xmlns:RDF="http://www.w3.org/1999/02/22-rdf-syntax-ns#"/>`);
        zip.folder("Contents").file("content.hpf", `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<hpf:contents xmlns:hpf="http://www.hancom.co.kr/schema/2011/hpf">
<hpf:header>header.xml</hpf:header>
<hpf:section src="section0.xml"/>
</hpf:contents>`);
        const headerXml = this._generateHeader(file);
        zip.folder("Contents").file("header.xml", headerXml);
        const sectionXml = this._generateSection(file.Document);
        zip.folder("Contents").file("section0.xml", sectionXml);
        zip.file("settings.xml", this._generateSettings());
        const previewText = this._extractPreviewText(file.Document);
        zip.folder("Preview").file("PrvText.txt", previewText);
        for (const imageData of file.Media.Array) {
            zip.folder("Contents").folder("Bindata").file(imageData.fileName, imageData.data);
        }
        return zip;
    }
    _initializeStyles() {
        this.charPrStyles.set('default', {
            id: this.nextCharPrId++,
            xml: `<hh:charPr id="0" height="1000" textColor="#000000" shadeColor="none" useFontSpace="0" useKerning="0" symMark="NONE" borderFillIDRef="2">
<hh:fontRef hangul="0" latin="0" hanja="0" japanese="0" other="0" symbol="0" user="0"/>
<hh:ratio hangul="100" latin="100" hanja="100" japanese="100" other="100" symbol="100" user="100"/>
<hh:spacing hangul="0" latin="0" hanja="0" japanese="0" other="0" symbol="0" user="0"/>
<hh:relSz hangul="100" latin="100" hanja="100" japanese="100" other="100" symbol="100" user="100"/>
<hh:offset hangul="0" latin="0" hanja="0" japanese="0" other="0" symbol="0" user="0"/>
<hh:underline type="NONE" shape="SOLID" color="#000000"/>
<hh:strikeout shape="NONE" color="#000000"/>
<hh:outline type="NONE"/>
<hh:shadow type="NONE" color="#C0C0C0" offsetX="10" offsetY="10"/>
</hh:charPr>`
        });
        this.paraPrStyles.set('default', {
            id: this.nextParaPrId++,
            xml: `<hh:paraPr id="0" tabPrIDRef="0" condense="0" fontLineHeight="0" snapToGrid="1" suppressLineNumbers="0" checked="0">
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
</hh:paraPr>`
        });
        this.borderFillStyles.set('default', {
            id: this.nextBorderFillId++,
            xml: `<hh:borderFill id="1">
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
</hh:borderFill>`
        });
        this.borderFillStyles.set('transparent', {
            id: this.nextBorderFillId++,
            xml: `<hh:borderFill id="2">
<hh:slash type="NONE"/>
<hh:backSlash type="NONE"/>
<hh:leftBorder type="NONE" width="0.0 mm" color="#000000"/>
<hh:rightBorder type="NONE" width="0.0 mm" color="#000000"/>
<hh:topBorder type="NONE" width="0.0 mm" color="#000000"/>
<hh:bottomBorder type="NONE" width="0.0 mm" color="#000000"/>
<hh:diagonal type="NONE" width="0.0 mm" color="#000000"/>
<hh:fillBrush>
<hh:fillColorPattern type="NONE" patternColor="#FFFFFF" backgroundColor="#FFFFFF"/>
</hh:fillBrush>
</hh:borderFill>`
        });
    }
    _generateHeader(file) {
        const charPrs = Array.from(this.charPrStyles.values()).map(style => style.xml).join('\n');
        const paraPrs = Array.from(this.paraPrStyles.values()).map(style => style.xml).join('\n');
        const borderFills = Array.from(this.borderFillStyles.values()).map(style => style.xml).join('\n');
        return `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?><hh:head ${this.namespaces}>
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
<hh:borderFillList itemCnt="${this.borderFillStyles.size}">
${borderFills}
</hh:borderFillList>
<hh:charPrList itemCnt="${this.charPrStyles.size}">
${charPrs}
</hh:charPrList>
<hh:tabPrList itemCnt="0"/>
<hh:numberingList itemCnt="0"/>
<hh:bulletList itemCnt="0"/>
<hh:paraPrList itemCnt="${this.paraPrStyles.size}">
${paraPrs}
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
    }
    _generateSection(document) {
        return `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?><hs:sec ${this.namespaces}>
${this._generateFirstParagraph()}
${this._compileBody(document)}
</hs:sec>`;
    }
    _generateFirstParagraph() {
        const elementId = this.nextElementId++;
        return `<hp:p id="${elementId}" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0"><hp:run charPrIDRef="0"><hp:secPr id="" textDirection="HORIZONTAL" spaceColumns="1134" tabStop="8000" tabStopVal="4000" tabStopUnit="HWPUNIT" outlineShapeIDRef="1" memoShapeIDRef="0" textVerticalWidthHead="0" masterPageCnt="0"><hp:grid lineGrid="0" charGrid="0" wonggojiFormat="0"/><hp:startNum pageStartsOn="BOTH" page="0" pic="0" tbl="0" equation="0"/><hp:visibility hideFirstHeader="0" hideFirstFooter="0" hideFirstMasterPage="0" border="SHOW_ALL" fill="SHOW_ALL" hideFirstPageNum="0" hideFirstEmptyLine="0" showLineNumber="0"/><hp:lineNumberShape restartType="0" countBy="0" distance="0" startNumber="0"/><hp:pagePr landscape="WIDELY" width="59528" height="84186" gutterType="LEFT_ONLY"><hp:margin header="4252" footer="4252" gutter="0" left="8504" right="8504" top="5668" bottom="4252"/></hp:pagePr><hp:footNotePr><hp:autoNumFormat type="DIGIT" userChar="" prefixChar="" suffixChar=")" supscript="0"/><hp:noteLine length="-1" type="SOLID" width="0.12 mm" color="#000000"/><hp:noteSpacing betweenNotes="283" belowLine="567" aboveLine="850"/><hp:numbering type="CONTINUOUS" newNum="1"/><hp:placement place="EACH_COLUMN" beneathText="0"/></hp:footNotePr><hp:endNotePr><hp:autoNumFormat type="DIGIT" userChar="" prefixChar="" suffixChar=")" supscript="0"/><hp:noteLine length="14692344" type="SOLID" width="0.12 mm" color="#000000"/><hp:noteSpacing betweenNotes="0" belowLine="567" aboveLine="850"/><hp:numbering type="CONTINUOUS" newNum="1"/><hp:placement place="END_OF_DOCUMENT" beneathText="0"/></hp:endNotePr><hp:pageBorderFill type="BOTH" borderFillIDRef="1" textBorder="PAPER" headerInside="0" footerInside="0" fillArea="PAPER"><hp:offset left="1417" right="1417" top="1417" bottom="1417"/></hp:pageBorderFill><hp:pageBorderFill type="EVEN" borderFillIDRef="1" textBorder="PAPER" headerInside="0" footerInside="0" fillArea="PAPER"><hp:offset left="1417" right="1417" top="1417" bottom="1417"/></hp:pageBorderFill><hp:pageBorderFill type="ODD" borderFillIDRef="1" textBorder="PAPER" headerInside="0" footerInside="0" fillArea="PAPER"><hp:offset left="1417" right="1417" top="1417" bottom="1417"/></hp:pageBorderFill></hp:secPr><hp:ctrl><hp:colPr id="" type="NEWSPAPER" layout="LEFT" colCount="1" sameSz="1" sameGap="0"/></hp:ctrl></hp:run><hp:run charPrIDRef="0"><hp:ctrl><hp:bookmark name="isPasted"/></hp:ctrl><hp:t></hp:t></hp:run><hp:linesegarray><hp:lineseg textpos="0" vertpos="0" vertsize="2400" textheight="2400" baseline="2040" spacing="480" horzpos="0" horzsize="42520" flags="393216"/></hp:linesegarray></hp:p>
`;
    }
    _generateSettings() {
        return `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
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
    }
    _compileBody(documentWrapper) {
        let xml = '';
        try {
            const body = documentWrapper.Document.Body;
            for (const section of body.Sections) {
                for (const child of section.Children) {
                    if (child instanceof Paragraph) {
                        xml += this._compileParagraph(child);
                    }
                    else if (child instanceof Table) {
                        xml += this._compileTable(child);
                    }
                }
            }
        }
        catch (error) {
            const elementId = this.nextElementId++;
            xml = `<hp:p id="${elementId}" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0"><hp:run charPrIDRef="0"><hp:t>HWPX 변환 테스트</hp:t></hp:run><hp:linesegarray><hp:lineseg textpos="0" vertpos="0" vertsize="2400" textheight="2400" baseline="2040" spacing="480" horzpos="0" horzsize="42520" flags="393216"/></hp:linesegarray></hp:p>
`;
        }
        return xml;
    }
    _compileParagraph(paragraph) {
        const elementId = this.nextElementId++;
        let paraPrId = 0;
        const properties = paragraph.Properties;
        if (properties && properties.alignment && properties.alignment.horizontal === "center") {
            paraPrId = 0;
        }
        let runXml = '';
        try {
            const children = paragraph.Children || [];
            for (const child of children) {
                if (child instanceof TextRun) {
                    const charPrId = 0;
                    const text = child.text || '';
                    const escapedText = this._escapeXmlText(text);
                    runXml += `<hp:run charPrIDRef="${charPrId}"><hp:t>${escapedText}</hp:t></hp:run>`;
                }
            }
        }
        catch (error) {
        }
        if (!runXml.trim()) {
            runXml = '<hp:run charPrIDRef="0"><hp:t></hp:t></hp:run>';
        }
        const linesegArray = `<hp:linesegarray><hp:lineseg textpos="0" vertpos="0" vertsize="2400" textheight="2400" baseline="2040" spacing="480" horzpos="0" horzsize="42520" flags="393216"/></hp:linesegarray>`;
        return `<hp:p id="${elementId}" paraPrIDRef="${paraPrId}" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0">${runXml}${linesegArray}</hp:p>
`;
    }
    _compileTable(table) {
        const tableId = this.nextElementId++;
        const rowCount = table.RowCount || 1;
        const colCount = table.ColumnCount || 1;
        const tableWidth = 47630;
        const tableHeight = 2931;
        let tableXml = `<hp:tbl id="${tableId}" zOrder="0" numberingType="TABLE" textWrap="TOP_AND_BOTTOM" textFlow="BOTH_SIDES" lock="0" dropcapstyle="None" pageBreak="CELL" repeatHeader="1" rowCnt="${rowCount}" colCnt="${colCount}" cellSpacing="0" borderFillIDRef="1" noAdjust="0">
<hp:sz width="${tableWidth}" widthRelTo="ABSOLUTE" height="${tableHeight}" heightRelTo="ABSOLUTE" protect="0"/>
<hp:pos treatAsChar="1" affectLSpacing="0" flowWithText="1" allowOverlap="0" holdAnchorAndSO="0" vertRelTo="PARA" horzRelTo="PARA" vertPos="0" horzPos="0" vertOffset="0" horzOffset="0"/>
<hp:outMargin left="0" right="0" top="0" bottom="0"/>
<hp:caption pos="0" gap="850" width="0" height="0" sideMargin="0" fullSz="1"/>`;
        try {
            const rows = table.Rows || [];
            for (const row of rows) {
                tableXml += this._compileTableRow(row);
            }
        }
        catch (error) {
        }
        tableXml += `</hp:tbl>
`;
        return tableXml;
    }
    _compileTableRow(row) {
        let rowXml = `<hp:tr>`;
        for (let i = 0; i < row.CellCount; i++) {
            const cell = row.getCell(i);
            rowXml += this._compileTableCell(cell, i);
        }
        rowXml += `</hp:tr>`;
        return rowXml;
    }
    _compileTableCell(cell, colIndex) {
        let cellXml = `<hp:tc name="" header="0" hasMargin="0" protect="0" editable="0" dirty="0" borderFillIDRef="1">
<hp:cellAddr colAddr="${colIndex}" rowAddr="0"/>
<hp:cellSpan colSpan="1" rowSpan="1"/>
<hp:cellSz width="23815" height="2931" protect="0"/>
<hp:cellMargin left="283" right="283" top="283" bottom="283"/>`;
        for (const child of cell.Children) {
            if (child instanceof Paragraph) {
                cellXml += this._compileParagraph(child);
            }
        }
        cellXml += `</hp:tc>`;
        return cellXml;
    }
    _escapeXmlText(text) {
        if (!text)
            return '';
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }
    _extractPreviewText(document) {
        let text = "";
        try {
            const body = document.Document.Body;
            for (const section of body.Sections) {
                for (const child of section.Children) {
                    if (child instanceof Paragraph) {
                        const children = child.Children || [];
                        for (const run of children) {
                            if (run instanceof TextRun && run.text) {
                                text += run.text + " ";
                            }
                        }
                    }
                }
            }
        }
        catch (error) {
            text = "HWPX 변환 문서";
        }
        return text.trim().substring(0, 1000) || "HWPX 변환 문서";
    }
}
Object.defineProperty(HwpxTemplateCompiler, "EMPTY_TEMPLATE_BASE64", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: ""
});
//# sourceMappingURL=hwpx-template-compiler.js.map