import { IgnoreIfEmptyXmlComponent, OnOffElement, StringValueElement } from "@file/xml-components";
import { Alignment } from "../../paragraph";
import { Shading } from "../../shading";
import { TableWidthElement } from "../table-width";
import { TableBorders } from "./table-borders";
import { TableCellMargin, TableCellMarginElementType } from "./table-cell-margin";
import { TableFloatProperties } from "./table-float-properties";
import { TableLayout } from "./table-layout";
import { TableCellSpacingElement } from "../table-cell-spacing";
export class TableProperties extends IgnoreIfEmptyXmlComponent {
    constructor(options) {
        super("hp:tblPr");
        if (options.style) {
            this.root.push(new StringValueElement("hp:tblStyle", options.style));
        }
        if (options.float) {
            this.root.push(new TableFloatProperties(options.float));
        }
        if (options.visuallyRightToLeft !== undefined) {
            this.root.push(new OnOffElement("hp:bidiVisual", options.visuallyRightToLeft));
        }
        if (options.width) {
            this.root.push(new TableWidthElement("hp:tblW", options.width));
        }
        if (options.alignment) {
            this.root.push(new Alignment(options.alignment));
        }
        if (options.indent) {
            this.root.push(new TableWidthElement("hp:tblInd", options.indent));
        }
        if (options.borders) {
            this.root.push(new TableBorders(options.borders));
        }
        if (options.shading) {
            this.root.push(new Shading(options.shading));
        }
        if (options.layout) {
            this.root.push(new TableLayout(options.layout));
        }
        if (options.cellMargin) {
            this.root.push(new TableCellMargin(TableCellMarginElementType.TABLE, options.cellMargin));
        }
        if (options.cellSpacing) {
            this.root.push(new TableCellSpacingElement(options.cellSpacing));
        }
    }
}
//# sourceMappingURL=table-properties.js.map