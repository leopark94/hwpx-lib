import { NextAttributeComponent, XmlComponent } from "@file/xml-components";
import { decimalNumber, twipsMeasureValue } from "@util/values";
export class Columns extends XmlComponent {
    constructor({ space, count, separate, equalWidth, children }) {
        super("hs:columns");
        this.root.push(new NextAttributeComponent({
            space: { key: "hp:space", value: space === undefined ? undefined : twipsMeasureValue(space) },
            count: { key: "w:num", value: count === undefined ? undefined : decimalNumber(count) },
            separate: { key: "w:sep", value: separate },
            equalWidth: { key: "w:equalWidth", value: equalWidth },
        }));
        if (!equalWidth && children) {
            children.forEach((column) => this.addChildElement(column));
        }
    }
}
//# sourceMappingURL=columns.js.map