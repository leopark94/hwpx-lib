import { XmlComponent } from "@file/xml-components";
export interface EffectExtentAttributes {
    readonly top: number;
    readonly right: number;
    readonly bottom: number;
    readonly left: number;
}
export declare const createEffectExtent: ({ top, right, bottom, left }: EffectExtentAttributes) => XmlComponent;
