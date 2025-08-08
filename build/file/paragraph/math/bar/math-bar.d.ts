import { XmlComponent } from "@file/xml-components";
import type { MathComponent } from "../math-component";
interface MathBarOptions {
    readonly type: "top" | "bot";
    readonly children: readonly MathComponent[];
}
export declare const createMathBar: ({ type, children }: MathBarOptions) => XmlComponent;
export {};
