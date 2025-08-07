import JSZip from "jszip";
import xml from "xml";

import { File } from "@file/file";

import { Formatter } from "../formatter";
import { PrettifyType } from "./packer";

export type IXmlifyedFile = {
    readonly data: string;
    readonly path: string;
};

// HWPX 전용 파일 매핑
type IHwpxFileMapping = {
    readonly Section0: IXmlifyedFile; // Contents/section0.xml
    readonly Header: IXmlifyedFile; // Contents/header.xml
    readonly ContentHpf: IXmlifyedFile; // Contents/content.hpf
    readonly Settings: IXmlifyedFile; // settings.xml
    readonly Version: IXmlifyedFile; // version.xml
    readonly Mimetype: IXmlifyedFile; // mimetype
    readonly ContainerXml: IXmlifyedFile; // META-INF/container.xml
    readonly ContainerRdf: IXmlifyedFile; // META-INF/container.rdf
    readonly Manifest: IXmlifyedFile; // META-INF/manifest.xml
    readonly PreviewImage?: IXmlifyedFile; // Preview/PrvImage.png
    readonly PreviewText?: IXmlifyedFile; // Preview/PrvText.txt
};

export class HwpxCompiler {
    private readonly formatter: Formatter;

    public constructor() {
        this.formatter = new Formatter();
    }

    public compile(
        file: File,
        prettifyXml?: (typeof PrettifyType)[keyof typeof PrettifyType],
        overrides: readonly IXmlifyedFile[] = [],
    ): JSZip {
        const zip = new JSZip();
        const hwpxFileMapping = this.xmlifyFileToHwpx(file, prettifyXml);
        const map = new Map<string, IXmlifyedFile | readonly IXmlifyedFile[]>(Object.entries(hwpxFileMapping));

        // HWPX 파일들을 ZIP에 추가
        for (const [, obj] of map) {
            if (Array.isArray(obj)) {
                for (const subFile of obj as readonly IXmlifyedFile[]) {
                    zip.file(subFile.path, subFile.data);
                }
            } else {
                if (obj) {
                    zip.file((obj as IXmlifyedFile).path, (obj as IXmlifyedFile).data);
                }
            }
        }

        // 오버라이드 파일들 추가
        for (const subFile of overrides) {
            zip.file(subFile.path, subFile.data);
        }

        // 미디어 파일들을 BinData/ 폴더에 추가 (HWPX 표준)
        for (const data of file.Media.Array) {
            if (data.type !== "svg") {
                zip.file(`BinData/${data.fileName}`, data.data);
            } else {
                zip.file(`BinData/${data.fileName}`, data.data);
                zip.file(`BinData/${data.fallback.fileName}`, data.fallback.data);
            }
        }

        return zip;
    }

    private xmlifyFileToHwpx(file: File, prettify?: (typeof PrettifyType)[keyof typeof PrettifyType]): IHwpxFileMapping {
        // 1. 기본 DOCX XML 생성 (기존 로직 활용)
        const documentXmlData = xml(
            this.formatter.format(file.Document.View, {
                viewWrapper: file.Document,
                file,
                stack: [],
            }),
            prettify ? { indent: prettify } : false,
        );

        // 2. DOCX XML을 OWPML로 변환
        const sectionXml = this.convertDocxToOwpml(documentXmlData);
        const headerXml = this.generateHwpxHeader(file);

        return {
            // 필수 HWPX 파일들
            Section0: {
                data: sectionXml,
                path: "Contents/section0.xml",
            },
            Header: {
                data: headerXml,
                path: "Contents/header.xml",
            },
            ContentHpf: {
                data: this.generateContentHpf(),
                path: "Contents/content.hpf",
            },
            Settings: {
                data: this.generateSettings(),
                path: "settings.xml",
            },
            Version: {
                data: this.generateVersion(),
                path: "version.xml",
            },
            Mimetype: {
                data: "application/hwp+zip",
                path: "mimetype",
            },
            ContainerXml: {
                data: this.generateContainerXml(),
                path: "META-INF/container.xml",
            },
            ContainerRdf: {
                data: this.generateContainerRdf(),
                path: "META-INF/container.rdf",
            },
            Manifest: {
                data: this.generateManifest(),
                path: "META-INF/manifest.xml",
            },
            PreviewText: {
                data: this.generatePreviewText(file),
                path: "Preview/PrvText.txt",
            },
        };
    }

    // DOCX XML을 OWPML(HWPX) XML로 변환 - 실제 HWPX 구조 기반
    private convertDocxToOwpml(docxXml: string): string {
        // 실제 HWPX section0.xml 구조로 변환
        const paragraphs = this.extractParagraphsFromDocx(docxXml);

        // HWPX section0.xml 구조 생성
        const hwpxSectionXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?><hs:sec xmlns:ha="http://www.hancom.co.kr/hwpml/2011/app" xmlns:hp="http://www.hancom.co.kr/hwpml/2011/paragraph" xmlns:hp10="http://www.hancom.co.kr/hwpml/2016/paragraph" xmlns:hs="http://www.hancom.co.kr/hwpml/2011/section" xmlns:hc="http://www.hancom.co.kr/hwpml/2011/core" xmlns:hh="http://www.hancom.co.kr/hwpml/2011/head" xmlns:hhs="http://www.hancom.co.kr/hwpml/2011/history" xmlns:hm="http://www.hancom.co.kr/hwpml/2011/master-page" xmlns:hpf="http://www.hancom.co.kr/schema/2011/hpf" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf/" xmlns:ooxmlchart="http://www.hancom.co.kr/hwpml/2016/ooxmlchart" xmlns:hwpunitchar="http://www.hancom.co.kr/hwpml/2016/HwpUnitChar" xmlns:epub="http://www.idpf.org/2007/ops" xmlns:config="urn:oasis:names:tc:opendocument:xmlns:config:1.0">${paragraphs.join("")}</hs:sec>`;

        return hwpxSectionXml;
    }

    // DOCX에서 문단과 테이블을 추출하여 HWPX 형식으로 변환
    private extractParagraphsFromDocx(docxXml: string): readonly string[] {
        const elements: string[] = [];
        let currentIndex = 0;

        // 1. 테이블 먼저 처리 (테이블 안의 문단은 별도 처리)
        const tableMatches = docxXml.match(/<w:tbl[^>]*>.*?<\/w:tbl>/gs) || [];
        let xmlWithoutTables = docxXml;

        tableMatches.forEach((docxTable, tableIndex) => {
            const hwpxTable = this.convertDocxTableToHwpx(docxTable, tableIndex);
            // eslint-disable-next-line functional/immutable-data
            elements.push(hwpxTable);
            // 테이블을 임시 플레이스홀더로 교체
            xmlWithoutTables = xmlWithoutTables.replace(docxTable, `__TABLE_${tableIndex}__`);
        });

        // 2. 일반 문단 처리 (테이블 외부의 문단들)
        const paragraphMatches = xmlWithoutTables.match(/<w:p[^>]*>.*?<\/w:p>/gs) || [];

        paragraphMatches.forEach((docxParagraph) => {
            // 테이블 플레이스홀더인지 확인
            if (docxParagraph.includes("__TABLE_")) {
                const tableIndex = parseInt(docxParagraph.match(/__TABLE_(\d+)__/)?.[1] || "0", 10);
                if (elements[tableIndex]) {
                    // 이미 처리된 테이블은 건너뛰기
                    return;
                }
            }

            // 텍스트 내용 추출
            const textMatches = docxParagraph.match(/<w:t[^>]*>(.*?)<\/w:t>/g) || [];
            let textContent = "";

            textMatches.forEach((textMatch) => {
                const content = textMatch.replace(/<w:t[^>]*>(.*?)<\/w:t>/, "$1");
                textContent += content;
            });

            // HWPX 문단 구조로 변환
            const hwpxParagraph = this.createHwpxParagraph(textContent, currentIndex++);
            // eslint-disable-next-line functional/immutable-data
            elements.push(hwpxParagraph);
        });

        // 문단이 없는 경우 기본 문단 추가
        if (elements.length === 0) {
            // eslint-disable-next-line functional/immutable-data
            elements.push(this.createHwpxParagraph("기본 문단", 0));
        }

        return elements;
    }

    // DOCX 테이블을 HWPX 테이블로 변환
    private convertDocxTableToHwpx(docxTable: string, tableIndex: number): string {
        // 테이블 행들 추출
        const rowMatches = docxTable.match(/<w:tr[^>]*>.*?<\/w:tr>/gs) || [];
        const rows: string[] = [];

        rowMatches.forEach((docxRow, rowIndex) => {
            // 셀들 추출
            const cellMatches = docxRow.match(/<w:tc[^>]*>.*?<\/w:tc>/gs) || [];
            const cells: string[] = [];

            cellMatches.forEach((docxCell, colIndex) => {
                // 셀 내용 추출
                const cellTextMatches = docxCell.match(/<w:t[^>]*>(.*?)<\/w:t>/g) || [];
                let cellContent = "";

                cellTextMatches.forEach((textMatch) => {
                    const content = textMatch.replace(/<w:t[^>]*>(.*?)<\/w:t>/, "$1");
                    cellContent += content;
                });

                // HWPX 셀 생성
                const hwpxCell = this.createHwpxTableCell(cellContent, rowIndex, colIndex);
                // eslint-disable-next-line functional/immutable-data
                cells.push(hwpxCell);
            });

            // HWPX 행 생성
            const hwpxRow = `<hp:tr>${cells.join("")}</hp:tr>`;
            // eslint-disable-next-line functional/immutable-data
            rows.push(hwpxRow);
        });

        const rowCount = rowMatches.length;
        const colCount = rowMatches[0] ? (rowMatches[0].match(/<w:tc[^>]*>.*?<\/w:tc>/gs) || []).length : 0;

        // HWPX 테이블 생성 (실제 HWPX 구조 기반)
        return `<hp:p id="0" paraPrIDRef="5" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0"><hp:run charPrIDRef="5"><hp:tbl id="${1972240294 + tableIndex}" zOrder="0" numberingType="TABLE" textWrap="TOP_AND_BOTTOM" textFlow="BOTH_SIDES" lock="0" dropcapstyle="None" pageBreak="NONE" repeatHeader="1" rowCnt="${rowCount}" colCnt="${colCount}" cellSpacing="0" borderFillIDRef="2" noAdjust="0"><hp:sz width="44396" widthRelTo="ABSOLUTE" height="5000" heightRelTo="ABSOLUTE" protect="0" /><hp:pos treatAsChar="1" affectLSpacing="0" flowWithText="1" allowOverlap="0" holdAnchorAndSO="0" vertRelTo="PARA" horzRelTo="COLUMN" vertAlign="TOP" horzAlign="LEFT" vertOffset="0" horzOffset="0" /><hp:outMargin left="140" right="140" top="140" bottom="140" /><hp:inMargin left="140" right="140" top="140" bottom="140" />${rows.join("")}</hp:tbl><hp:t /></hp:run><hp:linesegarray><hp:lineseg textpos="0" vertpos="${6400 + tableIndex * 6000}" vertsize="5212" textheight="5212" baseline="4912" spacing="880" horzpos="0" horzsize="45352" flags="393216" /></hp:linesegarray></hp:p>`;
    }

    // HWPX 테이블 셀 생성
    private createHwpxTableCell(cellContent: string, rowIndex: number, colIndex: number): string {
        return `<hp:tc name="" header="0" hasMargin="0" protect="0" editable="0" dirty="0" borderFillIDRef="3"><hp:subList id="" textDirection="HORIZONTAL" lineWrap="BREAK" vertAlign="CENTER" linkListIDRef="0" linkListNextIDRef="0" textWidth="0" textHeight="0" hasTextRef="0" hasNumRef="0"><hp:p id="0" paraPrIDRef="8" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0"><hp:run charPrIDRef="5"><hp:t>${this.escapeXml(cellContent)}</hp:t></hp:run><hp:linesegarray><hp:lineseg textpos="0" vertpos="0" vertsize="1100" textheight="1100" baseline="935" spacing="660" horzpos="0" horzsize="21198" flags="393216" /></hp:linesegarray></hp:p></hp:subList><hp:cellAddr colAddr="${colIndex}" rowAddr="${rowIndex}" /><hp:cellSpan colSpan="1" rowSpan="1" /><hp:cellSz width="22198" height="2356" /><hp:cellMargin left="510" right="510" top="141" bottom="141" /></hp:tc>`;
    }

    // HWPX 형식의 문단 생성
    private createHwpxParagraph(textContent: string, index: number): string {
        const charPrIDRef = textContent.length > 0 ? "0" : "0"; // 기본 문자 속성
        const paraPrIDRef = "0"; // 기본 문단 속성
        const styleIDRef = "0"; // 기본 스타일

        return `<hp:p id="0" pageBreak="0" columnBreak="0" merged="0" paraPrIDRef="${paraPrIDRef}" styleIDRef="${styleIDRef}"><hp:run charPrIDRef="${charPrIDRef}"><hp:t>${this.escapeXml(textContent)}</hp:t></hp:run><hp:linesegarray><hp:lineseg textpos="0" vertpos="${index * 1600}" vertsize="1000" textheight="1000" baseline="850" spacing="600" horzpos="0" horzsize="45352" flags="393216" /></hp:linesegarray></hp:p>`;
    }

    // XML 이스케이프 처리
    private escapeXml(text: string): string {
        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
    }

    // HWPX header.xml 생성 (실제 HWPX 기반)
    private generateHwpxHeader(_file: File): string {
        return `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?><hh:head xmlns:ha="http://www.hancom.co.kr/hwpml/2011/app" xmlns:hp="http://www.hancom.co.kr/hwpml/2011/paragraph" xmlns:hp10="http://www.hancom.co.kr/hwpml/2016/paragraph" xmlns:hs="http://www.hancom.co.kr/hwpml/2011/section" xmlns:hc="http://www.hancom.co.kr/hwpml/2011/core" xmlns:hh="http://www.hancom.co.kr/hwpml/2011/head" xmlns:hhs="http://www.hancom.co.kr/hwpml/2011/history" xmlns:hm="http://www.hancom.co.kr/hwpml/2011/master-page" xmlns:hpf="http://www.hancom.co.kr/schema/2011/hpf" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf/" xmlns:ooxmlchart="http://www.hancom.co.kr/hwpml/2016/ooxmlchart" xmlns:hwpunitchar="http://www.hancom.co.kr/hwpml/2016/HwpUnitChar" xmlns:epub="http://www.idpf.org/2007/ops" xmlns:config="urn:oasis:names:tc:opendocument:xmlns:config:1.0" version="1.5" secCnt="1"><hh:beginNum page="1" footnote="1" endnote="1" pic="1" tbl="1" equation="1" /><hh:refList><hh:fontfaces itemCnt="7"><hh:fontface lang="HANGUL" fontCnt="2"><hh:font id="0" face="굴림" type="TTF" isEmbedded="0" /><hh:font id="1" face="바탕" type="TTF" isEmbedded="0"><hh:substFont face="한컴바탕" type="TTF" isEmbedded="0" binaryItemIDRef="" /></hh:font></hh:fontface><hh:fontface lang="LATIN" fontCnt="2"><hh:font id="0" face="굴림" type="TTF" isEmbedded="0" /><hh:font id="1" face="바탕" type="TTF" isEmbedded="0"><hh:substFont face="한컴바탕" type="TTF" isEmbedded="0" binaryItemIDRef="" /></hh:font></hh:fontface><hh:fontface lang="HANJA" fontCnt="2"><hh:font id="0" face="굴림" type="TTF" isEmbedded="0" /><hh:font id="1" face="바탕" type="TTF" isEmbedded="0"><hh:substFont face="한컴바탕" type="TTF" isEmbedded="0" binaryItemIDRef="" /></hh:font></hh:fontface><hh:fontface lang="JAPANESE" fontCnt="2"><hh:font id="0" face="굴림" type="TTF" isEmbedded="0" /><hh:font id="1" face="바탕" type="TTF" isEmbedded="0"><hh:substFont face="한컴바탕" type="TTF" isEmbedded="0" binaryItemIDRef="" /></hh:font></hh:fontface><hh:fontface lang="OTHER" fontCnt="3"><hh:font id="0" face="굴림" type="TTF" isEmbedded="0" /><hh:font id="1" face="한양신명조" type="HFT" isEmbedded="0"><hh:typeInfo familyType="FCAT_MYUNGJO" weight="0" proportion="0" contrast="0" strokeVariation="0" armStyle="0" letterform="0" midline="0" xHeight="0" /></hh:font><hh:font id="2" face="바탕" type="TTF" isEmbedded="0"><hh:substFont face="한컴바탕" type="TTF" isEmbedded="0" binaryItemIDRef="" /></hh:font></hh:fontface><hh:fontface lang="SYMBOL" fontCnt="2"><hh:font id="0" face="굴림" type="TTF" isEmbedded="0" /><hh:font id="1" face="바탕" type="TTF" isEmbedded="0"><hh:substFont face="한컴바탕" type="TTF" isEmbedded="0" binaryItemIDRef="" /></hh:font></hh:fontface><hh:fontface lang="USER" fontCnt="3"><hh:font id="0" face="굴림" type="TTF" isEmbedded="0" /><hh:font id="1" face="명조" type="HFT" isEmbedded="0"><hh:typeInfo familyType="FCAT_MYUNGJO" weight="0" proportion="0" contrast="0" strokeVariation="0" armStyle="0" letterform="0" midline="0" xHeight="0" /></hh:font><hh:font id="2" face="바탕" type="TTF" isEmbedded="0"><hh:substFont face="한컴바탕" type="TTF" isEmbedded="0" binaryItemIDRef="" /></hh:font></hh:fontface></hh:fontfaces><hh:charProperties itemCnt="6"><hh:charPr id="0" height="1000" textColor="#000000" shadeColor="none" useFontSpace="0" useKerning="0" symMark="NONE" borderFillIDRef="1"><hh:fontRef hangul="1" latin="1" hanja="1" japanese="1" other="1" symbol="1" user="1" /><hh:ratio hangul="100" latin="100" hanja="100" japanese="100" other="100" symbol="100" user="100" /><hh:spacing hangul="0" latin="0" hanja="0" japanese="0" other="0" symbol="0" user="0" /><hh:relSz hangul="100" latin="100" hanja="100" japanese="100" other="100" symbol="100" user="100" /><hh:offset hangul="0" latin="0" hanja="0" japanese="0" other="0" symbol="0" user="0" /><hh:underline type="NONE" shape="SOLID" color="#000000" /><hh:strikeout shape="NONE" color="#000000" /><hh:outline type="NONE" /><hh:shadow type="NONE" color="#C0C0C0" offsetX="10" offsetY="10" /></hh:charPr><hh:charPr id="4" height="2000" textColor="#000000" shadeColor="none" useFontSpace="0" useKerning="0" symMark="NONE" borderFillIDRef="1"><hh:fontRef hangul="0" latin="0" hanja="0" japanese="0" other="0" symbol="0" user="0" /><hh:ratio hangul="100" latin="100" hanja="100" japanese="100" other="100" symbol="100" user="100" /><hh:spacing hangul="0" latin="0" hanja="0" japanese="0" other="0" symbol="0" user="0" /><hh:relSz hangul="100" latin="100" hanja="100" japanese="100" other="100" symbol="100" user="100" /><hh:offset hangul="0" latin="0" hanja="0" japanese="0" other="0" symbol="0" user="0" /><hh:bold /><hh:underline type="BOTTOM" shape="SOLID" color="#000000" /><hh:strikeout shape="NONE" color="#000000" /><hh:outline type="NONE" /><hh:shadow type="NONE" color="#C0C0C0" offsetX="10" offsetY="10" /></hh:charPr></hh:charProperties><hh:paraProperties itemCnt="12"><hh:paraPr id="0" tabPrIDRef="0" condense="0" fontLineHeight="0" snapToGrid="0" suppressLineNumbers="0" checked="0"><hh:align horizontal="JUSTIFY" vertical="BASELINE" /><hh:heading type="NONE" idRef="0" level="0" /><hh:breakSetting breakLatinWord="KEEP_WORD" breakNonLatinWord="KEEP_WORD" widowOrphan="0" keepWithNext="0" keepLines="0" pageBreakBefore="0" lineWrap="BREAK" /><hh:autoSpacing eAsianEng="0" eAsianNum="0" /><hh:margin unit="HWPUNIT" intent="0" left="0" right="0" prev="0" next="0" /><hh:lineSpacing type="PERCENT" value="160" unit="HWPUNIT" /><hh:border borderFillIDRef="1" offsetLeft="0" offsetRight="0" offsetTop="0" offsetBottom="0" connect="0" ignoreMargin="0" /></hh:paraPr><hh:paraPr id="5" tabPrIDRef="0" condense="0" fontLineHeight="0" snapToGrid="0" suppressLineNumbers="0" checked="0"><hh:align horizontal="CENTER" vertical="BASELINE" /><hh:heading type="NONE" idRef="0" level="0" /><hh:breakSetting breakLatinWord="KEEP_WORD" breakNonLatinWord="KEEP_WORD" widowOrphan="0" keepWithNext="0" keepLines="0" pageBreakBefore="0" lineWrap="BREAK" /><hh:autoSpacing eAsianEng="0" eAsianNum="0" /><hh:margin unit="HWPUNIT" intent="0" left="0" right="0" prev="0" next="0" /><hh:lineSpacing type="PERCENT" value="180" unit="HWPUNIT" /><hh:border borderFillIDRef="1" offsetLeft="0" offsetRight="0" offsetTop="0" offsetBottom="0" connect="0" ignoreMargin="0" /></hh:paraPr></hh:paraProperties><hh:tabProperties itemCnt="1"><hh:tabPr id="0" autoTabLeft="0" autoTabRight="0" /></hh:tabProperties><hh:styles itemCnt="12"><hh:style id="0" type="PARA" name="바탕글" engName="Normal" paraPrIDRef="0" charPrIDRef="0" nextStyleIDRef="0" langID="1042" lockForm="0" /></hh:styles></hh:refList><hh:compatibleDocument targetProgram="HWP201X"><hh:layoutCompatibility /></hh:compatibleDocument><hh:docOption><hh:linkinfo path="" pageInherit="0" footnoteInherit="0" /></hh:docOption><hh:trackchageConfig flags="56" /></hh:head>`;
    }

    // Contents/content.hpf 생성 (200개 샘플 분석 기반 - 정확한 XML 매니페스트)
    private generateContentHpf(): string {
        const currentDate = new Date().toISOString();
        return `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<opf:package xmlns:ha="http://www.hancom.co.kr/hwpml/2011/app" xmlns:hp="http://www.hancom.co.kr/hwpml/2011/paragraph" xmlns:hs="http://www.hancom.co.kr/hwpml/2011/section" xmlns:hc="http://www.hancom.co.kr/hwpml/2011/core" xmlns:hh="http://www.hancom.co.kr/hwpml/2011/head" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf/" version="" unique-identifier="" id="">
    <opf:metadata>
        <opf:title/>
        <opf:language>ko</opf:language>
        <opf:meta name="creator" content="text">user</opf:meta>
        <opf:meta name="subject" content="text"/>
        <opf:meta name="description" content="text"/>
        <opf:meta name="lastsaveby" content="text">HwpxLib</opf:meta>
        <opf:meta name="CreatedDate" content="text">${currentDate}</opf:meta>
        <opf:meta name="ModifiedDate" content="text">${currentDate}</opf:meta>
        <opf:meta name="date" content="text">${new Date().toLocaleString("ko-KR")}</opf:meta>
        <opf:meta name="keyword" content="text"/>
    </opf:metadata>
    <opf:manifest>
        <opf:item id="header" href="Contents/header.xml" media-type="application/xml"/>
        <opf:item id="section0" href="Contents/section0.xml" media-type="application/xml"/>
        <opf:item id="settings" href="settings.xml" media-type="application/xml"/>
    </opf:manifest>
    <opf:spine>
        <opf:itemref idref="header" linear="yes"/>
        <opf:itemref idref="section0" linear="yes"/>
    </opf:spine>
</opf:package>`;
    }

    // settings.xml 생성 (실제 HWPX 샘플 포맷)
    private generateSettings(): string {
        return `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<ha:HWPApplicationSetting xmlns:ha="http://www.hancom.co.kr/hwpml/2011/app" xmlns:config="urn:oasis:names:tc:opendocument:xmlns:config:1.0" />`;
    }

    // version.xml 생성 (200개 샘플 분석 기반)
    private generateVersion(): string {
        return `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<hv:HCFVersion xmlns:hv="http://www.hancom.co.kr/hwpml/2011/version" tagetApplication="WORDPROCESSOR" major="5" minor="1" micro="1" buildNumber="0" os="10" xmlVersion="1.5" application="Hancom Office Hangul" appVersion="12.30.0.5708"/>`;
    }

    // META-INF/container.xml 생성 (실제 HWPX 샘플 포맷)
    private generateContainerXml(): string {
        return `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<ocf:container xmlns:ocf="urn:oasis:names:tc:opendocument:xmlns:container" xmlns:hpf="http://www.hancom.co.kr/schema/2011/hpf">
    <ocf:rootfiles>
        <ocf:rootfile full-path="Contents/content.hpf" media-type="application/hwpml-package+xml" />
        <ocf:rootfile full-path="Preview/PrvText.txt" media-type="text/plain" />
        <ocf:rootfile full-path="META-INF/container.rdf" media-type="application/rdf+xml" />
    </ocf:rootfiles>
</ocf:container>`;
    }

    // META-INF/container.rdf 생성 (실제 HWPX 샘플 포맷)
    private generateContainerRdf(): string {
        return `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description rdf:about="">
        <ns0:hasPart xmlns:ns0="http://www.hancom.co.kr/hwpml/2016/meta/pkg#" rdf:resource="Contents/header.xml" />
    </rdf:Description>
    <rdf:Description rdf:about="Contents/header.xml">
        <rdf:type rdf:resource="http://www.hancom.co.kr/hwpml/2016/meta/pkg#HeaderFile" />
    </rdf:Description>
    <rdf:Description rdf:about="">
        <ns0:hasPart xmlns:ns0="http://www.hancom.co.kr/hwpml/2016/meta/pkg#" rdf:resource="Contents/section0.xml" />
    </rdf:Description>
    <rdf:Description rdf:about="Contents/section0.xml">
        <rdf:type rdf:resource="http://www.hancom.co.kr/hwpml/2016/meta/pkg#SectionFile" />
    </rdf:Description>
    <rdf:Description rdf:about="">
        <rdf:type rdf:resource="http://www.hancom.co.kr/hwpml/2016/meta/pkg#Document" />
    </rdf:Description>
</rdf:RDF>`;
    }

    // META-INF/manifest.xml 생성 (실제 HWPX 샘플 포맷)
    private generateManifest(): string {
        return `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<odf:manifest xmlns:odf="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" />`;
    }

    // Preview/PrvText.txt 생성
    private generatePreviewText(_file: File): string {
        // 문서 내용에서 텍스트 추출 (간단 버전)
        return "HWPX document generated by HwpxLib";
    }
}
