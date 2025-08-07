import { XmlComponent } from "@file/xml-components";
import { MathDegreeHide } from "./math-degree-hide";
export class MathRadicalProperties extends XmlComponent {
    constructor(hasDegree) {
        super("m:radPr");
        if (!hasDegree) {
            this.root.push(new MathDegreeHide());
        }
    }
}
//# sourceMappingURL=math-radical-properties.js.map