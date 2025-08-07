import { XmlComponent } from "@file/xml-components";
import { createMathSuperScriptProperties } from "./math-super-script-function-properties";
import { createMathBase, createMathSuperScriptElement } from "../../n-ary";
export class MathSuperScript extends XmlComponent {
    constructor(options) {
        super("m:sSup");
        this.root.push(createMathSuperScriptProperties());
        this.root.push(createMathBase({ children: options.children }));
        this.root.push(createMathSuperScriptElement({ children: options.superScript }));
    }
}
//# sourceMappingURL=math-super-script-function.js.map