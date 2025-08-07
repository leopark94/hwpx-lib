import { FileChild } from "@file/file-child";
import { TableGrid } from "./grid";
import { TableCell, VerticalMergeType } from "./table-cell";
import { TableProperties } from "./table-properties";
export class Table extends FileChild {
    constructor({ rows, width, columnWidths = Array(Math.max(...rows.map((row) => row.CellCount))).fill(100), margins, indent, float, layout, style, borders, alignment, visuallyRightToLeft, cellSpacing, }) {
        super("hp:tbl");
        this.root.push(new TableProperties({
            borders: borders !== null && borders !== void 0 ? borders : {},
            width: width !== null && width !== void 0 ? width : { size: 100 },
            indent,
            float,
            layout,
            style,
            alignment,
            cellMargin: margins,
            visuallyRightToLeft,
            cellSpacing,
        }));
        this.root.push(new TableGrid(columnWidths));
        for (const row of rows) {
            this.root.push(row);
        }
        rows.forEach((row, rowIndex) => {
            if (rowIndex === rows.length - 1) {
                return;
            }
            let columnIndex = 0;
            row.cells.forEach((cell) => {
                if (cell.options.rowSpan && cell.options.rowSpan > 1) {
                    const continueCell = new TableCell({
                        rowSpan: cell.options.rowSpan - 1,
                        columnSpan: cell.options.columnSpan,
                        borders: cell.options.borders,
                        children: [],
                        verticalMerge: VerticalMergeType.CONTINUE,
                    });
                    rows[rowIndex + 1].addCellToColumnIndex(continueCell, columnIndex);
                }
                columnIndex += cell.options.columnSpan || 1;
            });
        });
    }
}
//# sourceMappingURL=table.js.map