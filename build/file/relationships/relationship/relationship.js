import { XmlComponent } from "@file/xml-components";
import { RelationshipAttributes } from "./relationship-attributes";
export const TargetModeType = {
    EXTERNAL: "External",
};
export class Relationship extends XmlComponent {
    constructor(id, type, target, targetMode) {
        super("Relationship");
        this.root.push(new RelationshipAttributes({
            id,
            type,
            target,
            targetMode,
        }));
    }
}
//# sourceMappingURL=relationship.js.map