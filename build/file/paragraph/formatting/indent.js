import { NextAttributeComponent, XmlComponent } from "@file/xml-components";
import { signedTwipsMeasureValue, twipsMeasureValue } from "@util/values";
export class Indent extends XmlComponent {
    constructor({ start, end, left, right, hanging, firstLine }) {
        super("hh:margin");
        this.root.push(new NextAttributeComponent({
            start: {
                key: "w:start",
                value: start === undefined ? undefined : signedTwipsMeasureValue(start),
            },
            end: {
                key: "w:end",
                value: end === undefined ? undefined : signedTwipsMeasureValue(end),
            },
            left: {
                key: "left",
                value: left === undefined ? undefined : signedTwipsMeasureValue(left),
            },
            right: {
                key: "right",
                value: right === undefined ? undefined : signedTwipsMeasureValue(right),
            },
            intent: {
                key: "intent",
                value: firstLine !== undefined
                    ? twipsMeasureValue(firstLine)
                    : hanging !== undefined
                        ? `-${twipsMeasureValue(hanging)}`
                        : undefined,
            },
            unit: {
                key: "unit",
                value: "HWPUNIT",
            },
        }));
    }
}
//# sourceMappingURL=indent.js.map