import { Paragraph } from "@file/paragraph";
import { XmlComponent } from "@file/xml-components";
import { TableCellProperties } from "./table-cell-properties";
export class TableCell extends XmlComponent {
    constructor(options) {
        super("hp:tc");
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
        this.root.push(new TableCellProperties(options));
        for (const child of options.children) {
            this.root.push(child);
        }
    }
    prepForXml(context) {
        if (!(this.root[this.root.length - 1] instanceof Paragraph)) {
            this.root.push(new Paragraph({}));
        }
        return super.prepForXml(context);
    }
}
//# sourceMappingURL=table-cell.js.map