import { Document } from "@file/document";
import { DocumentWrapper } from "@file/document-wrapper";
import { Paragraph } from "@file/paragraph";
import { Table } from "@file/table";
import { File } from "@file/file";

/**
 * HWPX XML 생성 기본 클래스
 */
export class HwpxCompilerBase {
    protected nextElementId = 2147483648; // 실제 패턴
    protected nextCharPrId = 0;
    protected nextParaPrId = 0;
    protected nextBorderFillId = 1;
    
    // 실제 검증된 네임스페이스
    protected readonly namespaces = `xmlns:ha="http://www.hancom.co.kr/hwpml/2011/app" xmlns:hp="http://www.hancom.co.kr/hwpml/2011/paragraph" xmlns:hp10="http://www.hancom.co.kr/hwpml/2016/paragraph" xmlns:hs="http://www.hancom.co.kr/hwpml/2011/section" xmlns:hc="http://www.hancom.co.kr/hwpml/2011/core" xmlns:hh="http://www.hancom.co.kr/hwpml/2011/head" xmlns:hhs="http://www.hancom.co.kr/hwpml/2011/history" xmlns:hm="http://www.hancom.co.kr/hwpml/2011/master-page" xmlns:hpf="http://www.hancom.co.kr/schema/2011/hpf" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf/" xmlns:ooxmlchart="http://www.hancom.co.kr/hwpml/2016/ooxmlchart" xmlns:hwpunitchar="http://www.hancom.co.kr/hwpml/2016/HwpUnitChar" xmlns:epub="http://www.idpf.org/2007/ops" xmlns:config="urn:oasis:names:tc:opendocument:xmlns:config:1.0"`;

    /**
     * Header.xml 컴파일
     */
    public compileHeader(file: File): string {
        const headerXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?><hh:head ${this.namespaces}>
${this._generateDocInfo()}
${this._generateDocumentProperties()}
${this._generateCompatibleDocument()}
${this._generateLayoutCompatibility()}
${this._generateDocData()}
${this._generateForbidden()}
${this._generateFontFaceList(file)}
${this._generateBorderFillList()}
${this._generateCharPrList()}
${this._generateTabPrList()}
${this._generateNumberingList(file)}
${this._generateBulletList()}
${this._generateParaPrList()}
${this._generateStyleList(file)}
${this._generateMemoShapeList()}
${this._generateTrackChangeList()}
${this._generateTrackChangeAuthorList()}
</hh:head>`;
        
        return headerXml;
    }

    /**
     * Section.xml 컴파일
     */
    public compileSection(document: DocumentWrapper): string {
        const sectionXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?><hs:sec ${this.namespaces}>
${this._generateFirstParagraph()}
${this._compileBody(document)}
</hs:sec>`;
        
        return sectionXml;
    }

    protected _generateDocInfo(): string {
        return `<hh:docInfo>
<hh:docSetting TabStop="8000" PageNumType="0" PageStartNum="0" PageStartNumDisp="1" PageNumPos="BOTTOM" TextDir="HORIZONTAL" Gutters="0" WidowOrphan="0" SpellerIgnoreDigit="0" SpellerProcessEnd="1" SpellerUseReplaceList="0" Watermark="0" BorderFlag="ALL" ApplyPageNumType="0" PageNumCtrl="0" MailMergeByBlock="0" MailMergeSort="0" TrackChange="0" TrackChangeOpen="0" LineWrapForLetter="0" OverflowToFootnote="0" HideAnchor="0" EmptyLine="1" Numberig="0" TabAutoExpand="0" BlockFromNonWord="0"/>
</hh:docInfo>`;
    }

    protected _generateDocumentProperties(): string {
        return `<hh:DocumentProperties/>`;
    }

    protected _generateCompatibleDocument(): string {
        return `<hh:CompatibleDocument>
<hh:TargetProgram>HWP2018</hh:TargetProgram>
<hh:MinVersion/>
</hh:CompatibleDocument>`;
    }

    protected _generateLayoutCompatibility(): string {
        return `<hh:LayoutCompatibility>
<hh:LayoutFlag ApplyExtendedCharSpacing="0" ApplyFontWeightToBold="0" UseInnerUnderline="0" FixedUnderlineWidth="0" DoNotApplyDiacSymMarkOfNoneTextPart="0" DoNotAlignWhitespaceOnRight="0" DoNotDrawLastCharWithSpacing="0" DisableGrowShrinkTextToFit="0" TreatQuotationAsLatin="0" DoNotApplyLineBreakAtWordBreakForPuctuation="0" AllowBreakingFontForLargeChar="0" AllowBreakLatinWord="0" AllowWordSuffixBetweenWhiteSpace="0" AllowWordBreakOverflow="0" ApplyMinColumnWidthTo1mm="0" ApplyTabPosBasedOnSegment="0" BreakTabOverLine="0" AdjustMarginFromArabicStyle="0" BreakLatinWordWithinQuotation="0" DrawOverlineOnBottomOfText="0" ApplyBaseCharSpacingOfLetterList="0" ApplyLineHeightPercent="0" DoNotAdjustWordInJustify="0" CheckMaxTextExtentWhenLineBreak="0" UsePrevSpacingAtParaStart="0" TruncateAtLineFeed="0" UnderlineFollowBold="0" DoNotSplitTable="0" LineBreakLikeWord97="0" LineBreakWithNonStrictRule="0" ApplyAtLeastToPercent="0" DisableVerticalCenterOfFolderNameText="0" TreatTimeAsChar="0" UseDailyNewspaperPaperType="0" AllowSpaceOfCharOuterCellInTable="0" ApplyZeroSpacingAtBlankLine="0" ApplyParaBorderToOutside="0"/>
</hh:LayoutCompatibility>`;
    }

    protected _generateDocData(): string {
        return `<hh:DocData>
<hh:VariableDocumentProperty VariableDocumentPropertyCnt="0"/>
</hh:DocData>`;
    }

    protected _generateForbidden(): string {
        return `<hh:refList>
<hh:Forbidden>
<hh:ForbiddenWord>
<hh:beforeProc beforeSpace="1">!%),.:;?]}¢°'\"′″℃〉》」』】〕ぁぃぅぇぉっゃゅょゎ゛゜ゝゞァィゥェォヵㇰヶㇱㇲッㇳㇴㇵㇶㇷㇸㇹㇺャュョヮㇻㇼㇽㇾㇿヷヺ"ヽヾ</hh:beforeProc>
<hh:afterProc afterSpace="1">#$(\\[{£¥'\"〈《「『【〔</hh:afterProc>
<hh:betweenProc koreanLineUnit="10000" otherLineUnit="10000"/>
</hh:ForbiddenWord>
</hh:Forbidden>
</hh:refList>`;
    }

    protected _generateFontFaceList(file: File): string {
        return `<hh:fontfaces itemCnt="7">
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
</hh:fontfaces>`;
    }

    protected _generateBorderFillList(): string {
        return `<hh:borderFillList itemCnt="2">
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
</hh:borderFillList>`;
    }

    protected _generateCharPrList(): string {
        return `<hh:charPrList itemCnt="1">
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
</hh:charPrList>`;
    }

    protected _generateTabPrList(): string {
        return `<hh:tabPrList itemCnt="0"/>`;
    }

    protected _generateNumberingList(file: File): string {
        return `<hh:numberingList itemCnt="0"/>`;
    }

    protected _generateBulletList(): string {
        return `<hh:bulletList itemCnt="0"/>`;
    }

    protected _generateParaPrList(): string {
        return `<hh:paraPrList itemCnt="1">
<hh:paraPr id="0" tabPrIDRef="0" condense="0" fontLineHeight="0" snapToGrid="1" suppressLineNumbers="0" checked="0">
<hh:align horizontal="LEFT" vertical="BASELINE"/>
<hh:heading type="NONE" idRef="0" level="0"/>
<hh:breakSetting breakLatinWord="KEEP_WORD" breakNonLatinWord="KEEP_WORD" widowOrphan="false" keepWithNext="false" keepLines="false" pageBreakBefore="false" lineWrap="BREAK" nonStartCharSet="" nonEndCharSet=""/>
<hh:autoSpacing eAsianEng="false" eAsianNum="false"/>
<hh:margin intent="0" left="0" right="0" prev="0" next="0"/>
<hh:lineSpacing type="PERCENT" value="160" unit=""/>
<hh:border borderFillIDRef="1"/>
</hh:paraPr>
</hh:paraPrList>`;
    }

    protected _generateStyleList(file: File): string {
        return `<hh:styleList itemCnt="0"/>`;
    }

    protected _generateMemoShapeList(): string {
        return `<hh:memoShapeList itemCnt="0"/>`;
    }

    protected _generateTrackChangeList(): string {
        return `<hh:trackChangeList itemCnt="0"/>`;
    }

    protected _generateTrackChangeAuthorList(): string {
        return `<hh:trackChangeAuthorList itemCnt="0"/>`;
    }

    protected _generateFirstParagraph(): string {
        const elementId = this.nextElementId++;
        
        return `<hp:p id="${elementId}" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0"><hp:run charPrIDRef="0"><hp:secPr id="" textDirection="HORIZONTAL" spaceColumns="1134" tabStop="8000" tabStopVal="4000" tabStopUnit="HWPUNIT" outlineShapeIDRef="1" memoShapeIDRef="0" textVerticalWidthHead="0" masterPageCnt="0"><hp:grid lineGrid="0" charGrid="0" wonggojiFormat="0"/><hp:startNum pageStartsOn="BOTH" page="0" pic="0" tbl="0" equation="0"/><hp:visibility hideFirstHeader="0" hideFirstFooter="0" hideFirstMasterPage="0" border="SHOW_ALL" fill="SHOW_ALL" hideFirstPageNum="0" hideFirstEmptyLine="0" showLineNumber="0"/><hp:lineNumberShape restartType="0" countBy="0" distance="0" startNumber="0"/><hp:pagePr landscape="WIDELY" width="59528" height="84186" gutterType="LEFT_ONLY"><hp:margin header="4252" footer="4252" gutter="0" left="8504" right="8504" top="5668" bottom="4252"/></hp:pagePr><hp:footNotePr><hp:autoNumFormat type="DIGIT" userChar="" prefixChar="" suffixChar=")" supscript="0"/><hp:noteLine length="-1" type="SOLID" width="0.12 mm" color="#000000"/><hp:noteSpacing betweenNotes="283" belowLine="567" aboveLine="850"/><hp:numbering type="CONTINUOUS" newNum="1"/><hp:placement place="EACH_COLUMN" beneathText="0"/></hp:footNotePr><hp:endNotePr><hp:autoNumFormat type="DIGIT" userChar="" prefixChar="" suffixChar=")" supscript="0"/><hp:noteLine length="14692344" type="SOLID" width="0.12 mm" color="#000000"/><hp:noteSpacing betweenNotes="0" belowLine="567" aboveLine="850"/><hp:numbering type="CONTINUOUS" newNum="1"/><hp:placement place="END_OF_DOCUMENT" beneathText="0"/></hp:endNotePr><hp:pageBorderFill type="BOTH" borderFillIDRef="1" textBorder="PAPER" headerInside="0" footerInside="0" fillArea="PAPER"><hp:offset left="1417" right="1417" top="1417" bottom="1417"/></hp:pageBorderFill><hp:pageBorderFill type="EVEN" borderFillIDRef="1" textBorder="PAPER" headerInside="0" footerInside="0" fillArea="PAPER"><hp:offset left="1417" right="1417" top="1417" bottom="1417"/></hp:pageBorderFill><hp:pageBorderFill type="ODD" borderFillIDRef="1" textBorder="PAPER" headerInside="0" footerInside="0" fillArea="PAPER"><hp:offset left="1417" right="1417" top="1417" bottom="1417"/></hp:pageBorderFill></hp:secPr><hp:ctrl><hp:colPr id="" type="NEWSPAPER" layout="LEFT" colCount="1" sameSz="1" sameGap="0"/></hp:ctrl></hp:run><hp:run charPrIDRef="0"><hp:ctrl><hp:bookmark name="isPasted"/></hp:ctrl><hp:t></hp:t></hp:run><hp:linesegarray><hp:lineseg textpos="0" vertpos="0" vertsize="2400" textheight="2400" baseline="2040" spacing="480" horzpos="0" horzsize="42520" flags="393216"/></hp:linesegarray></hp:p>
`;
    }

    protected _compileBody(documentWrapper: DocumentWrapper): string {
        let xml = "";
        
        // Body의 각 요소 변환
        const document = documentWrapper.View;
        const body = document.Body;
        for (const child of body["root"]) {
            if (child instanceof Paragraph) {
                xml += this._compileParagraph(child);
            } else if (child instanceof Table) {
                xml += this._compileTable(child);
            }
        }
        
        return xml;
    }

    protected _compileParagraph(paragraph: Paragraph): string {
        const elementId = this.nextElementId++;
        
        // TODO: 실제 paragraph 속성 변환
        const runXml = '<hp:run charPrIDRef="0"><hp:t>텍스트</hp:t></hp:run>';
        const linesegArray = `<hp:linesegarray><hp:lineseg textpos="0" vertpos="0" vertsize="2400" textheight="2400" baseline="2040" spacing="480" horzpos="0" horzsize="42520" flags="393216"/></hp:linesegarray>`;
        
        return `<hp:p id="${elementId}" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0">${runXml}${linesegArray}</hp:p>
`;
    }

    protected _compileTable(table: Table): string {
        const tableId = this.nextElementId++;
        
        // TODO: 실제 table 변환
        return `<hp:tbl id="${tableId}" zOrder="0" numberingType="TABLE" textWrap="TOP_AND_BOTTOM" textFlow="BOTH_SIDES" lock="0" dropcapstyle="None" pageBreak="CELL" repeatHeader="1" rowCnt="1" colCnt="1" cellSpacing="0" borderFillIDRef="2" noAdjust="0">
<hp:sz width="47630" widthRelTo="ABSOLUTE" height="2931" heightRelTo="ABSOLUTE" protect="0"/>
<hp:pos treatAsChar="1" affectLSpacing="0" flowWithText="1" allowOverlap="0" holdAnchorAndSO="0" vertRelTo="PARA" horzRelTo="PARA" vertPos="0" horzPos="0" vertOffset="0" horzOffset="0"/>
<hp:outMargin left="0" right="0" top="0" bottom="0"/>
<hp:caption pos="0" gap="850" width="0" height="0" sideMargin="0" fullSz="1"/>
</hp:tbl>
`;
    }

    protected _generateSettings(): string {
        return `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
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
    }

    protected _extractPreviewText(document: DocumentWrapper): string {
        let text = "";
        // TODO: 실제 텍스트 추출 구현
        text = "HWPX 변환 문서";
        
        return text.substring(0, 1000);
    }
}
