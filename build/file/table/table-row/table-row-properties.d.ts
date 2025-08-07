import { IgnoreIfEmptyXmlComponent } from "@file/xml-components";
import { PositiveUniversalMeasure } from "@util/values";
import { HeightRule } from "./table-row-height";
import { ITableCellSpacingProperties } from "../table-cell-spacing";
export type ITableRowPropertiesOptions = {
    readonly cantSplit?: boolean;
    readonly tableHeader?: boolean;
    readonly height?: {
        readonly value: number | PositiveUniversalMeasure;
        readonly rule: (typeof HeightRule)[keyof typeof HeightRule];
    };
    readonly cellSpacing?: ITableCellSpacingProperties;
};
export declare class TableRowProperties extends IgnoreIfEmptyXmlComponent {
    constructor(options: ITableRowPropertiesOptions);
}
