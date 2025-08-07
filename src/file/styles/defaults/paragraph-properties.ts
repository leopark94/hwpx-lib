import { IParagraphStylePropertiesOptions, ParagraphProperties } from "@file/paragraph/properties";
import { XmlComponent } from "@file/xml-components";

export class ParagraphPropertiesDefaults extends XmlComponent {
    public constructor(options?: IParagraphStylePropertiesOptions) {
        super("hh:pPrDefault");
        this.root.push(new ParagraphProperties(options));
    }
}
