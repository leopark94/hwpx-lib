import { Attributes, XmlComponent } from "@file/xml-components";
export class MultiLevelType extends XmlComponent {
    constructor(value) {
        super("w:multiLevelType");
        this.root.push(new Attributes({
            val: value,
        }));
    }
}
//# sourceMappingURL=multi-level-type.js.map