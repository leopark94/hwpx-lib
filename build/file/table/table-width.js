import { NextAttributeComponent, XmlComponent } from "@file/xml-components";
import { measurementOrPercentValue } from "@util/values";
export const WidthType = {
    AUTO: "auto",
    DXA: "dxa",
    NIL: "nil",
    PERCENTAGE: "pct",
};
export class TableWidthElement extends XmlComponent {
    constructor(name, { type = WidthType.AUTO, size }) {
        super(name);
        let tableWidthValue = size;
        if (type === WidthType.PERCENTAGE && typeof size === "number") {
            tableWidthValue = `${size}%`;
        }
        this.root.push(new NextAttributeComponent({
            type: { key: "type", value: type },
            size: { key: "w", value: measurementOrPercentValue(tableWidthValue) },
        }));
    }
}
//# sourceMappingURL=table-width.js.map