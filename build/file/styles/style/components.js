import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
import { decimalNumber } from "@util/values";
class ComponentAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { val: "hp:val" }
        });
    }
}
export class Name extends XmlComponent {
    constructor(value) {
        super("hh:name");
        this.root.push(new ComponentAttributes({ val: value }));
    }
}
export class UiPriority extends XmlComponent {
    constructor(value) {
        super("hh:uiPriority");
        this.root.push(new ComponentAttributes({ val: decimalNumber(value) }));
    }
}
export class TableProperties extends XmlComponent {
}
export class RsId extends XmlComponent {
}
//# sourceMappingURL=components.js.map