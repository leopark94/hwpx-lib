import { RunProperties } from "@file/paragraph/run/properties";
import { Style } from "./style";
export class StyleForCharacter extends Style {
    constructor(options) {
        super({ type: "character", styleId: options.id }, Object.assign({ uiPriority: 99, unhideWhenUsed: true }, options));
        Object.defineProperty(this, "runProperties", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.runProperties = new RunProperties(options.run);
        this.root.push(this.runProperties);
    }
}
//# sourceMappingURL=character-style.js.map