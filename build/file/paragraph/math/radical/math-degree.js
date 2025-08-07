import { XmlComponent } from "@file/xml-components";
export class MathDegree extends XmlComponent {
    constructor(children) {
        super("m:deg");
        if (!!children) {
            for (const child of children) {
                this.root.push(child);
            }
        }
    }
}
//# sourceMappingURL=math-degree.js.map