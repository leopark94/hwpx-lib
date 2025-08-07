import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
export declare const VerticalAlignTable: {
    readonly TOP: "top";
    readonly CENTER: "center";
    readonly BOTTOM: "bottom";
};
export declare const VerticalAlignSection: {
    readonly BOTH: "both";
    readonly TOP: "top";
    readonly CENTER: "center";
    readonly BOTTOM: "bottom";
};
export declare const VerticalAlign: {
    readonly BOTH: "both";
    readonly TOP: "top";
    readonly CENTER: "center";
    readonly BOTTOM: "bottom";
};
export type TableVerticalAlign = (typeof VerticalAlignTable)[keyof typeof VerticalAlignTable];
export type SectionVerticalAlign = (typeof VerticalAlignSection)[keyof typeof VerticalAlignSection];
export declare class VerticalAlignAttributes extends XmlAttributeComponent<{
    readonly verticalAlign?: (typeof VerticalAlign)[keyof typeof VerticalAlign];
}> {
    protected readonly xmlKeys: {
        verticalAlign: string;
    };
}
export declare class VerticalAlignElement extends XmlComponent {
    constructor(value: (typeof VerticalAlign)[keyof typeof VerticalAlign]);
}
