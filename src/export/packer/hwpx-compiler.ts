import JSZip from "jszip";
import xml from "xml";

import { File } from "@file/file";
import { obfuscate } from "@file/fonts/obfuscate-ttf-to-odttf";

import { Formatter } from "../formatter";
import { ImageReplacer } from "./image-replacer";
import { NumberingReplacer } from "./numbering-replacer";
import { PrettifyType } from "./packer";

export type IXmlifyedFile = {
    readonly data: string;
    readonly path: string;
};

export type IXmlifyedFileMapping = {
    readonly Document: IXmlifyedFile;
    readonly Styles: IXmlifyedFile;
    readonly Properties: IXmlifyedFile;
    readonly Numbering: IXmlifyedFile;
    readonly Relationships: IXmlifyedFile;
    readonly FileRelationships: IXmlifyedFile;
    readonly Headers: readonly IXmlifyedFile[];
    readonly Footers: readonly IXmlifyedFile[];
    readonly HeaderRelationships: readonly IXmlifyedFile[];
    readonly FooterRelationships: readonly IXmlifyedFile[];
    readonly ContentTypes: IXmlifyedFile;
    readonly CustomProperties: IXmlifyedFile;
    readonly AppProperties: IXmlifyedFile;
    readonly FootNotes: IXmlifyedFile;
    readonly FootNotesRelationships: IXmlifyedFile;
    readonly Settings: IXmlifyedFile;
    readonly Comments?: IXmlifyedFile;
    readonly CommentsRelationships?: IXmlifyedFile;
    readonly FontTable?: IXmlifyedFile;
    readonly FontTableRelationships?: IXmlifyedFile;
};

/**
 * 템플릿 기반 HWPX 컴파일러
 */
export class HwpxCompiler {
    private readonly nextElementId = 2147483648;
    private readonly nextCharPrId = 0;
    private readonly nextParaPrId = 0;
    private readonly nextBorderFillId = 1;

    // 스타일 저장소
    private readonly charPrStyles = new Map();
    private readonly paraPrStyles = new Map();
    private readonly borderFillStyles = new Map();

    private readonly namespaces = `xmlns:ha="http://www.hancom.co.kr/hwpml/2011/app" xmlns:hp="http://www.hancom.co.kr/hwpml/2011/paragraph" xmlns:hp10="http://www.hancom.co.kr/hwpml/2016/paragraph" xmlns:hs="http://www.hancom.co.kr/hwpml/2011/section" xmlns:hc="http://www.hancom.co.kr/hwpml/2011/core" xmlns:hh="http://www.hancom.co.kr/hwpml/2011/head" xmlns:hhs="http://www.hancom.co.kr/hwpml/2011/history" xmlns:hm="http://www.hancom.co.kr/hwpml/2011/master-page" xmlns:hpf="http://www.hancom.co.kr/schema/2011/hpf" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf/" xmlns:ooxmlchart="http://www.hancom.co.kr/hwpml/2016/ooxmlchart" xmlns:hwpunitchar="http://www.hancom.co.kr/hwpml/2016/HwpUnitChar" xmlns:epub="http://www.idpf.org/2007/ops" xmlns:config="urn:oasis:names:tc:opendocument:xmlns:config:1.0"`;

    // 템플릿 데이터를 Base64로 인코딩하여 저장
    private static readonly EMPTY_TEMPLATE_BASE64 = ""; // 나중에 실제 데이터로 교체

    constructor() {
        this._initializeStyles();
    }

    /**
     * 템플릿 기반 HWPX 컴파일
     */
    public compile(
        file: File,
        _prettifyType?: (typeof PrettifyType)[keyof typeof PrettifyType],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _overrides: readonly IXmlifyedFile[] = [],
    ): JSZip {
        // 항상 기본 구조로 생성 (fs 모듈 사용 안 함)
        return this.compileFromScratch(file);
    }

    /**
     * 템플릿 없이 처음부터 생성
     */
    public compileFromScratch(file: File): JSZip {
        const zip = new JSZip();

        // 1. mimetype (압축하지 않음)
        zip.file("mimetype", "application/hwp+zip", { compression: "STORE" });

        // 2. version.xml
        zip.file(
            "version.xml",
            `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<hv:HCFVersion xmlns:hv="http://www.hancom.co.kr/hwpml/2011/version" targetApplication="WORDPROCESSOR" major="5" minor="1" micro="1" buildNumber="0" os="10" xmlVersion="1.5" application="Hancom Office Hangul" appVersion="12.30.0.5708"/>`,
        );

        // 3. META-INF/container.xml
        zip.folder("META-INF")!.file(
            "container.xml",
            `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<container xmlns="urn:oasis:names:tc:opendocument:xmlns:container" version="1.0">
    <rootfiles>
        <rootfile full-path="Contents/content.hpf" media-type="application/hwp+zip"/>
    </rootfiles>
</container>`,
        );

        // 4. META-INF/manifest.xml
        zip.folder("META-INF")!.file(
            "manifest.xml",
            `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0">
    <manifest:file-entry manifest:media-type="application/hwp+zip" manifest:full-path="/"/>
    <manifest:file-entry manifest:media-type="application/xml" manifest:full-path="version.xml"/>
    <manifest:file-entry manifest:media-type="application/xml" manifest:full-path="settings.xml"/>
    <manifest:file-entry manifest:media-type="application/xml" manifest:full-path="Contents/content.hpf"/>
    <manifest:file-entry manifest:media-type="application/xml" manifest:full-path="Contents/header.xml"/>
    <manifest:file-entry manifest:media-type="application/xml" manifest:full-path="Contents/section0.xml"/>
</manifest:manifest>`,
        );

        // 5. META-INF/container.rdf
        zip.folder("META-INF")!.file(
            "container.rdf",
            `<?xml version="1.0" encoding="UTF-8"?>
<RDF:RDF xmlns:RDF="http://www.w3.org/1999/02/22-rdf-syntax-ns#"/>`,
        );

        // 6. Contents/content.hpf
        zip.folder("Contents")!.file(
            "content.hpf",
            `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<hpf:contents xmlns:hpf="http://www.hancom.co.kr/schema/2011/hpf">
<hpf:header>header.xml</hpf:header>
<hpf:section src="section0.xml"/>
</hpf:contents>`,
        );

        // 7. Contents/header.xml
        const headerXml = this._generateHeader(file);
        zip.folder("Contents")!.file("header.xml", headerXml);

        // 8. Contents/section0.xml
        const sectionXml = this._generateSection(file.Document);
        zip.folder("Contents")!.file("section0.xml", sectionXml);

        // 9. settings.xml
        zip.file("settings.xml", this._generateSettings());

        // 10. Preview/PrvText.txt
        const previewText = this._extractPreviewText(file.Document);
        zip.folder("Preview")!.file("PrvText.txt", previewText);

        // 11. 이미지 처리
        for (const imageData of file.Media.Array) {
            zip.folder("Contents")!.folder("Bindata")!.file(imageData.fileName, imageData.data);
        }

        return zip;
    }

    private _initializeStyles(): void {
        // 기본 문자 스타일
        this.charPrStyles.set("default", {
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
</hh:charPr>`,
        });

        // 기본 문단 스타일
        this.paraPrStyles.set("default", {
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
</hh:paraPr>`,
        });

        // 기본 테두리 스타일
        this.borderFillStyles.set("default", {
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
</hh:borderFill>`,
        });

        // 투명 테두리
        this.borderFillStyles.set("transparent", {
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
</hh:borderFill>`,
        });
    }

    private _generateHeader(_file: File): string {
        const charPrs = Array.from(this.charPrStyles.values())
            .map((style) => style.xml)
            .join("\n");
        const paraPrs = Array.from(this.paraPrStyles.values())
            .map((style) => style.xml)
            .join("\n");
        const borderFills = Array.from(this.borderFillStyles.values())
            .map((style) => style.xml)
            .join("\n");

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

    private _generateSection(document: any): string {
        // hs:sec 네임스페이스 사용 (이미 this.namespaces에 포함됨)
        return `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<hs:sec ${this.namespaces} id="0" textDirection="HORIZONTAL" spaceColumns="1" columnGap="4252">
${this._compileBody(document)}
</hs:sec>`;
    }

    private _generateFirstParagraph(): string {
        const elementId = this.nextElementId++;
        return `<hp:p id="${elementId}" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0"><hp:run charPrIDRef="0"><hp:secPr id="" textDirection="HORIZONTAL" spaceColumns="1134" tabStop="8000" tabStopVal="4000" tabStopUnit="HWPUNIT" outlineShapeIDRef="1" memoShapeIDRef="0" textVerticalWidthHead="0" masterPageCnt="0"><hp:grid lineGrid="0" charGrid="0" wonggojiFormat="0"/><hp:startNum pageStartsOn="BOTH" page="0" pic="0" tbl="0" equation="0"/><hp:visibility hideFirstHeader="0" hideFirstFooter="0" hideFirstMasterPage="0" border="SHOW_ALL" fill="SHOW_ALL" hideFirstPageNum="0" hideFirstEmptyLine="0" showLineNumber="0"/><hp:lineNumberShape restartType="0" countBy="0" distance="0" startNumber="0"/><hp:pagePr landscape="WIDELY" width="59528" height="84186" gutterType="LEFT_ONLY"><hp:margin header="4252" footer="4252" gutter="0" left="8504" right="8504" top="5668" bottom="4252"/></hp:pagePr><hp:footNotePr><hp:autoNumFormat type="DIGIT" userChar="" prefixChar="" suffixChar=")" supscript="0"/><hp:noteLine length="-1" type="SOLID" width="0.12 mm" color="#000000"/><hp:noteSpacing betweenNotes="283" belowLine="567" aboveLine="850"/><hp:numbering type="CONTINUOUS" newNum="1"/><hp:placement place="EACH_COLUMN" beneathText="0"/></hp:footNotePr><hp:endNotePr><hp:autoNumFormat type="DIGIT" userChar="" prefixChar="" suffixChar=")" supscript="0"/><hp:noteLine length="14692344" type="SOLID" width="0.12 mm" color="#000000"/><hp:noteSpacing betweenNotes="0" belowLine="567" aboveLine="850"/><hp:numbering type="CONTINUOUS" newNum="1"/><hp:placement place="END_OF_DOCUMENT" beneathText="0"/></hp:endNotePr><hp:pageBorderFill type="BOTH" borderFillIDRef="1" textBorder="PAPER" headerInside="0" footerInside="0" fillArea="PAPER"><hp:offset left="1417" right="1417" top="1417" bottom="1417"/></hp:pageBorderFill><hp:pageBorderFill type="EVEN" borderFillIDRef="1" textBorder="PAPER" headerInside="0" footerInside="0" fillArea="PAPER"><hp:offset left="1417" right="1417" top="1417" bottom="1417"/></hp:pageBorderFill><hp:pageBorderFill type="ODD" borderFillIDRef="1" textBorder="PAPER" headerInside="0" footerInside="0" fillArea="PAPER"><hp:offset left="1417" right="1417" top="1417" bottom="1417"/></hp:pageBorderFill></hp:secPr><hp:ctrl><hp:colPr id="" type="NEWSPAPER" layout="LEFT" colCount="1" sameSz="1" sameGap="0"/></hp:ctrl></hp:run><hp:run charPrIDRef="0"><hp:ctrl><hp:bookmark name="isPasted"/></hp:ctrl><hp:t></hp:t></hp:run><hp:linesegarray><hp:lineseg textpos="0" vertpos="0" vertsize="2400" textheight="2400" baseline="2040" spacing="480" horzpos="0" horzsize="42520" flags="393216"/></hp:linesegarray></hp:p>
`;
    }

    private _generateSettings(): string {
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

    private _compileBody(documentWrapper: any): string {
        let xml = "";
        let isFirstParagraph = true;

        try {
            // DocumentWrapper에서 document 추출
            const document = documentWrapper.document || documentWrapper;

            // document의 root 배열에서 섹션 찾기
            if (document && document.root && Array.isArray(document.root)) {
                // hs:sec 섹션 찾기
                const section = document.root.find((item: any) => item?.rootKey === "hs:sec");

                if (section && section.root && Array.isArray(section.root)) {
                    // 섹션 내의 문단들 처리
                    for (const child of section.root) {
                        if (child?.rootKey === "hp:p") {
                            if (isFirstParagraph) {
                                xml += this._compileParagraphWithSection(child);
                                isFirstParagraph = false;
                            } else {
                                xml += this._compileParagraph(child);
                            }
                        } else if (child?.rootKey === "hp:tbl") {
                            xml += this._compileTable(child);
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Body compilation error:", error);
            // 에러 시 섹션 속성이 포함된 기본 문단 생성
            xml = this._generateFirstParagraph();
        }

        // 만약 내용이 없으면 섹션 속성이 포함된 기본 문단 추가
        if (!xml) {
            xml = this._generateFirstParagraph();
        }

        return xml;
    }

    private _compileParagraphWithSection(paragraph: any): string {
        const elementId = 0; // 첫 번째 문단은 항상 ID 0

        let runXml = "";

        // 섹션 속성 run 추가
        runXml += `<hp:run charPrIDRef="0">
<hp:secPr id="" textDirection="HORIZONTAL" spaceColumns="1134" tabStop="8000" tabStopVal="4000" tabStopUnit="HWPUNIT" outlineShapeIDRef="1" memoShapeIDRef="0" textVerticalWidthHead="0" masterPageCnt="0">
<hp:grid lineGrid="0" charGrid="0" wonggojiFormat="0"/>
<hp:startNum pageStartsOn="BOTH" page="0" pic="0" tbl="0" equation="0"/>
<hp:visibility hideFirstHeader="0" hideFirstFooter="0" hideFirstMasterPage="0" border="SHOW_ALL" fill="SHOW_ALL" hideFirstPageNum="0" hideFirstEmptyLine="0" showLineNumber="0"/>
<hp:lineNumberShape restartType="0" countBy="0" distance="0" startNumber="0"/>
<hp:pagePr landscape="WIDELY" width="59528" height="84186" gutterType="LEFT_ONLY">
<hp:margin header="4252" footer="4252" gutter="0" left="8504" right="8504" top="5668" bottom="4252"/>
</hp:pagePr>
<hp:footNotePr>
<hp:autoNumFormat type="DIGIT" userChar="" prefixChar="" suffixChar=")" supscript="0"/>
<hp:noteLine length="-1" type="SOLID" width="0.12 mm" color="#000000"/>
<hp:noteSpacing betweenNotes="283" belowLine="567" aboveLine="850"/>
<hp:numbering type="CONTINUOUS" newNum="1"/>
<hp:placement place="EACH_COLUMN" beneathText="0"/>
</hp:footNotePr>
<hp:endNotePr>
<hp:autoNumFormat type="DIGIT" userChar="" prefixChar="" suffixChar=")" supscript="0"/>
<hp:noteLine length="14692344" type="SOLID" width="0.12 mm" color="#000000"/>
<hp:noteSpacing betweenNotes="0" belowLine="567" aboveLine="850"/>
<hp:numbering type="CONTINUOUS" newNum="1"/>
<hp:placement place="END_OF_DOCUMENT" beneathText="0"/>
</hp:endNotePr>
<hp:pageBorderFill type="BOTH" borderFillIDRef="1" textBorder="PAPER" headerInside="0" footerInside="0" fillArea="PAPER">
<hp:offset left="1417" right="1417" top="1417" bottom="1417"/>
</hp:pageBorderFill>
<hp:pageBorderFill type="EVEN" borderFillIDRef="1" textBorder="PAPER" headerInside="0" footerInside="0" fillArea="PAPER">
<hp:offset left="1417" right="1417" top="1417" bottom="1417"/>
</hp:pageBorderFill>
<hp:pageBorderFill type="ODD" borderFillIDRef="1" textBorder="PAPER" headerInside="0" footerInside="0" fillArea="PAPER">
<hp:offset left="1417" right="1417" top="1417" bottom="1417"/>
</hp:pageBorderFill>
</hp:secPr>
<hp:ctrl>
<hp:colPr id="" type="NEWSPAPER" layout="LEFT" colCount="1" sameSz="1" sameGap="0"/>
</hp:ctrl>
</hp:run>`;

        try {
            // Paragraph의 root 구조에서 TextRun 찾기
            const paragraphRoot = (paragraph as any).root || [];
            for (const child of paragraphRoot) {
                // TextRun 처리 - rootKey가 'hp:run'인 경우
                if (child?.rootKey === "hp:run") {
                    const textRunRoot = (child as any).root;
                    let runContent = "";

                    if (textRunRoot && Array.isArray(textRunRoot)) {
                        for (const runChild of textRunRoot) {
                            // Tab 요소 처리 (rootKey가 'hp:tab'인 경우)
                            if (runChild?.rootKey === "hp:tab") {
                                runContent += "<hp:tab/>";
                            }
                            // Text 요소 찾기 (rootKey가 'hp:t'인 경우)
                            else if (runChild?.rootKey === "hp:t") {
                                const textRoot = (runChild as any).root;
                                if (textRoot && Array.isArray(textRoot)) {
                                    // root 배열의 문자열 요소 찾기 (보통 두 번째 요소)
                                    for (const element of textRoot) {
                                        if (typeof element === "string") {
                                            const escapedText = this._escapeXmlText(element);
                                            runContent += `<hp:t>${escapedText}</hp:t>`;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (runContent) {
                        runXml += `<hp:run charPrIDRef="0">${runContent}</hp:run>`;
                    }
                }
            }
        } catch (error) {
            console.error("Paragraph processing error:", error);
        }

        // 빈 내용인 경우 기본 run 생성
        if (!runXml.includes("<hp:t>")) {
            runXml += '<hp:run charPrIDRef="0"><hp:t></hp:t></hp:run>';
        }

        const linesegArray = `<hp:linesegarray><hp:lineseg textpos="0" vertpos="0" vertsize="1200" textheight="1200" baseline="1020" spacing="720" horzpos="0" horzsize="45352" flags="393216"/></hp:linesegarray>`;

        return `<hp:p id="${elementId}" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0">${runXml}${linesegArray}</hp:p>
`;
    }

    private _compileParagraph(paragraph: any): string {
        const elementId = this.nextElementId++;
        const paraPrId = 0; // 기본값

        let runXml = "";

        try {
            // Paragraph의 root 배열에서 TextRun 찾기
            const paragraphRoot = (paragraph as any).root || [];

            for (const child of paragraphRoot) {
                // TextRun 처리 - rootKey가 'hp:run'인 경우
                if (child?.rootKey === "hp:run") {
                    const textRunRoot = (child as any).root;
                    let runContent = "";

                    if (textRunRoot && Array.isArray(textRunRoot)) {
                        for (const runChild of textRunRoot) {
                            // Tab 요소 처리 (rootKey가 'hp:tab'인 경우)
                            if (runChild?.rootKey === "hp:tab") {
                                runContent += "<hp:tab/>";
                            }
                            // Text 요소 찾기 (rootKey가 'hp:t'인 경우)
                            else if (runChild?.rootKey === "hp:t") {
                                const textRoot = (runChild as any).root;
                                if (textRoot && Array.isArray(textRoot)) {
                                    // root 배열의 문자열 요소 찾기 (보통 두 번째 요소)
                                    for (const element of textRoot) {
                                        if (typeof element === "string") {
                                            const escapedText = this._escapeXmlText(element);
                                            runContent += `<hp:t>${escapedText}</hp:t>`;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (runContent) {
                        runXml += `<hp:run charPrIDRef="0">${runContent}</hp:run>`;
                    }
                }
            }
        } catch (error) {
            console.error("Paragraph processing error:", error);
        }

        // 빈 내용인 경우 기본 run 생성
        if (!runXml.trim()) {
            runXml = '<hp:run charPrIDRef="0"><hp:t> </hp:t></hp:run>';
        }

        // 실제 linesegarray 패턴
        const linesegArray = `<hp:linesegarray><hp:lineseg textpos="0" vertpos="0" vertsize="1200" textheight="1200" baseline="1020" spacing="720" horzpos="0" horzsize="45352" flags="393216"/></hp:linesegarray>`;

        return `<hp:p id="${elementId}" paraPrIDRef="${paraPrId}" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0">${runXml}${linesegArray}</hp:p>
`;
    }

    private _compileTable(table: Table): string {
        const tableId = this.nextElementId++;

        const rowCount = (table as any).RowCount || 1;
        const colCount = (table as any).ColumnCount || 1;

        // 실제 테이블 크기 패턴
        const tableWidth = 47630;
        const tableHeight = 2931;

        let tableXml = `<hp:tbl id="${tableId}" zOrder="0" numberingType="TABLE" textWrap="TOP_AND_BOTTOM" textFlow="BOTH_SIDES" lock="0" dropcapstyle="None" pageBreak="CELL" repeatHeader="1" rowCnt="${rowCount}" colCnt="${colCount}" cellSpacing="0" borderFillIDRef="1" noAdjust="0">
<hp:sz width="${tableWidth}" widthRelTo="ABSOLUTE" height="${tableHeight}" heightRelTo="ABSOLUTE" protect="0"/>
<hp:pos treatAsChar="1" affectLSpacing="0" flowWithText="1" allowOverlap="0" holdAnchorAndSO="0" vertRelTo="PARA" horzRelTo="PARA" vertPos="0" horzPos="0" vertOffset="0" horzOffset="0"/>
<hp:outMargin left="0" right="0" top="0" bottom="0"/>
<hp:caption pos="0" gap="850" width="0" height="0" sideMargin="0" fullSz="1"/>`;

        try {
            // 테이블 행들 변환
            const rows = (table as any).Rows || [];
            for (const row of rows) {
                tableXml += this._compileTableRow(row);
            }
        } catch (error) {
            // 에러 시 빈 행 추가
        }

        tableXml += `</hp:tbl>
`;

        return tableXml;
    }

    private _compileTableRow(row: any): string {
        let rowXml = `<hp:tr>`;

        for (let i = 0; i < row.CellCount; i++) {
            const cell = row.getCell(i);
            rowXml += this._compileTableCell(cell, i);
        }

        rowXml += `</hp:tr>`;
        return rowXml;
    }

    private _compileTableCell(cell: any, colIndex: number): string {
        let cellXml = `<hp:tc name="" header="0" hasMargin="0" protect="0" editable="0" dirty="0" borderFillIDRef="1">
<hp:cellAddr colAddr="${colIndex}" rowAddr="0"/>
<hp:cellSpan colSpan="1" rowSpan="1"/>
<hp:cellSz width="23815" height="2931" protect="0"/>
<hp:cellMargin left="283" right="283" top="283" bottom="283"/>`;

        // 셀 내부 문단들 처리
        for (const child of cell.Children) {
            if (child instanceof Paragraph) {
                cellXml += this._compileParagraph(child);
            }
        }

        cellXml += `</hp:tc>`;
        return cellXml;
    }

    private _escapeXmlText(text: string): string {
        if (!text) {return "";}

        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
    }

    private _extractPreviewText(documentWrapper: any): string {
        let text = "";

        try {
            // DocumentWrapper에서 document 추출
            const document = documentWrapper.document || documentWrapper;

            // document의 root 배열에서 섹션 찾기
            if (document && document.root && Array.isArray(document.root)) {
                // hs:sec 섹션 찾기
                const section = document.root.find((item: any) => item?.rootKey === "hs:sec");

                if (section && section.root && Array.isArray(section.root)) {
                    // 섹션 내의 문단들 처리
                    for (const paragraph of section.root) {
                        if (paragraph?.rootKey === "hp:p") {
                            const paragraphRoot = paragraph.root || [];

                            for (const child of paragraphRoot) {
                                // TextRun 처리 - rootKey가 'hp:run'인 경우
                                if (child?.rootKey === "hp:run") {
                                    const textRunRoot = child.root;

                                    if (textRunRoot && Array.isArray(textRunRoot)) {
                                        for (const runChild of textRunRoot) {
                                            // Tab 요소 처리 (rootKey가 'hp:tab'인 경우)
                                            if (runChild?.rootKey === "hp:tab") {
                                                text += "\t";
                                            }
                                            // Text 요소 찾기 (rootKey가 'hp:t'인 경우)
                                            else if (runChild?.rootKey === "hp:t") {
                                                const textRoot = runChild.root;
                                                if (textRoot && Array.isArray(textRoot)) {
                                                    // root 배열의 문자열 요소 찾기
                                                    for (const element of textRoot) {
                                                        if (typeof element === "string") {
                                                            text += `${element  } `;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Preview text extraction error:", error);
            // 에러 시 기본 텍스트
            text = "HWPX 변환 문서";
        }

        return text.trim().substring(0, 1000) || "HWPX 변환 문서";
    }
}
