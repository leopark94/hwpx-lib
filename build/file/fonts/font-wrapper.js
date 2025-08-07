import { Relationships } from "@file/relationships";
import { uniqueUuid } from "@util/convenience-functions";
import { createFontTable } from "./font-table";
export class FontWrapper {
    constructor(options) {
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
        Object.defineProperty(this, "fontTable", {
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
        Object.defineProperty(this, "fontOptionsWithKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        this.fontOptionsWithKey = options.map((o) => (Object.assign(Object.assign({}, o), { fontKey: uniqueUuid() })));
        this.fontTable = createFontTable(this.fontOptionsWithKey);
        this.relationships = new Relationships();
        for (let i = 0; i < options.length; i++) {
            this.relationships.createRelationship(i + 1, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/font", `fonts/${options[i].name}.odttf`);
        }
    }
    get View() {
        return this.fontTable;
    }
    get Relationships() {
        return this.relationships;
    }
}
//# sourceMappingURL=font-wrapper.js.map