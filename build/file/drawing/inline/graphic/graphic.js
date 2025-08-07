import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
import { GraphicData } from "./graphic-data";
class GraphicAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                a: "xmlns:a",
            }
        });
    }
}
export class Graphic extends XmlComponent {
    constructor({ mediaData, transform, outline, }) {
        super("a:graphic");
        Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.root.push(new GraphicAttributes({
            a: "http://schemas.openxmlformats.org/drawingml/2006/main",
        }));
        this.data = new GraphicData({ mediaData, transform, outline });
        this.root.push(this.data);
    }
}
//# sourceMappingURL=graphic.js.map