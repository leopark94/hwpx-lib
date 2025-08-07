import { XmlComponent } from "@file/xml-components";
export class MathFunctionName extends XmlComponent {
    constructor(children) {
        super("m:fName");
        for (const child of children) {
            this.root.push(child);
        }
    }
}
//# sourceMappingURL=math-function-name.js.map