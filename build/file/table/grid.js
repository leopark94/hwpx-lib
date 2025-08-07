import { NextAttributeComponent, XmlComponent } from "@file/xml-components";
import { twipsMeasureValue } from "@util/values";
export class TableGrid extends XmlComponent {
    constructor(widths) {
        super("hp:tblGrid");
        for (const width of widths) {
            this.root.push(new GridCol(width));
        }
    }
}
export class GridCol extends XmlComponent {
    constructor(width) {
        super("hp:gridCol");
        if (width !== undefined) {
            this.root.push(new NextAttributeComponent({
                width: { key: "hp:w", value: twipsMeasureValue(width) },
            }));
        }
    }
}
//# sourceMappingURL=grid.js.map