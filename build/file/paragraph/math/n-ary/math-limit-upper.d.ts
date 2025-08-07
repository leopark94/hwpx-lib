import { XmlComponent } from "@file/xml-components";
import { MathComponent } from "../math-component";
export type IMathLimitUpperOptions = {
    readonly children: readonly MathComponent[];
    readonly limit: readonly MathComponent[];
};
export declare class MathLimitUpper extends XmlComponent {
    constructor(options: IMathLimitUpperOptions);
}
