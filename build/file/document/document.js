import { XmlComponent } from "@file/xml-components";
import { Body } from "./body";
import { DocumentAttributes } from "./document-attributes";
import { DocumentBackground } from "./document-background";
export class Document extends XmlComponent {
    constructor(options) {
        super("hml:document");
        Object.defineProperty(this, "body", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.root.push(new DocumentAttributes(["ha", "hp", "hp10", "hs", "hc", "hh", "hm", "hml"], undefined));
        this.body = new Body();
        if (options.background) {
            this.root.push(new DocumentBackground(options.background));
        }
        this.root.push(this.body);
    }
    add(item) {
        this.body.push(item);
        return this;
    }
    get Body() {
        return this.body;
    }
}
//# sourceMappingURL=document.js.map