import { XmlComponent } from "@file/xml-components";
import { createMathSubScriptProperties } from "./math-sub-script-function-properties";
import { createMathBase, createMathSubScriptElement } from "../../n-ary";
export class MathSubScript extends XmlComponent {
    constructor(options) {
        super("m:sSub");
        this.root.push(createMathSubScriptProperties());
        this.root.push(createMathBase({ children: options.children }));
        this.root.push(createMathSubScriptElement({ children: options.subScript }));
    }
}
//# sourceMappingURL=math-sub-script-function.js.map