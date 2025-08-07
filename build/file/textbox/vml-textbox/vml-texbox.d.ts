import { ParagraphChild } from "@file/paragraph";
import { XmlComponent } from "@file/xml-components";
import { LengthUnit } from "../types";
export type IVTextboxOptions = {
    readonly style?: string;
    readonly children?: readonly ParagraphChild[];
    readonly inset?: {
        readonly top: LengthUnit;
        readonly left: LengthUnit;
        readonly bottom: LengthUnit;
        readonly right: LengthUnit;
    };
};
export declare const createVmlTextbox: ({ style, children, inset }: IVTextboxOptions) => XmlComponent;
