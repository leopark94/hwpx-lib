import { HorizontalPositionAlign, VerticalPositionAlign } from "@file/shared/alignment";
import { XmlComponent } from "@file/xml-components";
export declare const createAlign: (value: (typeof HorizontalPositionAlign)[keyof typeof HorizontalPositionAlign] | (typeof VerticalPositionAlign)[keyof typeof VerticalPositionAlign]) => XmlComponent;
