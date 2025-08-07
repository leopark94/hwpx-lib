import { XmlComponent } from "@file/xml-components";
import { MathComponent } from "../../math-component";
export type IMathSubScriptOptions = {
    readonly children: readonly MathComponent[];
    readonly subScript: readonly MathComponent[];
};
export declare class MathSubScript extends XmlComponent {
    constructor(options: IMathSubScriptOptions);
}
