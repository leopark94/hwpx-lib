import { ParagraphProperties } from "@file/paragraph/properties";
import { XmlComponent } from "@file/xml-components";
export class ParagraphPropertiesDefaults extends XmlComponent {
    constructor(options) {
        super("hh:pPrDefault");
        this.root.push(new ParagraphProperties(options));
    }
}
//# sourceMappingURL=paragraph-properties.js.map