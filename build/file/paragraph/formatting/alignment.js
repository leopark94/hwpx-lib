import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
export const AlignmentType = {
    START: "start",
    CENTER: "center",
    END: "end",
    BOTH: "both",
    MEDIUM_KASHIDA: "mediumKashida",
    DISTRIBUTE: "distribute",
    NUM_TAB: "numTab",
    HIGH_KASHIDA: "highKashida",
    LOW_KASHIDA: "lowKashida",
    THAI_DISTRIBUTE: "thaiDistribute",
    LEFT: "left",
    RIGHT: "right",
    JUSTIFIED: "both",
};
export class AlignmentAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                horizontal: "horizontal",
                vertical: "vertical",
            }
        });
    }
}
export class Alignment extends XmlComponent {
    constructor(type) {
        super("hh:align");
        let horizontal = type;
        if (type === AlignmentType.LEFT || type === AlignmentType.START) {
            horizontal = "LEFT";
        }
        else if (type === AlignmentType.RIGHT || type === AlignmentType.END) {
            horizontal = "RIGHT";
        }
        else if (type === AlignmentType.CENTER) {
            horizontal = "CENTER";
        }
        else if (type === AlignmentType.BOTH || type === AlignmentType.JUSTIFIED) {
            horizontal = "JUSTIFY";
        }
        else if (type === AlignmentType.DISTRIBUTE) {
            horizontal = "DISTRIBUTE";
        }
        this.root.push(new AlignmentAttributes({
            horizontal: horizontal,
            vertical: "BASELINE",
        }));
    }
}
//# sourceMappingURL=alignment.js.map