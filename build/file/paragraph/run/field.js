import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
const FieldCharacterType = {
    BEGIN: "begin",
    END: "end",
    SEPARATE: "separate",
};
class FidCharAttrs extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { type: "w:fldCharType", dirty: "w:dirty" }
        });
    }
}
export class Begin extends XmlComponent {
    constructor(dirty) {
        super("hp:fldChar");
        this.root.push(new FidCharAttrs({ type: FieldCharacterType.BEGIN, dirty }));
    }
}
export class Separate extends XmlComponent {
    constructor(dirty) {
        super("hp:fldChar");
        this.root.push(new FidCharAttrs({ type: FieldCharacterType.SEPARATE, dirty }));
    }
}
export class End extends XmlComponent {
    constructor(dirty) {
        super("hp:fldChar");
        this.root.push(new FidCharAttrs({ type: FieldCharacterType.END, dirty }));
    }
}
//# sourceMappingURL=field.js.map