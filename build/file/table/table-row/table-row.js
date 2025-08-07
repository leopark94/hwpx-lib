import { XmlComponent } from "@file/xml-components";
import { TableCell } from "../table-cell";
import { TableRowProperties } from "./table-row-properties";
export class TableRow extends XmlComponent {
    constructor(options) {
        super("hp:tr");
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
        this.root.push(new TableRowProperties(options));
        for (const child of options.children) {
            this.root.push(child);
        }
    }
    get CellCount() {
        return this.options.children.length;
    }
    get cells() {
        return this.root.filter((xmlComponent) => xmlComponent instanceof TableCell);
    }
    addCellToIndex(cell, index) {
        this.root.splice(index + 1, 0, cell);
    }
    addCellToColumnIndex(cell, columnIndex) {
        const rootIndex = this.columnIndexToRootIndex(columnIndex, true);
        this.addCellToIndex(cell, rootIndex - 1);
    }
    rootIndexToColumnIndex(rootIndex) {
        if (rootIndex < 1 || rootIndex >= this.root.length) {
            throw new Error(`cell 'rootIndex' should between 1 to ${this.root.length - 1}`);
        }
        let colIdx = 0;
        for (let rootIdx = 1; rootIdx < rootIndex; rootIdx++) {
            const cell = this.root[rootIdx];
            colIdx += cell.options.columnSpan || 1;
        }
        return colIdx;
    }
    columnIndexToRootIndex(columnIndex, allowEndNewCell = false) {
        if (columnIndex < 0) {
            throw new Error(`cell 'columnIndex' should not less than zero`);
        }
        let colIdx = 0;
        let rootIdx = 1;
        while (colIdx <= columnIndex) {
            if (rootIdx >= this.root.length) {
                if (allowEndNewCell) {
                    return this.root.length;
                }
                else {
                    throw new Error(`cell 'columnIndex' should not great than ${colIdx - 1}`);
                }
            }
            const cell = this.root[rootIdx];
            rootIdx += 1;
            colIdx += (cell && cell.options.columnSpan) || 1;
        }
        return rootIdx - 1;
    }
}
//# sourceMappingURL=table-row.js.map