import { ConcreteHyperlink } from "@file/paragraph";
import { NextAttributeComponent, XmlComponent } from "@file/xml-components";
import { docPropertiesUniqueNumericIdGen } from "@util/convenience-functions";
import { createHyperlinkClick } from "./doc-properties-children";
export class DocProperties extends XmlComponent {
    constructor({ name, description, title } = { name: "", description: "", title: "" }) {
        super("wp:docPr");
        Object.defineProperty(this, "docPropertiesUniqueNumericId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: docPropertiesUniqueNumericIdGen()
        });
        const attributes = {
            id: {
                key: "id",
                value: this.docPropertiesUniqueNumericId(),
            },
            name: {
                key: "name",
                value: name,
            },
        };
        if (description !== null && description !== undefined) {
            attributes.description = {
                key: "descr",
                value: description,
            };
        }
        if (title !== null && title !== undefined) {
            attributes.title = {
                key: "title",
                value: title,
            };
        }
        this.root.push(new NextAttributeComponent(attributes));
    }
    prepForXml(context) {
        for (let i = context.stack.length - 1; i >= 0; i--) {
            const element = context.stack[i];
            if (!(element instanceof ConcreteHyperlink)) {
                continue;
            }
            this.root.push(createHyperlinkClick(element.linkId, true));
            break;
        }
        return super.prepForXml(context);
    }
}
//# sourceMappingURL=doc-properties.js.map