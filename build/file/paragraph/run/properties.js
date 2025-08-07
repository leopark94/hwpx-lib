import { BorderElement } from "@file/border";
import { Shading } from "@file/shading";
import { ChangeAttributes } from "@file/track-revision/track-revision";
import { IgnoreIfEmptyXmlComponent, OnOffElement, StringValueElement, XmlComponent, XmlAttributeComponent } from "@file/xml-components";
import { hexColorValue } from "@util/values";
import { EmphasisMark } from "./emphasis-mark";
import { CharacterSpacing } from "./formatting";
import { createLanguageComponent } from "./language";
import { RunFonts } from "./run-fonts";
import { SubScript, SuperScript } from "./script";
import { Underline } from "./underline";
export const TextEffect = {
    BLINK_BACKGROUND: "blinkBackground",
    LIGHTS: "lights",
    ANTS_BLACK: "antsBlack",
    ANTS_RED: "antsRed",
    SHIMMER: "shimmer",
    SPARKLE: "sparkle",
    NONE: "none",
};
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
};
class CharPrAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                id: "id",
                height: "height",
                textColor: "textColor",
                shadeColor: "shadeColor",
                useFontSpace: "useFontSpace",
                useKerning: "useKerning",
                symMark: "symMark",
                borderFillIDRef: "borderFillIDRef",
            }
        });
    }
}
class HwpxLangAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                hangul: "hangul",
                latin: "latin",
                hanja: "hanja",
                japanese: "japanese",
                other: "other",
                symbol: "symbol",
                user: "user",
            }
        });
    }
}
class RatioElement extends XmlComponent {
    constructor(scale) {
        super("hh:ratio");
        this.root.push(new HwpxLangAttributes({
            hangul: scale.toString(),
            latin: scale.toString(),
            hanja: scale.toString(),
            japanese: scale.toString(),
            other: scale.toString(),
            symbol: scale.toString(),
            user: scale.toString(),
        }));
    }
}
class RelSzElement extends XmlComponent {
    constructor() {
        super("hh:relSz");
        this.root.push(new HwpxLangAttributes({
            hangul: "100",
            latin: "100",
            hanja: "100",
            japanese: "100",
            other: "100",
            symbol: "100",
            user: "100",
        }));
    }
}
class OffsetElement extends XmlComponent {
    constructor(position) {
        super("hh:offset");
        const match = position.match(/^-?\d+/);
        const value = match ? match[0] : "0";
        this.root.push(new HwpxLangAttributes({
            hangul: value,
            latin: value,
            hanja: value,
            japanese: value,
            other: value,
            symbol: value,
            user: value,
        }));
    }
}
export class RunProperties extends IgnoreIfEmptyXmlComponent {
    constructor(options) {
        super("hh:charPr");
        Object.defineProperty(this, "charPrAttributes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        if (!options) {
            return;
        }
        const attributes = {};
        if (options.size !== undefined) {
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
            }
            else if ("name" in options.font) {
                this.push(new RunFonts(options.font.name, options.font.hint));
            }
            else {
                this.push(new RunFonts(options.font));
            }
        }
        if (options.bold !== undefined) {
            this.push(new OnOffElement("hh:bold", options.bold));
        }
        if (options.italics !== undefined) {
            this.push(new OnOffElement("hh:italic", options.italics));
        }
        if (options.smallCaps !== undefined) {
            this.push(new OnOffElement("hh:smallCaps", options.smallCaps));
        }
        else if (options.allCaps !== undefined) {
            this.push(new OnOffElement("hh:caps", options.allCaps));
        }
        if (options.strike !== undefined) {
            this.push(new OnOffElement("hh:strikeout", options.strike));
        }
        if (options.doubleStrike !== undefined) {
            this.push(new OnOffElement("hh:strikeout", options.doubleStrike));
        }
        if (options.vanish) {
            this.push(new OnOffElement("hh:vanish", options.vanish));
        }
        if (options.scale !== undefined) {
            const ratio = this.createRatioElement(options.scale);
            this.push(ratio);
        }
        if (options.characterSpacing) {
            this.push(new CharacterSpacing(options.characterSpacing));
        }
        const relSz = this.createRelSzElement();
        this.push(relSz);
        if (options.position) {
            const offset = this.createOffsetElement(options.position);
            this.push(offset);
        }
        if (options.underline) {
            this.push(new Underline(options.underline.type, options.underline.color));
        }
        if (options.effect) {
            this.push(new StringValueElement("w:effect", options.effect));
        }
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
            this.push(new OnOffElement("w:specVanish", options.vanish));
        }
        if (options.math) {
            this.push(new OnOffElement("hh:math", options.math));
        }
        if (options.revision) {
            this.push(new RunPropertiesChange(options.revision));
        }
    }
    push(item) {
        this.root.push(item);
    }
    createRatioElement(scale) {
        return new RatioElement(scale);
    }
    createRelSzElement() {
        return new RelSzElement();
    }
    createOffsetElement(position) {
        return new OffsetElement(position);
    }
}
export class RunPropertiesChange extends XmlComponent {
    constructor(options) {
        super("hh:rPrChange");
        this.root.push(new ChangeAttributes({
            id: options.id,
            author: options.author,
            date: options.date,
        }));
        this.addChildElement(new RunProperties(options));
    }
}
//# sourceMappingURL=properties.js.map