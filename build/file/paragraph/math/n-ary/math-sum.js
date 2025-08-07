import { XmlComponent } from "@file/xml-components";
import { createMathBase } from "./math-base";
import { createMathNAryProperties } from "./math-n-ary-properties";
import { createMathSubScriptElement } from "./math-sub-script";
import { createMathSuperScriptElement } from "./math-super-script";
export class MathSum extends XmlComponent {
    constructor(options) {
        super("m:nary");
        this.root.push(createMathNAryProperties({
            accent: "∑",
            hasSuperScript: !!options.superScript,
            hasSubScript: !!options.subScript,
        }));
        if (!!options.subScript) {
            this.root.push(createMathSubScriptElement({ children: options.subScript }));
        }
        if (!!options.superScript) {
            this.root.push(createMathSuperScriptElement({ children: options.superScript }));
        }
        this.root.push(createMathBase({ children: options.children }));
    }
}
//# sourceMappingURL=math-sum.js.map