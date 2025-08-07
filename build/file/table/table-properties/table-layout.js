import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
export const TableLayoutType = {
    AUTOFIT: "autofit",
    FIXED: "fixed",
};
class TableLayoutAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { type: "hs:type" }
        });
    }
}
export class TableLayout extends XmlComponent {
    constructor(type) {
        super("w:tblLayout");
        this.root.push(new TableLayoutAttributes({ type }));
    }
}
//# sourceMappingURL=table-layout.js.map