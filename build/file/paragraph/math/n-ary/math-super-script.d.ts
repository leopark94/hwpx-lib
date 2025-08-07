import { XmlComponent } from "@file/xml-components";
import { MathComponent } from "../math-component";
type MathSuperScriptElementOptions = {
    readonly children: readonly MathComponent[];
};
export declare const createMathSuperScriptElement: ({ children }: MathSuperScriptElementOptions) => XmlComponent;
export {};
