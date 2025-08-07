import { XmlComponent } from "@file/xml-components";
import { createMathBase } from "./math-base";
import { MathLimit } from "./math-limit";
export class MathLimitUpper extends XmlComponent {
    constructor(options) {
        super("m:limUpp");
        this.root.push(createMathBase({ children: options.children }));
        this.root.push(new MathLimit(options.limit));
    }
}
//# sourceMappingURL=math-limit-upper.js.map