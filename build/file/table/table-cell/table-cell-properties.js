import { VerticalAlignElement } from "@file/vertical-align";
import { IgnoreIfEmptyXmlComponent } from "@file/xml-components";
import { Shading } from "../../shading";
import { TableCellMargin, TableCellMarginElementType } from "../table-properties/table-cell-margin";
import { TableWidthElement } from "../table-width";
import { GridSpan, TDirection, TableCellBorders, VerticalMerge, VerticalMergeType, } from "./table-cell-components";
export class TableCellProperties extends IgnoreIfEmptyXmlComponent {
    constructor(options) {
        super("hp:tcPr");
        if (options.width) {
            this.root.push(new TableWidthElement("hp:tcW", options.width));
        }
        if (options.columnSpan) {
            this.root.push(new GridSpan(options.columnSpan));
        }
        if (options.verticalMerge) {
            this.root.push(new VerticalMerge(options.verticalMerge));
        }
        else if (options.rowSpan && options.rowSpan > 1) {
            this.root.push(new VerticalMerge(VerticalMergeType.RESTART));
        }
        if (options.borders) {
            this.root.push(new TableCellBorders(options.borders));
        }
        if (options.shading) {
            this.root.push(new Shading(options.shading));
        }
        if (options.margins) {
            this.root.push(new TableCellMargin(TableCellMarginElementType.TABLE_CELL, options.margins));
        }
        if (options.textDirection) {
            this.root.push(new TDirection(options.textDirection));
        }
        if (options.verticalAlign) {
            this.root.push(new VerticalAlignElement(options.verticalAlign));
        }
    }
}
//# sourceMappingURL=table-cell-properties.js.map