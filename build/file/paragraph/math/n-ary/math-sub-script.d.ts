import { XmlComponent } from "@file/xml-components";
import { MathComponent } from "../math-component";
type MathSubScriptElementOptions = {
    readonly children: readonly MathComponent[];
};
export declare const createMathSubScriptElement: ({ children }: MathSubScriptElementOptions) => XmlComponent;
export {};
