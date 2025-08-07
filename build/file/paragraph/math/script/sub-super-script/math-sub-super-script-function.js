import { XmlComponent } from "@file/xml-components";
import { createMathSubSuperScriptProperties } from "./math-sub-super-script-function-properties";
import { createMathBase, createMathSubScriptElement, createMathSuperScriptElement } from "../../n-ary";
export class MathSubSuperScript extends XmlComponent {
    constructor(options) {
        super("m:sSubSup");
        this.root.push(createMathSubSuperScriptProperties());
        this.root.push(createMathBase({ children: options.children }));
        this.root.push(createMathSubScriptElement({ children: options.subScript }));
        this.root.push(createMathSuperScriptElement({ children: options.superScript }));
    }
}
//# sourceMappingURL=math-sub-super-script-function.js.map