import { BorderElement, BorderStyle } from "@file/border";
import { IgnoreIfEmptyXmlComponent, XmlComponent } from "@file/xml-components";
export class Border extends IgnoreIfEmptyXmlComponent {
    constructor(options) {
        super("hp:border");
        if (options.top) {
            this.root.push(new BorderElement("hp:top", options.top));
        }
        if (options.bottom) {
            this.root.push(new BorderElement("hp:bottom", options.bottom));
        }
        if (options.left) {
            this.root.push(new BorderElement("hp:left", options.left));
        }
        if (options.right) {
            this.root.push(new BorderElement("hp:right", options.right));
        }
    }
}
export class ThematicBreak extends XmlComponent {
    constructor() {
        super("hp:border");
        const bottom = new BorderElement("hp:bottom", {
            color: "auto",
            space: 1,
            style: BorderStyle.SINGLE,
            size: 6,
        });
        this.root.push(bottom);
    }
}
//# sourceMappingURL=border.js.map