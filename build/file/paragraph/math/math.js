import { XmlComponent } from "@file/xml-components";
export class Math extends XmlComponent {
    constructor(options) {
        super("m:oMath");
        for (const child of options.children) {
            this.root.push(child);
        }
    }
}
//# sourceMappingURL=math.js.map