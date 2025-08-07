import { BaseXmlComponent } from "./base";
export class XmlAttributeComponent extends BaseXmlComponent {
    constructor(root) {
        super("_attr");
        Object.defineProperty(this, "root", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: root
        });
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    prepForXml(_) {
        const attrs = {};
        Object.entries(this.root).forEach(([key, value]) => {
            if (value !== undefined) {
                const newKey = (this.xmlKeys && this.xmlKeys[key]) || key;
                attrs[newKey] = value;
            }
        });
        return { _attr: attrs };
    }
}
export class NextAttributeComponent extends BaseXmlComponent {
    constructor(root) {
        super("_attr");
        Object.defineProperty(this, "root", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: root
        });
    }
    prepForXml(_) {
        const attrs = Object.values(this.root)
            .filter(({ value }) => value !== undefined)
            .reduce((acc, { key, value }) => (Object.assign(Object.assign({}, acc), { [key]: value })), {});
        return { _attr: attrs };
    }
}
//# sourceMappingURL=default-attributes.js.map