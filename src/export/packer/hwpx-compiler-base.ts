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

    // 실제 빈도 기반 스타일 저장소
    protected charPrStyles = new Map();
    protected paraPrStyles = new Map();
    protected borderFillStyles = new Map();

    // 실제 검증된 네임스페이스
    protected readonly namespaces = `xmlns:ha="http://www.hancom.co.kr/hwpml/2011/app" xmlns:hp="http://www.hancom.co.kr/hwpml/2011/paragraph" xmlns:hp10="http://www.hancom.co.kr/hwpml/2016/paragraph" xmlns:hs="http://www.hancom.co.kr/hwpml/2011/section" xmlns:hc="http://www.hancom.co.kr/hwpml/2011/core" xmlns:hh="http://www.hancom.co.kr/hwpml/2011/head" xmlns:hhs="http://www.hancom.co.kr/hwpml/2011/history" xmlns:hm="http://www.hancom.co.kr/hwpml/2011/master-page" xmlns:hpf="http://www.hancom.co.kr/schema/2011/hpf" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf/" xmlns:ooxmlchart="http://www.hancom.co.kr/hwpml/2016/ooxmlchart" xmlns:hwpunitchar="http://www.hancom.co.kr/hwpml/2016/HwpUnitChar" xmlns:epub="http://www.idpf.org/2007/ops" xmlns:config="urn:oasis:names:tc:opendocument:xmlns:config:1.0"`;

    constructor() {
        this._initializeStyles();
    }

    /**
     * 스타일 초기화 (document_element_to_hwpx_service.js 기반)
     */
    protected _initializeStyles(): void {
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

        // 투명 테두리 (borderFillIDRef="2")
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
${this._generateOutlineShapeList()}
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

    protected _generateFontFaceList(_file: File): string {
        // 실제 HWPX 패턴 기반 폰트 목록
        return `<hh:fontFaceList itemCnt="4">
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
</hh:fontFaceList>`;
    }

    protected _generateBorderFillList(): string {
        const borderFills = Array.from(this.borderFillStyles.values())
            .map((style) => style.xml)
            .join("\n");
        return `<hh:borderFillList itemCnt="${this.borderFillStyles.size}">
${borderFills}
</hh:borderFillList>`;
    }

    protected _generateCharPrList(): string {
        const charPrs = Array.from(this.charPrStyles.values())
            .map((style) => style.xml)
            .join("\n");
        return `<hh:charPrList itemCnt="${this.charPrStyles.size}">
${charPrs}
</hh:charPrList>`;
    }

    protected _generateTabPrList(): string {
        return `<hh:tabPrList itemCnt="0"/>`;
    }

    protected _generateNumberingList(_file: File): string {
        return `<hh:numberingList itemCnt="0"/>`;
    }

    protected _generateBulletList(): string {
        return `<hh:bulletList itemCnt="0"/>`;
    }

    protected _generateParaPrList(): string {
        const paraPrs = Array.from(this.paraPrStyles.values())
            .map((style) => style.xml)
            .join("\n");
        return `<hh:paraPrList itemCnt="${this.paraPrStyles.size}">
${paraPrs}
</hh:paraPrList>`;
    }

    protected _generateStyleList(_file: File): string {
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

    protected _generateOutlineShapeList(): string {
        return `<hm:outlineShapeList itemCnt="1">
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
</hm:outlineShapeList>`;
    }

    protected _generateFirstParagraph(): string {
        const elementId = this.nextElementId++;

        return `<hp:p id="${elementId}" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0"><hp:run charPrIDRef="0"><hp:secPr id="" textDirection="HORIZONTAL" spaceColumns="1134" tabStop="8000" tabStopVal="4000" tabStopUnit="HWPUNIT" outlineShapeIDRef="1" memoShapeIDRef="0" textVerticalWidthHead="0" masterPageCnt="0"><hp:grid lineGrid="0" charGrid="0" wonggojiFormat="0"/><hp:startNum pageStartsOn="BOTH" page="0" pic="0" tbl="0" equation="0"/><hp:visibility hideFirstHeader="0" hideFirstFooter="0" hideFirstMasterPage="0" border="SHOW_ALL" fill="SHOW_ALL" hideFirstPageNum="0" hideFirstEmptyLine="0" showLineNumber="0"/><hp:lineNumberShape restartType="0" countBy="0" distance="0" startNumber="0"/><hp:pagePr landscape="WIDELY" width="59528" height="84186" gutterType="LEFT_ONLY"><hp:margin header="4252" footer="4252" gutter="0" left="8504" right="8504" top="5668" bottom="4252"/></hp:pagePr><hp:footNotePr><hp:autoNumFormat type="DIGIT" userChar="" prefixChar="" suffixChar=")" supscript="0"/><hp:noteLine length="-1" type="SOLID" width="0.12 mm" color="#000000"/><hp:noteSpacing betweenNotes="283" belowLine="567" aboveLine="850"/><hp:numbering type="CONTINUOUS" newNum="1"/><hp:placement place="EACH_COLUMN" beneathText="0"/></hp:footNotePr><hp:endNotePr><hp:autoNumFormat type="DIGIT" userChar="" prefixChar="" suffixChar=")" supscript="0"/><hp:noteLine length="14692344" type="SOLID" width="0.12 mm" color="#000000"/><hp:noteSpacing betweenNotes="0" belowLine="567" aboveLine="850"/><hp:numbering type="CONTINUOUS" newNum="1"/><hp:placement place="END_OF_DOCUMENT" beneathText="0"/></hp:endNotePr><hp:pageBorderFill type="BOTH" borderFillIDRef="1" textBorder="PAPER" headerInside="0" footerInside="0" fillArea="PAPER"><hp:offset left="1417" right="1417" top="1417" bottom="1417"/></hp:pageBorderFill><hp:pageBorderFill type="EVEN" borderFillIDRef="1" textBorder="PAPER" headerInside="0" footerInside="0" fillArea="PAPER"><hp:offset left="1417" right="1417" top="1417" bottom="1417"/></hp:pageBorderFill><hp:pageBorderFill type="ODD" borderFillIDRef="1" textBorder="PAPER" headerInside="0" footerInside="0" fillArea="PAPER"><hp:offset left="1417" right="1417" top="1417" bottom="1417"/></hp:pageBorderFill></hp:secPr><hp:ctrl><hp:colPr id="" type="NEWSPAPER" layout="LEFT" colCount="1" sameSz="1" sameGap="0"/></hp:ctrl></hp:run><hp:run charPrIDRef="0"><hp:ctrl><hp:bookmark name="isPasted"/></hp:ctrl><hp:t></hp:t></hp:run><hp:linesegarray><hp:lineseg textpos="0" vertpos="0" vertsize="2400" textheight="2400" baseline="2040" spacing="480" horzpos="0" horzsize="42520" flags="393216"/></hp:linesegarray></hp:p>
`;
    }

    protected _compileBody(documentWrapper: DocumentWrapper): string {
        let xml = "";

        // DocumentWrapper.View.Body의 root에서 직접 접근
        const body = documentWrapper.View.Body;
        const bodyRoot = (body as any).root;

        if (bodyRoot && Array.isArray(bodyRoot)) {
            for (const child of bodyRoot) {
                if (child instanceof Paragraph) {
                    xml += this._compileParagraph(child);
                } else if (child instanceof Table) {
                    xml += this._compileTable(child);
                }
            }
        }

        // 만약 내용이 없으면 기본 문단 추가
        if (!xml) {
            xml = this._generateFirstParagraph();
        }

        return xml;
    }

    protected _compileParagraph(paragraph: Paragraph): string {
        const elementId = this.nextElementId++;

        // 정렬에 따른 스타일 ID 결정
        let paraPrId = 0; // 기본값

        let runXml = "";

        // Paragraph의 root 접근
        const paragraphRoot = (paragraph as any).root;

        console.log("Paragraph root:", paragraphRoot?.length, "elements");

        if (paragraphRoot && Array.isArray(paragraphRoot)) {
            for (const child of paragraphRoot) {
                // TextRun 또는 Run 처리
                console.log("Paragraph child:", child?.constructor?.name, child?.rootKey);

                // TextRun은 rootKey가 'w:r' 또는 'hp:run'일 수 있음
                if (child?.rootKey === "w:r" || child?.constructor?.name === "TextRun" || child?.constructor?.name === "Run") {
                    // TextRun의 텍스트 추출
                    const textRunRoot = (child as any).root;
                    let text = "";

                    if (textRunRoot && Array.isArray(textRunRoot)) {
                        for (const runChild of textRunRoot) {
                            // Text 요소 찾기 (rootKey가 'w:t' 또는 직접 텍스트)
                            if (runChild?.rootKey === "w:t" || runChild?.constructor?.name === "Text") {
                                const textRoot = (runChild as any).root;
                                if (textRoot && textRoot.length > 0) {
                                    text += textRoot[0] || "";
                                }
                            } else if (typeof runChild === "string") {
                                text += runChild;
                            }
                        }
                    }

                    if (text) {
                        const escapedText = this._escapeXmlText(text);
                        runXml += `<hp:run charPrIDRef="0"><hp:t>${escapedText}</hp:t></hp:run>`;
                    }
                }
            }
        }

        // 빈 내용인 경우 기본 run 생성
        if (!runXml.trim()) {
            runXml = '<hp:run charPrIDRef="0"><hp:t></hp:t></hp:run>';
        }

        // 실제 linesegarray 패턴
        const linesegArray = `<hp:linesegarray><hp:lineseg textpos="0" vertpos="0" vertsize="2400" textheight="2400" baseline="2040" spacing="480" horzpos="0" horzsize="42520" flags="393216"/></hp:linesegarray>`;

        return `<hp:p id="${elementId}" paraPrIDRef="${paraPrId}" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0">${runXml}${linesegArray}</hp:p>
`;
    }

    protected _compileTable(table: Table): string {
        const tableId = this.nextElementId++;
        const tableRoot = (table as any).root;

        let rowsXml = "";
        let rowCount = 0;
        let colCount = 0;

        console.log("Table root:", tableRoot?.length, "elements");

        if (tableRoot && Array.isArray(tableRoot)) {
            // TableRow 처리
            for (const row of tableRoot) {
                console.log("Table child:", row?.constructor?.name, row?.rootKey);

                if (row?.constructor?.name === "TableRow" || row?.rootKey === "w:tr") {
                    rowCount++;
                    const rowXml = this._compileTableRow(row, rowCount - 1);
                    rowsXml += rowXml;

                    // 컬럼 수 계산
                    const rowRoot = (row as any).root;
                    if (rowRoot && Array.isArray(rowRoot)) {
                        let cellCount = 0;
                        for (const cell of rowRoot) {
                            if (cell?.constructor?.name === "TableCell" || cell?.rootKey === "w:tc") {
                                cellCount++;
                            }
                        }
                        colCount = Math.max(colCount, cellCount);
                    }
                }
            }
        }

        // 기본값 설정
        if (rowCount === 0) rowCount = 1;
        if (colCount === 0) colCount = 1;

        return `<hp:tbl id="${tableId}" zOrder="0" numberingType="TABLE" textWrap="TOP_AND_BOTTOM" textFlow="BOTH_SIDES" lock="0" dropcapstyle="None" pageBreak="CELL" repeatHeader="1" rowCnt="${rowCount}" colCnt="${colCount}" cellSpacing="0" borderFillIDRef="1" noAdjust="0">
<hp:sz width="47630" widthRelTo="ABSOLUTE" height="${rowCount * 3000}" heightRelTo="ABSOLUTE" protect="0"/>
<hp:pos treatAsChar="1" affectLSpacing="0" flowWithText="1" allowOverlap="0" holdAnchorAndSO="0" vertRelTo="PARA" horzRelTo="PARA" vertPos="0" horzPos="0" vertOffset="0" horzOffset="0"/>
<hp:outMargin left="0" right="0" top="0" bottom="0"/>
${rowsXml}</hp:tbl>
`;
    }

    protected _compileTableRow(row: any, rowIndex: number): string {
        const rowRoot = row.root;
        let cellsXml = "";
        let colIndex = 0;

        if (rowRoot && Array.isArray(rowRoot)) {
            for (const cell of rowRoot) {
                if (cell?.constructor?.name === "TableCell" || cell?.rootKey === "w:tc") {
                    cellsXml += this._compileTableCell(cell, colIndex, rowIndex);
                    colIndex++;
                }
            }
        }

        return `<hp:tr>
<hp:sz height="3000" heightRelTo="ABSOLUTE"/>
${cellsXml}</hp:tr>
`;
    }

    protected _compileTableCell(cell: any, colIndex: number, rowIndex: number): string {
        const cellRoot = cell.root;
        let contentXml = "";

        if (cellRoot && Array.isArray(cellRoot)) {
            // 셀 내의 Paragraph 처리
            for (const child of cellRoot) {
                if (child instanceof Paragraph) {
                    contentXml += this._compileParagraph(child);
                } else if (child?.constructor?.name === "Paragraph") {
                    contentXml += this._compileParagraph(child);
                }
            }
        }

        // 빈 셀인 경우 기본 문단 추가
        if (!contentXml) {
            const emptyParaId = this.nextElementId++;
            contentXml = `<hp:p id="${emptyParaId}" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0"><hp:run charPrIDRef="0"><hp:t></hp:t></hp:run><hp:linesegarray><hp:lineseg textpos="0" vertpos="0" vertsize="2400" textheight="2400" baseline="2040" spacing="480" horzpos="0" horzsize="10000" flags="393216"/></hp:linesegarray></hp:p>`;
        }

        const cellWidth = 47630 / 4; // 임시로 4등분

        return `<hp:tc>
<hp:cellAddr colAddr="${colIndex}" rowAddr="${rowIndex}"/>
<hp:cellSpan colSpan="1" rowSpan="1"/>
<hp:cellSz width="${cellWidth}" height="3000"/>
<hp:cellMargin left="510" right="510" top="141" bottom="141"/>
<hp:subList>
${contentXml}</hp:subList>
</hp:tc>
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

    protected _extractPreviewText(_document: DocumentWrapper): string {
        let text = "";
        // 문서의 텍스트 추출
        text = "HWPX 변환 문서";

        return text.substring(0, 1000);
    }

    /**
     * XML 텍스트 이스케이프
     */
    protected _escapeXmlText(text: string): string {
        if (!text) return "";

        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
    }
}
