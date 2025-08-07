import { InitializableXmlComponent } from "@file/xml-components";
import { FooterAttributes } from "./footer-attributes";
export class Footer extends InitializableXmlComponent {
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
            this.root.push(new FooterAttributes({
                type: "footer",
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
//# sourceMappingURL=footer.js.map