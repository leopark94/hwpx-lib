import { XmlComponent } from "@file/xml-components";
import { MathComponent } from "../math-component";
type MathAngledBracketsOptions = {
    readonly children: readonly MathComponent[];
};
export declare class MathAngledBrackets extends XmlComponent {
    constructor(options: MathAngledBracketsOptions);
}
export {};
