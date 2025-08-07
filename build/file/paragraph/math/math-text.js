import { XmlComponent } from "@file/xml-components";
export class MathText extends XmlComponent {
    constructor(text) {
        super("m:t");
        this.root.push(text);
    }
}
//# sourceMappingURL=math-text.js.map