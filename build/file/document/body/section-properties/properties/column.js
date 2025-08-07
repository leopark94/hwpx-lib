import { NextAttributeComponent, XmlComponent } from "@file/xml-components";
import { twipsMeasureValue } from "@util/values";
export class Column extends XmlComponent {
    constructor({ width, space }) {
        super("hs:column");
        this.root.push(new NextAttributeComponent({
            width: { key: "hp:w", value: twipsMeasureValue(width) },
            space: { key: "hp:space", value: space === undefined ? undefined : twipsMeasureValue(space) },
        }));
    }
}
//# sourceMappingURL=column.js.map