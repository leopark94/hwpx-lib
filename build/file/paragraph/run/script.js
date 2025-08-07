import { Attributes, XmlComponent } from "@file/xml-components";
export class VerticalAlign extends XmlComponent {
    constructor(type) {
        super("hp:vertAlign");
        this.root.push(new Attributes({
            val: type,
        }));
    }
}
export class SuperScript extends VerticalAlign {
    constructor() {
        super("superscript");
    }
}
export class SubScript extends VerticalAlign {
    constructor() {
        super("subscript");
    }
}
//# sourceMappingURL=script.js.map