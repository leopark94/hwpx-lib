import { Attributes, XmlComponent } from "@file/xml-components";
import { Run } from "../run";
const BreakType = {
    COLUMN: "column",
    PAGE: "page",
};
class Break extends XmlComponent {
    constructor(type) {
        super("hp:br");
        this.root.push(new Attributes({
            type,
        }));
    }
}
export class PageBreak extends Run {
    constructor() {
        super({});
        this.root.push(new Break(BreakType.PAGE));
    }
}
export class ColumnBreak extends Run {
    constructor() {
        super({});
        this.root.push(new Break(BreakType.COLUMN));
    }
}
export class PageBreakBefore extends XmlComponent {
    constructor() {
        super("hp:pageBreakBefore");
    }
}
//# sourceMappingURL=break.js.map