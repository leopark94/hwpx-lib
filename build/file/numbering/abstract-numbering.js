import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
import { Level } from "./level";
class AbstractNumberingAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                id: "id",
                type: "type",
            }
        });
    }
}
export class AbstractNumbering extends XmlComponent {
    constructor(id, levelOptions) {
        super("hh:numbering");
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.root.push(new AbstractNumberingAttributes({
            id: id.toString(),
            type: "bullet",
        }));
        this.id = id;
        for (const option of levelOptions) {
            this.root.push(new Level(option));
        }
    }
}
//# sourceMappingURL=abstract-numbering.js.map