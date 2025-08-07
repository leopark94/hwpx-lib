import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
import { TextWrappingSide } from "./text-wrapping";
class WrapSquareAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                distT: "distT",
                distB: "distB",
                distL: "distL",
                distR: "distR",
                wrapText: "wrapText",
            }
        });
    }
}
export class WrapSquare extends XmlComponent {
    constructor(textWrapping, margins = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }) {
        super("wp:wrapSquare");
        this.root.push(new WrapSquareAttributes({
            wrapText: textWrapping.side || TextWrappingSide.BOTH_SIDES,
            distT: margins.top,
            distB: margins.bottom,
            distL: margins.left,
            distR: margins.right,
        }));
    }
}
//# sourceMappingURL=wrap-square.js.map