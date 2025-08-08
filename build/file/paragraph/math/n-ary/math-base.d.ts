import { XmlComponent } from "@file/xml-components";
import { MathComponent } from "../math-component";
interface MathBaseOptions {
    readonly children: readonly MathComponent[];
}
export declare const createMathBase: ({ children }: MathBaseOptions) => XmlComponent;
export {};
