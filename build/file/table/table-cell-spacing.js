import { NextAttributeComponent, XmlComponent } from "@file/xml-components";
import { measurementOrPercentValue } from "@util/values";
export const CellSpacingType = {
    DXA: "dxa",
    NIL: "nil",
};
export class TableCellSpacingElement extends XmlComponent {
    constructor({ type = CellSpacingType.DXA, value }) {
        super("hp:cellSpacing");
        this.root.push(new NextAttributeComponent({
            type: { key: "hs:type", value: type },
            value: { key: "hp:w", value: measurementOrPercentValue(value) },
        }));
    }
}
//# sourceMappingURL=table-cell-spacing.js.map