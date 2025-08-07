import { NextAttributeComponent, XmlComponent } from "@file/xml-components";
import { signedTwipsMeasureValue, twipsMeasureValue } from "@util/values";
export class PageMargin extends XmlComponent {
    constructor(top, right, bottom, left, header, footer, gutter) {
        super("hs:pageMargin");
        this.root.push(new NextAttributeComponent({
            top: { key: "top", value: signedTwipsMeasureValue(top) },
            right: { key: "right", value: twipsMeasureValue(right) },
            bottom: { key: "bottom", value: signedTwipsMeasureValue(bottom) },
            left: { key: "left", value: twipsMeasureValue(left) },
            header: { key: "header", value: twipsMeasureValue(header) },
            footer: { key: "footer", value: twipsMeasureValue(footer) },
            gutter: { key: "gutter", value: twipsMeasureValue(gutter) },
        }));
    }
}
//# sourceMappingURL=page-margin.js.map