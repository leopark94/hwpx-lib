import { TableWidthElement, WidthType } from "@file/table";
import { IgnoreIfEmptyXmlComponent } from "@file/xml-components";
export const TableCellMarginElementType = {
    TABLE: "hp:cellMargin",
    TABLE_CELL: "w:tcMar",
};
export class TableCellMargin extends IgnoreIfEmptyXmlComponent {
    constructor(type, { marginUnitType = WidthType.DXA, top, left, bottom, right }) {
        super(type);
        if (top !== undefined) {
            this.root.push(new TableWidthElement("hp:top", { type: marginUnitType, size: top }));
        }
        if (left !== undefined) {
            this.root.push(new TableWidthElement("hp:left", { type: marginUnitType, size: left }));
        }
        if (bottom !== undefined) {
            this.root.push(new TableWidthElement("hp:bottom", { type: marginUnitType, size: bottom }));
        }
        if (right !== undefined) {
            this.root.push(new TableWidthElement("hp:right", { type: marginUnitType, size: right }));
        }
    }
}
//# sourceMappingURL=table-cell-margin.js.map