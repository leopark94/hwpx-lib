import { Attributes, XmlComponent } from "@file/xml-components";
import { hexColorValue, signedTwipsMeasureValue } from "@util/values";
export class CharacterSpacing extends XmlComponent {
    constructor(value) {
        super("hh:spacing");
        this.root.push(new Attributes({
            hangul: signedTwipsMeasureValue(value),
            latin: signedTwipsMeasureValue(value),
        }));
    }
}
export class Color extends XmlComponent {
    constructor(color) {
        super("hh:textColor");
        this.root.push(new Attributes({
            val: hexColorValue(color),
        }));
    }
}
export class Highlight extends XmlComponent {
    constructor(color) {
        super("hh:shadeColor");
        this.root.push(new Attributes({
            val: color,
        }));
    }
}
export class HighlightComplexScript extends XmlComponent {
    constructor(color) {
        super("w:highlightCs");
        this.root.push(new Attributes({
            val: color,
        }));
    }
}
//# sourceMappingURL=formatting.js.map