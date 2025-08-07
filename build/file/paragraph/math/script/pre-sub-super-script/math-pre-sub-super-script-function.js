import { BuilderElement } from "@file/xml-components";
import { createMathPreSubSuperScriptProperties } from "./math-pre-sub-super-script-function-properties";
import { createMathBase, createMathSubScriptElement, createMathSuperScriptElement } from "../../n-ary";
export class MathPreSubSuperScript extends BuilderElement {
    constructor({ children, subScript, superScript }) {
        super({
            name: "m:sPre",
            children: [
                createMathPreSubSuperScriptProperties(),
                createMathBase({ children: children }),
                createMathSubScriptElement({ children: subScript }),
                createMathSuperScriptElement({ children: superScript }),
            ],
        });
    }
}
//# sourceMappingURL=math-pre-sub-super-script-function.js.map