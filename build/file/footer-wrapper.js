import { Footer } from "./footer/footer";
import { Relationships } from "./relationships";
export class FooterWrapper {
    constructor(media, referenceId, initContent) {
        Object.defineProperty(this, "media", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: media
        });
        Object.defineProperty(this, "footer", {
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
        this.footer = new Footer(referenceId, initContent);
        this.relationships = new Relationships();
    }
    add(item) {
        this.footer.add(item);
    }
    addChildElement(childElement) {
        this.footer.addChildElement(childElement);
    }
    get View() {
        return this.footer;
    }
    get Relationships() {
        return this.relationships;
    }
    get Media() {
        return this.media;
    }
}
//# sourceMappingURL=footer-wrapper.js.map