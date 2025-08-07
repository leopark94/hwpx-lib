import { InitializableXmlComponent } from "@file/xml-components";
import { HeaderAttributes } from "./header-attributes";
export class Header extends InitializableXmlComponent {
    constructor(referenceNumber, initContent) {
        super("hm:subList", initContent);
        Object.defineProperty(this, "refId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.refId = referenceNumber;
        if (!initContent) {
            this.root.push(new HeaderAttributes({
                type: "header",
                id: referenceNumber.toString(),
            }));
        }
    }
    get ReferenceId() {
        return this.refId;
    }
    add(item) {
        this.root.push(item);
    }
}
//# sourceMappingURL=header.js.map