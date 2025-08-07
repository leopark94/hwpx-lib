import { Document } from "./document";
import { Relationships } from "./relationships";
export class DocumentWrapper {
    constructor(options) {
        Object.defineProperty(this, "document", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "relationships", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.document = new Document(options);
        this.relationships = new Relationships();
    }
    get View() {
        return this.document;
    }
    get Relationships() {
        return this.relationships;
    }
}
//# sourceMappingURL=document-wrapper.js.map