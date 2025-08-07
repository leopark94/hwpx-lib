import { BaseXmlComponent } from "./base";
export const EMPTY_OBJECT = Object.seal({});
export class XmlComponent extends BaseXmlComponent {
    constructor(rootKey) {
        super(rootKey);
        Object.defineProperty(this, "root", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.root = new Array();
    }
    prepForXml(context) {
        var _a;
        context.stack.push(this);
        const children = this.root
            .map((comp) => {
            if (comp instanceof BaseXmlComponent) {
                return comp.prepForXml(context);
            }
            return comp;
        })
            .filter((comp) => comp !== undefined);
        context.stack.pop();
        return {
            [this.rootKey]: children.length ? (children.length === 1 && ((_a = children[0]) === null || _a === void 0 ? void 0 : _a._attr) ? children[0] : children) : EMPTY_OBJECT,
        };
    }
    addChildElement(child) {
        this.root.push(child);
        return this;
    }
}
export class IgnoreIfEmptyXmlComponent extends XmlComponent {
    prepForXml(context) {
        const result = super.prepForXml(context);
        if (result && (typeof result[this.rootKey] !== "object" || Object.keys(result[this.rootKey]).length)) {
            return result;
        }
        return undefined;
    }
}
//# sourceMappingURL=xml-component.js.map