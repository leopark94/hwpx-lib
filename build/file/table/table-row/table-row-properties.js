import { IgnoreIfEmptyXmlComponent, OnOffElement } from "@file/xml-components";
import { TableRowHeight } from "./table-row-height";
import { TableCellSpacingElement } from "../table-cell-spacing";
export class TableRowProperties extends IgnoreIfEmptyXmlComponent {
    constructor(options) {
        super("hp:trPr");
        if (options.cantSplit !== undefined) {
            this.root.push(new OnOffElement("w:cantSplit", options.cantSplit));
        }
        if (options.tableHeader !== undefined) {
            this.root.push(new OnOffElement("w:tblHeader", options.tableHeader));
        }
        if (options.height) {
            this.root.push(new TableRowHeight(options.height.value, options.height.rule));
        }
        if (options.cellSpacing) {
            this.root.push(new TableCellSpacingElement(options.cellSpacing));
        }
    }
}
//# sourceMappingURL=table-row-properties.js.map