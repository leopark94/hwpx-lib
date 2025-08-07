import { SpaceType } from "@file/shared";
import { XmlComponent } from "@file/xml-components";
import { TextAttributes } from "./text-attributes";
export class SequentialIdentifierInstruction extends XmlComponent {
    constructor(identifier) {
        super("hp:instrText");
        this.root.push(new TextAttributes({ space: SpaceType.PRESERVE }));
        this.root.push(`SEQ ${identifier}`);
    }
}
//# sourceMappingURL=sequential-identifier-instruction.js.map