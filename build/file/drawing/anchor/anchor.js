import { XmlComponent } from "@file/xml-components";
import { createHorizontalPosition, createSimplePos, createVerticalPosition } from "../floating";
import { Graphic } from "../inline/graphic";
import { TextWrappingType, WrapNone, WrapSquare, WrapTight, WrapTopAndBottom } from "../text-wrap";
import { DocProperties } from "./../doc-properties/doc-properties";
import { createEffectExtent } from "./../effect-extent/effect-extent";
import { createExtent } from "./../extent/extent";
import { createGraphicFrameProperties } from "./../graphic-frame/graphic-frame-properties";
import { AnchorAttributes } from "./anchor-attributes";
export class Anchor extends XmlComponent {
    constructor({ mediaData, transform, drawingOptions, }) {
        super("wp:anchor");
        const floating = Object.assign({ allowOverlap: true, behindDocument: false, lockAnchor: false, layoutInCell: true, verticalPosition: {}, horizontalPosition: {} }, drawingOptions.floating);
        this.root.push(new AnchorAttributes({
            distT: floating.margins ? floating.margins.top || 0 : 0,
            distB: floating.margins ? floating.margins.bottom || 0 : 0,
            distL: floating.margins ? floating.margins.left || 0 : 0,
            distR: floating.margins ? floating.margins.right || 0 : 0,
            simplePos: "0",
            allowOverlap: floating.allowOverlap === true ? "1" : "0",
            behindDoc: floating.behindDocument === true ? "1" : "0",
            locked: floating.lockAnchor === true ? "1" : "0",
            layoutInCell: floating.layoutInCell === true ? "1" : "0",
            relativeHeight: floating.zIndex ? floating.zIndex : transform.emus.y,
        }));
        this.root.push(createSimplePos());
        this.root.push(createHorizontalPosition(floating.horizontalPosition));
        this.root.push(createVerticalPosition(floating.verticalPosition));
        this.root.push(createExtent({ x: transform.emus.x, y: transform.emus.y }));
        this.root.push(createEffectExtent({ top: 0, right: 0, bottom: 0, left: 0 }));
        if (drawingOptions.floating !== undefined && drawingOptions.floating.wrap !== undefined) {
            switch (drawingOptions.floating.wrap.type) {
                case TextWrappingType.SQUARE:
                    this.root.push(new WrapSquare(drawingOptions.floating.wrap, drawingOptions.floating.margins));
                    break;
                case TextWrappingType.TIGHT:
                    this.root.push(new WrapTight(drawingOptions.floating.margins));
                    break;
                case TextWrappingType.TOP_AND_BOTTOM:
                    this.root.push(new WrapTopAndBottom(drawingOptions.floating.margins));
                    break;
                case TextWrappingType.NONE:
                default:
                    this.root.push(new WrapNone());
            }
        }
        else {
            this.root.push(new WrapNone());
        }
        this.root.push(new DocProperties(drawingOptions.docProperties));
        this.root.push(createGraphicFrameProperties());
        this.root.push(new Graphic({ mediaData, transform, outline: drawingOptions.outline }));
    }
}
//# sourceMappingURL=anchor.js.map