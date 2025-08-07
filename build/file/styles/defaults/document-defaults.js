import { XmlComponent } from "@file/xml-components";
import { ParagraphPropertiesDefaults } from "./paragraph-properties";
import { RunPropertiesDefaults } from "./run-properties";
export class DocumentDefaults extends XmlComponent {
    constructor(options) {
        super("hh:docDefaults");
        Object.defineProperty(this, "runPropertiesDefaults", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "paragraphPropertiesDefaults", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.runPropertiesDefaults = new RunPropertiesDefaults(options.run);
        this.paragraphPropertiesDefaults = new ParagraphPropertiesDefaults(options.paragraph);
        this.root.push(this.runPropertiesDefaults);
        this.root.push(this.paragraphPropertiesDefaults);
    }
}
//# sourceMappingURL=document-defaults.js.map