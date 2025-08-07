import { OnOffElement, StringValueElement, XmlAttributeComponent, XmlComponent } from "@file/xml-components";
import { Name, UiPriority } from "./components";
class StyleAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                type: "type",
                styleId: "id",
                default: "default",
                customStyle: "customStyle",
            }
        });
    }
}
export class Style extends XmlComponent {
    constructor(attributes, options) {
        super("hh:style");
        this.root.push(new StyleAttributes(attributes));
        if (options.name) {
            this.root.push(new Name(options.name));
        }
        if (options.basedOn) {
            this.root.push(new StringValueElement("hh:basedOn", options.basedOn));
        }
        if (options.next) {
            this.root.push(new StringValueElement("hh:next", options.next));
        }
        if (options.link) {
            this.root.push(new StringValueElement("hh:link", options.link));
        }
        if (options.uiPriority !== undefined) {
            this.root.push(new UiPriority(options.uiPriority));
        }
        if (options.semiHidden !== undefined) {
            this.root.push(new OnOffElement("hh:semiHidden", options.semiHidden));
        }
        if (options.unhideWhenUsed !== undefined) {
            this.root.push(new OnOffElement("hh:unhideWhenUsed", options.unhideWhenUsed));
        }
        if (options.quickFormat !== undefined) {
            this.root.push(new OnOffElement("hh:qFormat", options.quickFormat));
        }
    }
}
//# sourceMappingURL=style.js.map