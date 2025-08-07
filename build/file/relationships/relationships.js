import { XmlComponent } from "@file/xml-components";
import { RelationshipsAttributes } from "./attributes";
import { Relationship } from "./relationship/relationship";
export class Relationships extends XmlComponent {
    constructor() {
        super("Relationships");
        this.root.push(new RelationshipsAttributes({
            xmlns: "http://schemas.openxmlformats.org/package/2006/relationships",
        }));
    }
    createRelationship(id, type, target, targetMode) {
        const relationship = new Relationship(`rId${id}`, type, target, targetMode);
        this.root.push(relationship);
        return relationship;
    }
    get RelationshipCount() {
        return this.root.length - 1;
    }
}
//# sourceMappingURL=relationships.js.map