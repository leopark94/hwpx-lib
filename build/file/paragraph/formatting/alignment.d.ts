import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
export declare const AlignmentType: {
    readonly START: "start";
    readonly CENTER: "center";
    readonly END: "end";
    readonly BOTH: "both";
    readonly MEDIUM_KASHIDA: "mediumKashida";
    readonly DISTRIBUTE: "distribute";
    readonly NUM_TAB: "numTab";
    readonly HIGH_KASHIDA: "highKashida";
    readonly LOW_KASHIDA: "lowKashida";
    readonly THAI_DISTRIBUTE: "thaiDistribute";
    readonly LEFT: "left";
    readonly RIGHT: "right";
    readonly JUSTIFIED: "both";
};
export declare class AlignmentAttributes extends XmlAttributeComponent<{
    readonly horizontal?: (typeof AlignmentType)[keyof typeof AlignmentType];
    readonly vertical?: string;
}> {
    protected readonly xmlKeys: {
        horizontal: string;
        vertical: string;
    };
}
export declare class Alignment extends XmlComponent {
    constructor(type: (typeof AlignmentType)[keyof typeof AlignmentType]);
}
