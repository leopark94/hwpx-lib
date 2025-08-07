import { XmlComponent } from "@file/xml-components";
import { MathComponent } from "../math-component";
export type IMathIntegralOptions = {
    readonly children: readonly MathComponent[];
    readonly subScript?: readonly MathComponent[];
    readonly superScript?: readonly MathComponent[];
};
export declare class MathIntegral extends XmlComponent {
    constructor(options: IMathIntegralOptions);
}
