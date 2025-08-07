import { XmlComponent } from "@file/xml-components";
import { MathText } from "./math-text";
export class MathRun extends XmlComponent {
    constructor(text) {
        super("m:r");
        this.root.push(new MathText(text));
    }
}
//# sourceMappingURL=math-run.js.map