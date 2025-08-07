import { XmlComponent } from "@file/xml-components";
import { MathComponent } from "../../math-component";
export type IMathSubSuperScriptOptions = {
    readonly children: readonly MathComponent[];
    readonly subScript: readonly MathComponent[];
    readonly superScript: readonly MathComponent[];
};
export declare class MathSubSuperScript extends XmlComponent {
    constructor(options: IMathSubSuperScriptOptions);
}
