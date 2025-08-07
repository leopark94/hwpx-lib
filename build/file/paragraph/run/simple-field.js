import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
import { TextRun } from "./text-run";
class FldSimpleAttrs extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { instr: "w:instr" }
        });
    }
}
export class SimpleField extends XmlComponent {
    constructor(instruction, cachedValue) {
        super("hp:field");
        this.root.push(new FldSimpleAttrs({ instr: instruction }));
        if (cachedValue !== undefined) {
            this.root.push(new TextRun(cachedValue));
        }
    }
}
export class SimpleMailMergeField extends SimpleField {
    constructor(fieldName) {
        super(` MERGEFIELD ${fieldName} `, `«${fieldName}»`);
    }
}
//# sourceMappingURL=simple-field.js.map