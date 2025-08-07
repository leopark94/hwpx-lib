import { XmlAttributeComponent } from "./default-attributes";
export class Attributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                val: "val",
                color: "color",
                fill: "fill",
                space: "space",
                sz: "sz",
                type: "type",
                rsidR: "rsidR",
                rsidRPr: "rsidRPr",
                rsidSect: "rsidSect",
                w: "w",
                h: "h",
                top: "top",
                right: "right",
                bottom: "bottom",
                left: "left",
                header: "header",
                footer: "footer",
                gutter: "gutter",
                linePitch: "linePitch",
                pos: "pos",
            }
        });
    }
}
//# sourceMappingURL=attributes.js.map