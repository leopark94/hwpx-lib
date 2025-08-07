import { XmlComponent } from "@file/xml-components";
export class MathDenominator extends XmlComponent {
    constructor(children) {
        super("m:den");
        for (const child of children) {
            this.root.push(child);
        }
    }
}
//# sourceMappingURL=math-denominator.js.map