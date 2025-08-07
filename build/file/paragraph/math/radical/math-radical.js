import { XmlComponent } from "@file/xml-components";
import { createMathBase } from "../n-ary";
import { MathDegree } from "./math-degree";
import { MathRadicalProperties } from "./math-radical-properties";
export class MathRadical extends XmlComponent {
    constructor(options) {
        super("m:rad");
        this.root.push(new MathRadicalProperties(!!options.degree));
        this.root.push(new MathDegree(options.degree));
        this.root.push(createMathBase({ children: options.children }));
    }
}
//# sourceMappingURL=math-radical.js.map