import { XmlComponent } from "@file/xml-components";
export declare const DocumentGridType: {
    readonly DEFAULT: "default";
    readonly LINES: "lines";
    readonly LINES_AND_CHARS: "linesAndChars";
    readonly SNAP_TO_CHARS: "snapToChars";
};
export type IDocGridAttributesProperties = {
    readonly type?: (typeof DocumentGridType)[keyof typeof DocumentGridType];
    readonly linePitch: number;
    readonly charSpace?: number;
};
export declare const createDocumentGrid: ({ type, linePitch, charSpace }: IDocGridAttributesProperties) => XmlComponent;
