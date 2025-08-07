import { XmlComponent } from "@file/xml-components";
export class MathLimit extends XmlComponent {
    constructor(children) {
        super("m:lim");
        for (const child of children) {
            this.root.push(child);
        }
    }
}
//# sourceMappingURL=math-limit.js.map