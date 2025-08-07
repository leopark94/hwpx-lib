import { NextAttributeComponent, StringEnumValueElement, XmlComponent } from "@file/xml-components";
import { signedTwipsMeasureValue, twipsMeasureValue } from "@util/values";
export const TableAnchorType = {
    MARGIN: "margin",
    PAGE: "page",
    TEXT: "text",
};
export const RelativeHorizontalPosition = {
    CENTER: "center",
    INSIDE: "inside",
    LEFT: "left",
    OUTSIDE: "outside",
    RIGHT: "right",
};
export const RelativeVerticalPosition = {
    CENTER: "center",
    INSIDE: "inside",
    BOTTOM: "bottom",
    OUTSIDE: "outside",
    INLINE: "inline",
    TOP: "top",
};
export const OverlapType = {
    NEVER: "never",
    OVERLAP: "overlap",
};
export class TableFloatProperties extends XmlComponent {
    constructor({ horizontalAnchor, verticalAnchor, absoluteHorizontalPosition, relativeHorizontalPosition, absoluteVerticalPosition, relativeVerticalPosition, bottomFromText, topFromText, leftFromText, rightFromText, overlap, }) {
        super("w:tblpPr");
        this.root.push(new NextAttributeComponent({
            leftFromText: {
                key: "w:leftFromText",
                value: leftFromText === undefined ? undefined : twipsMeasureValue(leftFromText),
            },
            rightFromText: {
                key: "w:rightFromText",
                value: rightFromText === undefined ? undefined : twipsMeasureValue(rightFromText),
            },
            topFromText: {
                key: "w:topFromText",
                value: topFromText === undefined ? undefined : twipsMeasureValue(topFromText),
            },
            bottomFromText: {
                key: "w:bottomFromText",
                value: bottomFromText === undefined ? undefined : twipsMeasureValue(bottomFromText),
            },
            absoluteHorizontalPosition: {
                key: "w:tblpX",
                value: absoluteHorizontalPosition === undefined ? undefined : signedTwipsMeasureValue(absoluteHorizontalPosition),
            },
            absoluteVerticalPosition: {
                key: "w:tblpY",
                value: absoluteVerticalPosition === undefined ? undefined : signedTwipsMeasureValue(absoluteVerticalPosition),
            },
            horizontalAnchor: {
                key: "w:horzAnchor",
                value: horizontalAnchor === undefined ? undefined : horizontalAnchor,
            },
            relativeHorizontalPosition: {
                key: "w:tblpXSpec",
                value: relativeHorizontalPosition,
            },
            relativeVerticalPosition: {
                key: "w:tblpYSpec",
                value: relativeVerticalPosition,
            },
            verticalAnchor: {
                key: "w:vertAnchor",
                value: verticalAnchor,
            },
        }));
        if (overlap) {
            this.root.push(new StringEnumValueElement("w:tblOverlap", overlap));
        }
    }
}
//# sourceMappingURL=table-float-properties.js.map