import { XmlComponent } from "@file/xml-components";
import { createMathBase } from "../n-ary";
import { createMathBracketProperties } from "./math-bracket-properties";
export class MathCurlyBrackets extends XmlComponent {
    constructor(options) {
        super("m:d");
        this.root.push(createMathBracketProperties({
            characters: {
                beginningCharacter: "{",
                endingCharacter: "}",
            },
        }));
        this.root.push(createMathBase({ children: options.children }));
    }
}
//# sourceMappingURL=math-curly-brackets.js.map