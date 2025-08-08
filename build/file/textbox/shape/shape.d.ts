import { ParagraphChild } from "@file/paragraph";
import { XmlComponent } from "@file/xml-components";
import { LengthUnit } from "../types";
export interface VmlShapeStyle {
    readonly flip?: "x" | "y" | "xy" | "yx";
    readonly height?: LengthUnit;
    readonly left?: LengthUnit;
    readonly marginBottom?: LengthUnit;
    readonly marginLeft?: LengthUnit;
    readonly marginRight?: LengthUnit;
    readonly marginTop?: LengthUnit;
    readonly positionHorizontal?: "absolute" | "left" | "center" | "right" | "inside" | "outside";
    readonly positionHorizontalRelative?: "margin" | "page" | "text" | "char";
    readonly positionVertical?: "absolute" | "left" | "center" | "right" | "inside" | "outside";
    readonly positionVerticalRelative?: "margin" | "page" | "text" | "char";
    readonly wrapDistanceBottom?: number;
    readonly wrapDistanceLeft?: number;
    readonly wrapDistanceRight?: number;
    readonly wrapDistanceTop?: number;
    readonly wrapEdited?: boolean;
    readonly wrapStyle?: "square" | "none";
    readonly position?: "static" | "absolute" | "relative";
    readonly rotation?: number;
    readonly top?: LengthUnit;
    readonly visibility?: "hidden" | "inherit";
    readonly width: LengthUnit;
    readonly zIndex?: "auto" | number;
}
interface ShapeOptions {
    readonly id: string;
    readonly children?: readonly ParagraphChild[];
    readonly type?: string;
    readonly style?: VmlShapeStyle;
}
export declare const createShape: ({ id, children, type, style }: ShapeOptions) => XmlComponent;
export {};
