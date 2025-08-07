import { XmlComponent } from "@file/xml-components";
export class MathNumerator extends XmlComponent {
    constructor(children) {
        super("m:num");
        for (const child of children) {
            this.root.push(child);
        }
    }
}
//# sourceMappingURL=math-numerator.js.map