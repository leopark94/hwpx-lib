import { TextAttributes } from "@file/paragraph/run/text-attributes";
import { SpaceType } from "@file/shared";
import { XmlComponent } from "@file/xml-components";
export class DeletedText extends XmlComponent {
    constructor(text) {
        super("w:delText");
        this.root.push(new TextAttributes({ space: SpaceType.PRESERVE }));
        this.root.push(text);
    }
}
//# sourceMappingURL=deleted-text.js.map