import { Attributes, XmlComponent } from "@file/xml-components";
export class OutlineLevel extends XmlComponent {
    constructor(level) {
        super("w:outlineLvl");
        Object.defineProperty(this, "level", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: level
        });
        this.root.push(new Attributes({
            val: level,
        }));
    }
}
//# sourceMappingURL=outline-level.js.map