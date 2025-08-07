import { XmlComponent } from "@file/xml-components";
import { ExtentsAttributes } from "./extents-attributes";
export class Extents extends XmlComponent {
    constructor(x, y) {
        super("a:ext");
        Object.defineProperty(this, "attributes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.attributes = new ExtentsAttributes({
            cx: x,
            cy: y,
        });
        this.root.push(this.attributes);
    }
}
//# sourceMappingURL=extents.js.map