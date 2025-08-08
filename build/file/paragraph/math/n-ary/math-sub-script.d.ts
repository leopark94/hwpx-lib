import { XmlComponent } from "@file/xml-components";
import { MathComponent } from "../math-component";
interface MathSubScriptElementOptions {
    readonly children: readonly MathComponent[];
}
export declare const createMathSubScriptElement: ({ children }: MathSubScriptElementOptions) => XmlComponent;
export {};
