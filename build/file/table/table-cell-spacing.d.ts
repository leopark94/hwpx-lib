import { XmlComponent } from "@file/xml-components";
import { Percentage, UniversalMeasure } from "@util/values";
export declare const CellSpacingType: {
    readonly DXA: "dxa";
    readonly NIL: "nil";
};
export type ITableCellSpacingProperties = {
    readonly value: number | Percentage | UniversalMeasure;
    readonly type?: (typeof CellSpacingType)[keyof typeof CellSpacingType];
};
export declare class TableCellSpacingElement extends XmlComponent {
    constructor({ type, value }: ITableCellSpacingProperties);
}
