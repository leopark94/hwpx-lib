import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
import { twipsMeasureValue } from "@util/values";
export const HeightRule = {
    AUTO: "auto",
    ATLEAST: "atLeast",
    EXACT: "exact",
};
export class TableRowHeightAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { value: "hp:val", rule: "w:hRule" }
        });
    }
}
export class TableRowHeight extends XmlComponent {
    constructor(value, rule) {
        super("hp:height");
        this.root.push(new TableRowHeightAttributes({
            value: twipsMeasureValue(value),
            rule: rule,
        }));
    }
}
//# sourceMappingURL=table-row-height.js.map