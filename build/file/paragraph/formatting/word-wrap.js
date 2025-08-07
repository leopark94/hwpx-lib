import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
export class WordWrapAttributes extends XmlAttributeComponent {
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
export class WordWrap extends XmlComponent {
    constructor() {
        super("hp:wordWrap");
        this.root.push(new WordWrapAttributes({ val: 0 }));
    }
}
//# sourceMappingURL=word-wrap.js.map