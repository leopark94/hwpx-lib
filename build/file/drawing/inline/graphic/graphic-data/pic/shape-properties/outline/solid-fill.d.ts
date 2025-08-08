import { XmlComponent } from "@file/xml-components";
import { SchemeColor } from "./scheme-color";
export interface RgbColorOptions {
    readonly type: "rgb";
    readonly value: string;
}
export interface SchemeColorOptions {
    readonly type: "scheme";
    readonly value: (typeof SchemeColor)[keyof typeof SchemeColor];
}
export type SolidFillOptions = RgbColorOptions | SchemeColorOptions;
export declare const createSolidFill: (options: SolidFillOptions) => XmlComponent;
