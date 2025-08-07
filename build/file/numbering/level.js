import { Attributes, NumberValueElement, XmlAttributeComponent, XmlComponent } from "@file/xml-components";
import { decimalNumber } from "@util/values";
import { AlignmentType } from "../paragraph/formatting";
import { ParagraphProperties } from "../paragraph/properties";
import { RunProperties } from "../paragraph/run/properties";
export const LevelFormat = {
    DECIMAL: "decimal",
    UPPER_ROMAN: "upperRoman",
    LOWER_ROMAN: "lowerRoman",
    UPPER_LETTER: "upperLetter",
    LOWER_LETTER: "lowerLetter",
    ORDINAL: "ordinal",
    CARDINAL_TEXT: "cardinalText",
    ORDINAL_TEXT: "ordinalText",
    HEX: "hex",
    CHICAGO: "chicago",
    IDEOGRAPH__DIGITAL: "ideographDigital",
    JAPANESE_COUNTING: "japaneseCounting",
    AIUEO: "aiueo",
    IROHA: "iroha",
    DECIMAL_FULL_WIDTH: "decimalFullWidth",
    DECIMAL_HALF_WIDTH: "decimalHalfWidth",
    JAPANESE_LEGAL: "japaneseLegal",
    JAPANESE_DIGITAL_TEN_THOUSAND: "japaneseDigitalTenThousand",
    DECIMAL_ENCLOSED_CIRCLE: "decimalEnclosedCircle",
    DECIMAL_FULL_WIDTH2: "decimalFullWidth2",
    AIUEO_FULL_WIDTH: "aiueoFullWidth",
    IROHA_FULL_WIDTH: "irohaFullWidth",
    DECIMAL_ZERO: "decimalZero",
    BULLET: "bullet",
    GANADA: "ganada",
    CHOSUNG: "chosung",
    DECIMAL_ENCLOSED_FULLSTOP: "decimalEnclosedFullstop",
    DECIMAL_ENCLOSED_PARENTHESES: "decimalEnclosedParen",
    DECIMAL_ENCLOSED_CIRCLE_CHINESE: "decimalEnclosedCircleChinese",
    IDEOGRAPH_ENCLOSED_CIRCLE: "ideographEnclosedCircle",
    IDEOGRAPH_TRADITIONAL: "ideographTraditional",
    IDEOGRAPH_ZODIAC: "ideographZodiac",
    IDEOGRAPH_ZODIAC_TRADITIONAL: "ideographZodiacTraditional",
    TAIWANESE_COUNTING: "taiwaneseCounting",
    IDEOGRAPH_LEGAL_TRADITIONAL: "ideographLegalTraditional",
    TAIWANESE_COUNTING_THOUSAND: "taiwaneseCountingThousand",
    TAIWANESE_DIGITAL: "taiwaneseDigital",
    CHINESE_COUNTING: "chineseCounting",
    CHINESE_LEGAL_SIMPLIFIED: "chineseLegalSimplified",
    CHINESE_COUNTING_THOUSAND: "chineseCountingThousand",
    KOREAN_DIGITAL: "koreanDigital",
    KOREAN_COUNTING: "koreanCounting",
    KOREAN_LEGAL: "koreanLegal",
    KOREAN_DIGITAL2: "koreanDigital2",
    VIETNAMESE_COUNTING: "vietnameseCounting",
    RUSSIAN_LOWER: "russianLower",
    RUSSIAN_UPPER: "russianUpper",
    NONE: "none",
    NUMBER_IN_DASH: "numberInDash",
    HEBREW1: "hebrew1",
    HEBREW2: "hebrew2",
    ARABIC_ALPHA: "arabicAlpha",
    ARABIC_ABJAD: "arabicAbjad",
    HINDI_VOWELS: "hindiVowels",
    HINDI_CONSONANTS: "hindiConsonants",
    HINDI_NUMBERS: "hindiNumbers",
    HINDI_COUNTING: "hindiCounting",
    THAI_LETTERS: "thaiLetters",
    THAI_NUMBERS: "thaiNumbers",
    THAI_COUNTING: "thaiCounting",
    BAHT_TEXT: "bahtText",
    DOLLAR_TEXT: "dollarText",
    CUSTOM: "custom",
};
class LevelAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                level: "level",
                start: "start",
            }
        });
    }
}
class NumberFormat extends XmlComponent {
    constructor(value) {
        super("hh:format");
        this.root.push(new Attributes({
            type: value,
        }));
    }
}
class LevelText extends XmlComponent {
    constructor(value) {
        super("hh:textRef");
        this.root.push(new Attributes({
            text: value,
        }));
    }
}
class LevelJc extends XmlComponent {
    constructor(value) {
        super("hh:align");
        let alignValue = value;
        if (value === AlignmentType.LEFT || value === AlignmentType.START) {
            alignValue = "LEFT";
        }
        else if (value === AlignmentType.RIGHT || value === AlignmentType.END) {
            alignValue = "RIGHT";
        }
        else if (value === AlignmentType.CENTER) {
            alignValue = "CENTER";
        }
        this.root.push(new Attributes({
            horizontal: alignValue,
        }));
    }
}
export const LevelSuffix = {
    NOTHING: "nothing",
    SPACE: "space",
    TAB: "tab",
};
class Suffix extends XmlComponent {
    constructor(value) {
        super("w:suff");
        this.root.push(new Attributes({
            val: value,
        }));
    }
}
class IsLegalNumberingStyle extends XmlComponent {
    constructor() {
        super("w:isLgl");
    }
}
export class LevelBase extends XmlComponent {
    constructor({ level, format, text, alignment = AlignmentType.START, start = 1, style, suffix, isLegalNumberingStyle, }) {
        super("hh:paraHead");
        Object.defineProperty(this, "paragraphProperties", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "runProperties", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.root.push(new NumberValueElement("w:start", decimalNumber(start)));
        if (format) {
            this.root.push(new NumberFormat(format));
        }
        if (suffix) {
            this.root.push(new Suffix(suffix));
        }
        if (isLegalNumberingStyle) {
            this.root.push(new IsLegalNumberingStyle());
        }
        if (text) {
            this.root.push(new LevelText(text));
        }
        this.root.push(new LevelJc(alignment));
        this.paragraphProperties = new ParagraphProperties(style && style.paragraph);
        this.runProperties = new RunProperties(style && style.run);
        this.root.push(this.paragraphProperties);
        this.root.push(this.runProperties);
        if (level > 9) {
            throw new Error("Level cannot be greater than 9. Read more here: https://answers.microsoft.com/en-us/msoffice/forum/all/does-word-support-more-than-9-list-levels/d130fdcd-1781-446d-8c84-c6c79124e4d7");
        }
        this.root.push(new LevelAttributes({
            level: decimalNumber(level),
            start: start,
        }));
    }
}
export class Level extends LevelBase {
}
export class LevelForOverride extends LevelBase {
}
//# sourceMappingURL=level.js.map