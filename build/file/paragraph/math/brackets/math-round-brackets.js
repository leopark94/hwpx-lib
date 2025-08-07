import { XmlComponent } from "@file/xml-components";
import { createMathBase } from "../n-ary";
import { createMathBracketProperties } from "./math-bracket-properties";
export class MathRoundBrackets extends XmlComponent {
    constructor(options) {
        super("m:d");
        this.root.push(createMathBracketProperties({}));
        this.root.push(createMathBase({ children: options.children }));
    }
}
//# sourceMappingURL=math-round-brackets.js.map