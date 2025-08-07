import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
import { Extents } from "./extents/extents";
import { Offset } from "./offset/off";
export class FormAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                flipVertical: "flipV",
                flipHorizontal: "flipH",
                rotation: "rot",
            }
        });
    }
}
export class Form extends XmlComponent {
    constructor(options) {
        var _a, _b;
        super("a:xfrm");
        Object.defineProperty(this, "extents", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.root.push(new FormAttributes({
            flipVertical: (_a = options.flip) === null || _a === void 0 ? void 0 : _a.vertical,
            flipHorizontal: (_b = options.flip) === null || _b === void 0 ? void 0 : _b.horizontal,
            rotation: options.rotation,
        }));
        this.extents = new Extents(options.emus.x, options.emus.y);
        this.root.push(new Offset());
        this.root.push(this.extents);
    }
}
//# sourceMappingURL=form.js.map