import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
export const LineRuleType = {
    AT_LEAST: "atLeast",
    EXACTLY: "exactly",
    EXACT: "exact",
    AUTO: "auto",
};
class LineSpacingAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                type: "type",
                value: "value",
                unit: "unit",
            }
        });
    }
}
export class Spacing extends XmlComponent {
    constructor(options) {
        super("hh:lineSpacing");
        if (options.line !== undefined) {
            let type = "PERCENT";
            const value = options.line.toString();
            if (options.lineRule === LineRuleType.EXACTLY || options.lineRule === LineRuleType.EXACT) {
                type = "FIXED";
            }
            else if (options.lineRule === LineRuleType.AT_LEAST) {
                type = "AT_LEAST";
            }
            this.root.push(new LineSpacingAttributes({
                type: type,
                value: value,
                unit: "HWPUNIT",
            }));
        }
    }
}
//# sourceMappingURL=spacing.js.map