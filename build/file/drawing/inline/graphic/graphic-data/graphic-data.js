import { XmlComponent } from "@file/xml-components";
import { GraphicDataAttributes } from "./graphic-data-attribute";
import { Pic } from "./pic";
export class GraphicData extends XmlComponent {
    constructor({ mediaData, transform, outline, }) {
        super("a:graphicData");
        Object.defineProperty(this, "pic", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.root.push(new GraphicDataAttributes({
            uri: "http://schemas.openxmlformats.org/drawingml/2006/picture",
        }));
        this.pic = new Pic({ mediaData, transform, outline });
        this.root.push(this.pic);
    }
}
//# sourceMappingURL=graphic-data.js.map