import { XmlAttributeComponent } from "./default-attributes";

export class Attributes extends XmlAttributeComponent<{
    readonly val?: string | number | boolean;
    readonly color?: string;
    readonly fill?: string;
    readonly space?: string;
    readonly sz?: string;
    readonly type?: string;
    readonly rsidR?: string;
    readonly rsidRPr?: string;
    readonly rsidSect?: string;
    readonly w?: string;
    readonly h?: string;
    readonly top?: string;
    readonly right?: string;
    readonly bottom?: string;
    readonly left?: string;
    readonly header?: string;
    readonly footer?: string;
    readonly gutter?: string;
    readonly linePitch?: string;
    readonly pos?: string | number; // Little strange. Perhaps it is normal. Need to clarify in the spec.
}> {
    protected readonly xmlKeys = {
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
    };
}
