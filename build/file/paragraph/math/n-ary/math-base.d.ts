import { XmlComponent } from "@file/xml-components";
import { MathComponent } from "../math-component";
type MathBaseOptions = {
    readonly children: readonly MathComponent[];
};
export declare const createMathBase: ({ children }: MathBaseOptions) => XmlComponent;
export {};
