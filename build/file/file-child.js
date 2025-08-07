import { XmlComponent } from "@file/xml-components";
export class FileChild extends XmlComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "fileChild", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: Symbol()
        });
    }
}
//# sourceMappingURL=file-child.js.map