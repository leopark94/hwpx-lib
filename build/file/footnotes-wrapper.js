import { FootNotes } from "./footnotes/footnotes";
import { Relationships } from "./relationships";
export class FootnotesWrapper {
    constructor() {
        Object.defineProperty(this, "footnotess", {
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
        this.footnotess = new FootNotes();
        this.relationships = new Relationships();
    }
    get View() {
        return this.footnotess;
    }
    get Relationships() {
        return this.relationships;
    }
}
//# sourceMappingURL=footnotes-wrapper.js.map