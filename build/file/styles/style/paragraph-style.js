import { ParagraphProperties } from "@file/paragraph";
import { RunProperties } from "@file/paragraph/run/properties";
import { Style } from "./style";
export class StyleForParagraph extends Style {
    constructor(options) {
        super({ type: "paragraph", styleId: options.id }, options);
        Object.defineProperty(this, "paragraphProperties", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "runProperties", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.paragraphProperties = new ParagraphProperties(options.paragraph);
        this.runProperties = new RunProperties(options.run);
        this.root.push(this.paragraphProperties);
        this.root.push(this.runProperties);
    }
}
//# sourceMappingURL=paragraph-style.js.map