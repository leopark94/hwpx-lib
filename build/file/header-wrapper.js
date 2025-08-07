import { Header } from "./header/header";
import { Relationships } from "./relationships";
export class HeaderWrapper {
    constructor(media, referenceId, initContent) {
        Object.defineProperty(this, "media", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: media
        });
        Object.defineProperty(this, "header", {
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
        this.header = new Header(referenceId, initContent);
        this.relationships = new Relationships();
    }
    add(item) {
        this.header.add(item);
        return this;
    }
    addChildElement(childElement) {
        this.header.addChildElement(childElement);
    }
    get View() {
        return this.header;
    }
    get Relationships() {
        return this.relationships;
    }
    get Media() {
        return this.media;
    }
}
//# sourceMappingURL=header-wrapper.js.map