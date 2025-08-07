import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
import { hexColorValue, uCharHexNumber } from "@util/values";
export class DocumentBackgroundAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                color: "hp:textColor",
                themeColor: "w:themeColor",
                themeShade: "w:themeShade",
                themeTint: "w:themeTint",
            }
        });
    }
}
export class DocumentBackground extends XmlComponent {
    constructor(options) {
        super("w:background");
        this.root.push(new DocumentBackgroundAttributes({
            color: options.color === undefined ? undefined : hexColorValue(options.color),
            themeColor: options.themeColor,
            themeShade: options.themeShade === undefined ? undefined : uCharHexNumber(options.themeShade),
            themeTint: options.themeTint === undefined ? undefined : uCharHexNumber(options.themeTint),
        }));
    }
}
//# sourceMappingURL=document-background.js.map