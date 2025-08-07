import { XmlComponent } from "@file/xml-components";
import type { MathComponent } from "../math-component";
type MathBarOptions = {
    readonly type: "top" | "bot";
    readonly children: readonly MathComponent[];
};
export declare const createMathBar: ({ type, children }: MathBarOptions) => XmlComponent;
export {};
