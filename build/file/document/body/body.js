import { Paragraph, ParagraphProperties } from "@file/paragraph";
import { XmlComponent } from "@file/xml-components";
import { SectionProperties } from "./section-properties/section-properties";
export class Body extends XmlComponent {
    constructor() {
        super("hs:sec");
        Object.defineProperty(this, "sections", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
    }
    addSection(options) {
        const currentSection = this.sections.pop();
        this.root.push(this.createSectionParagraph(currentSection));
        this.sections.push(new SectionProperties(options));
    }
    prepForXml(context) {
        if (this.sections.length === 1) {
            this.root.splice(0, 1);
            this.root.push(this.sections.pop());
        }
        return super.prepForXml(context);
    }
    push(component) {
        this.root.push(component);
    }
    createSectionParagraph(section) {
        const paragraph = new Paragraph({});
        const properties = new ParagraphProperties({});
        properties.push(section);
        paragraph.addChildElement(properties);
        return paragraph;
    }
}
//# sourceMappingURL=body.js.map