import { WidthType } from "@file/table";
import { IgnoreIfEmptyXmlComponent } from "@file/xml-components";
export interface ITableCellMarginOptions {
    readonly marginUnitType?: (typeof WidthType)[keyof typeof WidthType];
    readonly top?: number;
    readonly bottom?: number;
    readonly left?: number;
    readonly right?: number;
}
export declare const TableCellMarginElementType: {
    readonly TABLE: "hp:cellMargin";
    readonly TABLE_CELL: "w:tcMar";
};
export declare class TableCellMargin extends IgnoreIfEmptyXmlComponent {
    constructor(type: (typeof TableCellMarginElementType)[keyof typeof TableCellMarginElementType], { marginUnitType, top, left, bottom, right }: ITableCellMarginOptions);
}
