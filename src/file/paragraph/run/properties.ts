// https://www.ecma-international.org/wp-content/uploads/ECMA-376-1_5th_edition_december_2016.zip page 297, section 17.3.2.21

import { BorderElement, IBorderOptions } from "@file/border";
import { IShadingAttributesProperties, Shading } from "@file/shading";
import { ChangeAttributes, IChangedAttributesProperties } from "@file/track-revision/track-revision";
import { IgnoreIfEmptyXmlComponent, OnOffElement, StringValueElement, XmlAttributeComponent, XmlComponent } from "@file/xml-components";
import { PositiveUniversalMeasure, UniversalMeasure, hexColorValue } from "@util/values";

import { EmphasisMark, EmphasisMarkType } from "./emphasis-mark";
import { CharacterSpacing } from "./formatting";
import { ILanguageOptions, createLanguageComponent } from "./language";
import { IFontAttributesProperties, RunFonts } from "./run-fonts";
import { SubScript, SuperScript } from "./script";
import { Underline, UnderlineType } from "./underline";

type IFontOptions = {
    readonly name: string;
    readonly hint?: string;
};

export const TextEffect = {
    BLINK_BACKGROUND: "blinkBackground",
    LIGHTS: "lights",
    ANTS_BLACK: "antsBlack",
    ANTS_RED: "antsRed",
    SHIMMER: "shimmer",
    SPARKLE: "sparkle",
    NONE: "none",
} as const;

/*
 * http://officeopenxml.com/WPtextShading.php
 *
 * Limit the list of supported highlight colors
 *
 * */

export const HighlightColor = {
    BLACK: "black",
    BLUE: "blue",
    CYAN: "cyan",
    DARK_BLUE: "darkBlue",
    DARK_CYAN: "darkCyan",
    DARK_GRAY: "darkGray",
    DARK_GREEN: "darkGreen",
    DARK_MAGENTA: "darkMagenta",
    DARK_RED: "darkRed",
    DARK_YELLOW: "darkYellow",
    GREEN: "green",
    LIGHT_GRAY: "lightGray",
    MAGENTA: "magenta",
    NONE: "none",
    RED: "red",
    WHITE: "white",
    YELLOW: "yellow",
} as const;

export type IRunStylePropertiesOptions = {
    readonly noProof?: boolean;
    readonly bold?: boolean;
    readonly boldComplexScript?: boolean;
    readonly italics?: boolean;
    readonly italicsComplexScript?: boolean;
    readonly underline?: {
        readonly color?: string;
        readonly type?: (typeof UnderlineType)[keyof typeof UnderlineType];
    };
    readonly effect?: (typeof TextEffect)[keyof typeof TextEffect];
    readonly emphasisMark?: {
        readonly type?: (typeof EmphasisMarkType)[keyof typeof EmphasisMarkType];
    };
    readonly color?: string;
    readonly kern?: number | PositiveUniversalMeasure;
    readonly position?: UniversalMeasure;
    readonly size?: number | PositiveUniversalMeasure;
    readonly sizeComplexScript?: boolean | number | PositiveUniversalMeasure;
    readonly rightToLeft?: boolean;
    readonly smallCaps?: boolean;
    readonly allCaps?: boolean;
    readonly strike?: boolean;
    readonly doubleStrike?: boolean;
    readonly subScript?: boolean;
    readonly superScript?: boolean;
    readonly font?: string | IFontOptions | IFontAttributesProperties;
    readonly highlight?: (typeof HighlightColor)[keyof typeof HighlightColor];
    readonly highlightComplexScript?: boolean | string;
    readonly characterSpacing?: number;
    readonly shading?: IShadingAttributesProperties;
    readonly emboss?: boolean;
    readonly imprint?: boolean;
    readonly revision?: IRunPropertiesChangeOptions;
    readonly language?: ILanguageOptions;
    readonly border?: IBorderOptions;
    readonly snapToGrid?: boolean;
    readonly vanish?: boolean;
    readonly specVanish?: boolean;
    readonly scale?: number;
    readonly math?: boolean;
};

export type IRunPropertiesOptions = {
    readonly style?: string;
} & IRunStylePropertiesOptions;

export type IRunPropertiesChangeOptions = {} & IRunPropertiesOptions & IChangedAttributesProperties;

// <xsd:group name="EG_RPrBase">
//     <xsd:choice>
//     <xsd:element name="rStyle" type="CT_String"/>
//     <xsd:element name="rFonts" type="CT_Fonts"/>
//     <xsd:element name="b" type="CT_OnOff"/>
//     <xsd:element name="bCs" type="CT_OnOff"/>
//     <xsd:element name="i" type="CT_OnOff"/>
//     <xsd:element name="iCs" type="CT_OnOff"/>
//     <xsd:element name="caps" type="CT_OnOff"/>
//     <xsd:element name="smallCaps" type="CT_OnOff"/>
//     <xsd:element name="strike" type="CT_OnOff"/>
//     <xsd:element name="dstrike" type="CT_OnOff"/>
//     <xsd:element name="outline" type="CT_OnOff"/>
//     <xsd:element name="shadow" type="CT_OnOff"/>
//     <xsd:element name="emboss" type="CT_OnOff"/>
//     <xsd:element name="imprint" type="CT_OnOff"/>
//     <xsd:element name="noProof" type="CT_OnOff"/>
//     <xsd:element name="snapToGrid" type="CT_OnOff"/>
//     <xsd:element name="vanish" type="CT_OnOff"/>
//     <xsd:element name="webHidden" type="CT_OnOff"/>
//     <xsd:element name="color" type="CT_Color"/>
//     <xsd:element name="spacing" type="CT_SignedTwipsMeasure"/>
//     <xsd:element name="w" type="CT_TextScale"/>
//     <xsd:element name="kern" type="CT_HpsMeasure"/>
//     <xsd:element name="position" type="CT_SignedHpsMeasure"/>
//     <xsd:element name="sz" type="CT_HpsMeasure"/>
//     <xsd:element name="szCs" type="CT_HpsMeasure"/>
//     <xsd:element name="highlight" type="CT_Highlight"/>
//     <xsd:element name="u" type="CT_Underline"/>
//     <xsd:element name="effect" type="CT_TextEffect"/>
//     <xsd:element name="bdr" type="CT_Border"/>
//     <xsd:element name="shd" type="CT_Shd"/>
//     <xsd:element name="fitText" type="CT_FitText"/>
//     <xsd:element name="vertAlign" type="CT_VerticalAlignRun"/>
//     <xsd:element name="rtl" type="CT_OnOff"/>
//     <xsd:element name="cs" type="CT_OnOff"/>
//     <xsd:element name="em" type="CT_Em"/>
//     <xsd:element name="lang" type="CT_Language"/>
//     <xsd:element name="eastAsianLayout" type="CT_EastAsianLayout"/>
//     <xsd:element name="specVanish" type="CT_OnOff"/>
//     <xsd:element name="oMath" type="CT_OnOff"/>
//     </xsd:choice>
// </xsd:group>

// HWPX charPr 속성을 위한 클래스
class CharPrAttributes extends XmlAttributeComponent<{
    readonly id?: string;
    readonly height?: number;
    readonly textColor?: string;
    readonly shadeColor?: string;
    readonly useFontSpace?: number;
    readonly useKerning?: number;
    readonly symMark?: string;
    readonly borderFillIDRef?: string;
}> {
    protected readonly xmlKeys = {
        id: "id",
        height: "height",
        textColor: "textColor",
        shadeColor: "shadeColor",
        useFontSpace: "useFontSpace",
        useKerning: "useKerning",
        symMark: "symMark",
        borderFillIDRef: "borderFillIDRef",
    };
}

// HWPX 언어별 속성을 위한 클래스
class HwpxLangAttributes extends XmlAttributeComponent<{
    readonly hangul?: string;
    readonly latin?: string;
    readonly hanja?: string;
    readonly japanese?: string;
    readonly other?: string;
    readonly symbol?: string;
    readonly user?: string;
}> {
    protected readonly xmlKeys = {
        hangul: "hangul",
        latin: "latin",
        hanja: "hanja",
        japanese: "japanese",
        other: "other",
        symbol: "symbol",
        user: "user",
    };
}

// HWPX ratio 요소
class RatioElement extends XmlComponent {
    public constructor(scale: number) {
        super("hh:ratio");
        this.root.push(
            new HwpxLangAttributes({
                hangul: scale.toString(),
                latin: scale.toString(),
                hanja: scale.toString(),
                japanese: scale.toString(),
                other: scale.toString(),
                symbol: scale.toString(),
                user: scale.toString(),
            }),
        );
    }
}

// HWPX relSz 요소 (상대 크기)
class RelSzElement extends XmlComponent {
    public constructor() {
        super("hh:relSz");
        this.root.push(
            new HwpxLangAttributes({
                hangul: "100",
                latin: "100",
                hanja: "100",
                japanese: "100",
                other: "100",
                symbol: "100",
                user: "100",
            }),
        );
    }
}

// HWPX offset 요소 (문자 위치)
class OffsetElement extends XmlComponent {
    public constructor(position: UniversalMeasure) {
        super("hh:offset");
        // UniversalMeasure에서 숫자만 추출
        const match = position.match(/^-?\d+/);
        const value = match ? match[0] : "0";
        this.root.push(
            new HwpxLangAttributes({
                hangul: value,
                latin: value,
                hanja: value,
                japanese: value,
                other: value,
                symbol: value,
                user: value,
            }),
        );
    }
}

export class RunProperties extends IgnoreIfEmptyXmlComponent {
    private readonly charPrAttributes?: CharPrAttributes;

    public constructor(options?: IRunPropertiesOptions) {
        super("hh:charPr");

        if (!options) {
            return;
        }

        // HWPX 속성 설정
        const attributes: {
            readonly id?: string;
            readonly height?: number;
            readonly textColor?: string;
            readonly shadeColor?: string;
            readonly useFontSpace?: number;
            readonly useKerning?: number;
            readonly symMark?: string;
            readonly borderFillIDRef?: string;
        } = {};
        if (options.size !== undefined) {
            // HWPX에서는 1/100 pt 단위
            attributes.height = typeof options.size === "number" ? options.size * 100 : 1000;
        }
        if (options.color) {
            attributes.textColor = hexColorValue(options.color);
        }
        if (options.highlight && options.highlight !== "none") {
            attributes.shadeColor = options.highlight;
        }
        if (options.kern !== undefined) {
            attributes.useKerning = typeof options.kern === "number" ? (options.kern > 0 ? 1 : 0) : 1;
        }

        // 속성이 있으면 추가
        if (Object.keys(attributes).length > 0) {
            this.charPrAttributes = new CharPrAttributes(attributes);
            this.root.push(this.charPrAttributes);
        }

        if (options.style) {
            this.push(new StringValueElement("hh:styleRef", options.style));
        }

        if (options.font) {
            if (typeof options.font === "string") {
                this.push(new RunFonts(options.font));
            } else if ("name" in options.font) {
                this.push(new RunFonts(options.font.name, options.font.hint));
            } else {
                this.push(new RunFonts(options.font));
            }
        }

        if (options.bold !== undefined) {
            this.push(new OnOffElement("hh:bold", options.bold));
        }

        // DOCX 전용: bCs (복잡한 스크립트용 굵기) - HWPX에서는 언어별로 처리
        // if ((options.boldComplexScript === undefined && options.bold !== undefined) || options.boldComplexScript) {
        //     this.push(new OnOffElement("w:bCs", options.boldComplexScript ?? options.bold));
        // }

        if (options.italics !== undefined) {
            this.push(new OnOffElement("hh:italic", options.italics));
        }

        // DOCX 전용: iCs (복잡한 스크립트용 기울임) - HWPX에서는 언어별로 처리
        // if ((options.italicsComplexScript === undefined && options.italics !== undefined) || options.italicsComplexScript) {
        //     this.push(new OnOffElement("w:iCs", options.italicsComplexScript ?? options.italics));
        // }

        // These two are mutually exclusive
        if (options.smallCaps !== undefined) {
            this.push(new OnOffElement("hh:smallCaps", options.smallCaps));
        } else if (options.allCaps !== undefined) {
            this.push(new OnOffElement("hh:caps", options.allCaps));
        }

        if (options.strike !== undefined) {
            this.push(new OnOffElement("hh:strikeout", options.strike));
        }

        if (options.doubleStrike !== undefined) {
            this.push(new OnOffElement("hh:strikeout", options.doubleStrike));
        }

        // DOCX 전용: emboss (양각 효과) - HWPX에서는 지원하지 않음
        // if (options.emboss !== undefined) {
        //     this.push(new OnOffElement("w:emboss", options.emboss));
        // }

        // DOCX 전용: imprint (음각 효과) - HWPX에서는 지원하지 않음
        // if (options.imprint !== undefined) {
        //     this.push(new OnOffElement("w:imprint", options.imprint));
        // }

        // DOCX 전용: noProof (맞춤법 검사 제외)
        // if (options.noProof !== undefined) {
        //     this.push(new OnOffElement("w:noProof", options.noProof));
        // }

        // DOCX 전용: snapToGrid (격자에 맞춤) - HWPX는 paraPr 수준에서 지원
        // if (options.snapToGrid !== undefined) {
        //     this.push(new OnOffElement("w:snapToGrid", options.snapToGrid));
        // }

        if (options.vanish) {
            // https://c-rex.net/projects/samples/ooxml/e1/Part4/OOXML_P4_DOCX_vanish_topic_ID0E6W3O.html
            // http://www.datypic.com/sc/ooxml/e-w_vanish-1.html
            this.push(new OnOffElement("hh:vanish", options.vanish));
        }

        // HWPX ratio 요소 (문자 폭 비율)
        if (options.scale !== undefined) {
            const ratio = this.createRatioElement(options.scale);
            this.push(ratio);
        }

        // HWPX spacing 요소 (문자 간격)
        if (options.characterSpacing) {
            this.push(new CharacterSpacing(options.characterSpacing));
        }

        // HWPX relSz 요소 (상대 크기)
        const relSz = this.createRelSzElement();
        this.push(relSz);

        // HWPX offset 요소 (문자 위치)
        if (options.position) {
            const offset = this.createOffsetElement(options.position);
            this.push(offset);
        }

        if (options.underline) {
            this.push(new Underline(options.underline.type, options.underline.color));
        }

        // DOCX 전용: effect (텍스트 애니메이션 효과) - HWPX에서는 지원하지 않음
        if (options.effect) {
            this.push(new StringValueElement("w:effect", options.effect));
        }

        // DOCX 전용: bdr (문자 테두리) - HWPX는 borderFillIDRef 사용
        if (options.border) {
            this.push(new BorderElement("w:bdr", options.border));
        }

        if (options.shading) {
            this.push(new Shading(options.shading));
        }

        if (options.subScript) {
            this.push(new SubScript());
        }

        if (options.superScript) {
            this.push(new SuperScript());
        }

        if (options.rightToLeft !== undefined) {
            this.push(new OnOffElement("w:rtl", options.rightToLeft));
        }

        if (options.emphasisMark) {
            this.push(new EmphasisMark(options.emphasisMark.type));
        }

        if (options.language) {
            this.push(createLanguageComponent(options.language));
        }

        if (options.specVanish) {
            // https://c-rex.net/projects/samples/ooxml/e1/Part4/OOXML_P4_DOCX_specVanish_topic_ID0EIE1O.html
            this.push(new OnOffElement("w:specVanish", options.vanish));
        }

        if (options.math) {
            this.push(new OnOffElement("hh:math", options.math));
        }

        if (options.revision) {
            this.push(new RunPropertiesChange(options.revision));
        }
    }

    public push(item: XmlComponent): void {
        this.root.push(item);
    }

    // HWPX ratio 요소 생성
    private createRatioElement(scale: number): RatioElement {
        return new RatioElement(scale);
    }

    // HWPX relSz 요소 생성 (기본값 100)
    private createRelSzElement(): RelSzElement {
        return new RelSzElement();
    }

    // HWPX offset 요소 생성
    private createOffsetElement(position: UniversalMeasure): OffsetElement {
        return new OffsetElement(position);
    }
}

export class RunPropertiesChange extends XmlComponent {
    public constructor(options: IRunPropertiesChangeOptions) {
        super("hh:rPrChange");
        this.root.push(
            new ChangeAttributes({
                id: options.id,
                author: options.author,
                date: options.date,
            }),
        );
        this.addChildElement(new RunProperties(options as IRunPropertiesOptions));
    }
}
