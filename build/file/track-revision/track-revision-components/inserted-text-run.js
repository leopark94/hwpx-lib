import { XmlComponent } from "@file/xml-components";
import { TextRun } from "../../index";
import { ChangeAttributes } from "../track-revision";
export class InsertedTextRun extends XmlComponent {
    constructor(options) {
        super("w:ins");
        this.root.push(new ChangeAttributes({
            id: options.id,
            author: options.author,
            date: options.date,
        }));
        this.addChildElement(new TextRun(options));
    }
}
//# sourceMappingURL=inserted-text-run.js.map