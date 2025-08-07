import { SpaceType } from "@file/shared";
import { XmlComponent } from "@file/xml-components";
import { TextAttributes } from "../text-attributes";
export class Text extends XmlComponent {
    constructor(options) {
        var _a;
        super("hp:t");
        if (typeof options === "string") {
            this.root.push(new TextAttributes({ space: SpaceType.PRESERVE }));
            this.root.push(options);
        }
        else {
            this.root.push(new TextAttributes({ space: (_a = options.space) !== null && _a !== void 0 ? _a : SpaceType.DEFAULT }));
            this.root.push(options.text);
        }
    }
}
//# sourceMappingURL=text.js.map