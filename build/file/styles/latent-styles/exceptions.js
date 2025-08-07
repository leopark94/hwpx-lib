import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
export class LatentStyleExceptionAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                name: "hh:name",
                uiPriority: "hh:uiPriority",
                qFormat: "hh:qFormat",
                semiHidden: "hh:semiHidden",
                unhideWhenUsed: "hh:unhideWhenUsed",
            }
        });
    }
}
export class LatentStyleException extends XmlComponent {
    constructor(attributes) {
        super("hh:lsdException");
        this.root.push(new LatentStyleExceptionAttributes(attributes));
    }
}
//# sourceMappingURL=exceptions.js.map