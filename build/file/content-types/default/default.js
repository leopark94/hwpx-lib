import { XmlComponent } from "@file/xml-components";
import { DefaultAttributes } from "./default-attributes";
export class Default extends XmlComponent {
    constructor(contentType, extension) {
        super("Default");
        this.root.push(new DefaultAttributes({
            contentType: contentType,
            extension: extension,
        }));
    }
}
//# sourceMappingURL=default.js.map