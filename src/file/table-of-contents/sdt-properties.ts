// http://www.datypic.com/sc/ooxml/e-w_sdtPr-1.html
import { StringValueElement, XmlComponent } from "@file/xml-components";

export class StructuredDocumentTagProperties extends XmlComponent {
    public constructor(alias?: string) {
        super("hp:ctrlPr");

        if (alias) {
            this.root.push(new StringValueElement("hp:alias", alias));
        }
    }
}
