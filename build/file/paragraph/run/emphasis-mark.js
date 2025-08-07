import { Attributes, XmlComponent } from "@file/xml-components";
export const EmphasisMarkType = {
    DOT: "dot",
};
export class BaseEmphasisMark extends XmlComponent {
    constructor(emphasisMarkType) {
        super("hp:emphasis");
        this.root.push(new Attributes({
            val: emphasisMarkType,
        }));
    }
}
export class EmphasisMark extends BaseEmphasisMark {
    constructor(emphasisMarkType = EmphasisMarkType.DOT) {
        super(emphasisMarkType);
    }
}
export class DotEmphasisMark extends BaseEmphasisMark {
    constructor() {
        super(EmphasisMarkType.DOT);
    }
}
//# sourceMappingURL=emphasis-mark.js.map