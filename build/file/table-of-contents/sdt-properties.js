import { StringValueElement, XmlComponent } from "@file/xml-components";
export class StructuredDocumentTagProperties extends XmlComponent {
    constructor(alias) {
        super("hp:ctrlPr");
        if (alias) {
            this.root.push(new StringValueElement("w:alias", alias));
        }
    }
}
//# sourceMappingURL=sdt-properties.js.map