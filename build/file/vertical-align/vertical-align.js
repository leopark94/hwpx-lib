import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
export const VerticalAlignTable = {
    TOP: "top",
    CENTER: "center",
    BOTTOM: "bottom",
};
export const VerticalAlignSection = Object.assign(Object.assign({}, VerticalAlignTable), { BOTH: "both" });
export const VerticalAlign = VerticalAlignSection;
export class VerticalAlignAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                verticalAlign: "hp:val",
            }
        });
    }
}
export class VerticalAlignElement extends XmlComponent {
    constructor(value) {
        super("w:vAlign");
        this.root.push(new VerticalAlignAttributes({ verticalAlign: value }));
    }
}
//# sourceMappingURL=vertical-align.js.map