import { XmlComponent } from "@file/xml-components";
import { MathDenominator } from "./math-denominator";
import { MathNumerator } from "./math-numerator";
export class MathFraction extends XmlComponent {
    constructor(options) {
        super("m:f");
        this.root.push(new MathNumerator(options.numerator));
        this.root.push(new MathDenominator(options.denominator));
    }
}
//# sourceMappingURL=math-fraction.js.map