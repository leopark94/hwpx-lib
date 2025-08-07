import { createHyperlinkClick } from "@file/drawing/doc-properties/doc-properties-children";
import { ConcreteHyperlink } from "@file/paragraph";
import { XmlComponent } from "@file/xml-components";
import { NonVisualPropertiesAttributes } from "./non-visual-properties-attributes";
export class NonVisualProperties extends XmlComponent {
    constructor() {
        super("pic:cNvPr");
        this.root.push(new NonVisualPropertiesAttributes({
            id: 0,
            name: "",
            descr: "",
        }));
    }
    prepForXml(context) {
        for (let i = context.stack.length - 1; i >= 0; i--) {
            const element = context.stack[i];
            if (!(element instanceof ConcreteHyperlink)) {
                continue;
            }
            this.root.push(createHyperlinkClick(element.linkId, false));
            break;
        }
        return super.prepForXml(context);
    }
}
//# sourceMappingURL=non-visual-properties.js.map