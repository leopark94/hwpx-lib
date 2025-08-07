import { XmlComponent } from "@file/xml-components";
import { createMathBase } from "../n-ary";
import { MathFunctionName } from "./math-function-name";
import { MathFunctionProperties } from "./math-function-properties";
export class MathFunction extends XmlComponent {
    constructor(options) {
        super("m:func");
        this.root.push(new MathFunctionProperties());
        this.root.push(new MathFunctionName(options.name));
        this.root.push(createMathBase({ children: options.children }));
    }
}
//# sourceMappingURL=math-function.js.map