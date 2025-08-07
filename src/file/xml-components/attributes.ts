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
        val: "hp:val",
        color: "hp:color",
        fill: "hp:fill",
        space: "hp:space",
        sz: "hp:sz",
        type: "hp:type",
        rsidR: "hp:rsidR",
        rsidRPr: "hp:rsidRPr",
        rsidSect: "hp:rsidSect",
        w: "hp:w",
        h: "hp:h",
        top: "hp:top",
        right: "hp:right",
        bottom: "hp:bottom",
        left: "hp:left",
        header: "hp:header",
        footer: "hp:footer",
        gutter: "hp:gutter",
        linePitch: "hp:linePitch",
        pos: "hp:pos",
    };
}
