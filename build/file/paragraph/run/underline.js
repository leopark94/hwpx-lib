import { Attributes, XmlComponent } from "@file/xml-components";
import { hexColorValue } from "@util/values";
export const UnderlineType = {
    SINGLE: "single",
    WORDS: "words",
    DOUBLE: "double",
    THICK: "thick",
    DOTTED: "dotted",
    DOTTEDHEAVY: "dottedHeavy",
    DASH: "dash",
    DASHEDHEAVY: "dashedHeavy",
    DASHLONG: "dashLong",
    DASHLONGHEAVY: "dashLongHeavy",
    DOTDASH: "dotDash",
    DASHDOTHEAVY: "dashDotHeavy",
    DOTDOTDASH: "dotDotDash",
    DASHDOTDOTHEAVY: "dashDotDotHeavy",
    WAVE: "wave",
    WAVYHEAVY: "wavyHeavy",
    WAVYDOUBLE: "wavyDouble",
    NONE: "none",
};
export class Underline extends XmlComponent {
    constructor(underlineType = UnderlineType.SINGLE, color) {
        super("hh:underline");
        this.root.push(new Attributes({
            type: underlineType === UnderlineType.NONE ? "NONE" : underlineType.toUpperCase(),
            shape: "SOLID",
            color: color === undefined ? "#000000" : hexColorValue(color),
        }));
    }
}
//# sourceMappingURL=underline.js.map