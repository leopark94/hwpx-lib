import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
import { decimalNumber } from "@util/values";
export const PageNumberSeparator = {
    HYPHEN: "hyphen",
    PERIOD: "period",
    COLON: "colon",
    EM_DASH: "emDash",
    EN_DASH: "endash",
};
export class PageNumberTypeAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                start: "w:start",
                formatType: "w:fmt",
                separator: "w:chapSep",
            }
        });
    }
}
export class PageNumberType extends XmlComponent {
    constructor({ start, formatType, separator }) {
        super("hs:pageNumbers");
        this.root.push(new PageNumberTypeAttributes({
            start: start === undefined ? undefined : decimalNumber(start),
            formatType,
            separator,
        }));
    }
}
//# sourceMappingURL=page-number.js.map