import { XmlComponent } from "@file/xml-components";
import { Anchor } from "./anchor";
import { createInline } from "./inline";
export class Drawing extends XmlComponent {
    constructor(imageData, drawingOptions = {}) {
        super("hp:pic");
        if (!drawingOptions.floating) {
            this.root.push(createInline({
                mediaData: imageData,
                transform: imageData.transformation,
                docProperties: drawingOptions.docProperties,
                outline: drawingOptions.outline,
            }));
        }
        else {
            this.root.push(new Anchor({ mediaData: imageData, transform: imageData.transformation, drawingOptions }));
        }
    }
}
//# sourceMappingURL=drawing.js.map