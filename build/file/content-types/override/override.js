import { XmlComponent } from "@file/xml-components";
import { OverrideAttributes } from "./override-attributes";
export class Override extends XmlComponent {
    constructor(contentType, partName) {
        super("Override");
        this.root.push(new OverrideAttributes({
            contentType: contentType,
            partName: partName,
        }));
    }
}
//# sourceMappingURL=override.js.map