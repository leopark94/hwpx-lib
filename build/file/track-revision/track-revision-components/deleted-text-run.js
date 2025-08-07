import { XmlComponent } from "@file/xml-components";
import { DeletedNumberOfPages, DeletedNumberOfPagesSection, DeletedPage } from "./deleted-page-number";
import { DeletedText } from "./deleted-text";
import { Break } from "../../paragraph/run/break";
import { Begin, End, Separate } from "../../paragraph/run/field";
import { RunProperties } from "../../paragraph/run/properties";
import { PageNumber } from "../../paragraph/run/run";
import { ChangeAttributes } from "../track-revision";
export class DeletedTextRun extends XmlComponent {
    constructor(options) {
        super("w:del");
        Object.defineProperty(this, "deletedTextRunWrapper", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.root.push(new ChangeAttributes({
            id: options.id,
            author: options.author,
            date: options.date,
        }));
        this.deletedTextRunWrapper = new DeletedTextRunWrapper(options);
        this.addChildElement(this.deletedTextRunWrapper);
    }
}
class DeletedTextRunWrapper extends XmlComponent {
    constructor(options) {
        super("hp:run");
        this.root.push(new RunProperties(options));
        if (options.children) {
            for (const child of options.children) {
                if (typeof child === "string") {
                    switch (child) {
                        case PageNumber.CURRENT:
                            this.root.push(new Begin());
                            this.root.push(new DeletedPage());
                            this.root.push(new Separate());
                            this.root.push(new End());
                            break;
                        case PageNumber.TOTAL_PAGES:
                            this.root.push(new Begin());
                            this.root.push(new DeletedNumberOfPages());
                            this.root.push(new Separate());
                            this.root.push(new End());
                            break;
                        case PageNumber.TOTAL_PAGES_IN_SECTION:
                            this.root.push(new Begin());
                            this.root.push(new DeletedNumberOfPagesSection());
                            this.root.push(new Separate());
                            this.root.push(new End());
                            break;
                        default:
                            this.root.push(new DeletedText(child));
                            break;
                    }
                    continue;
                }
                this.root.push(child);
            }
        }
        else if (options.text) {
            this.root.push(new DeletedText(options.text));
        }
        if (options.break) {
            for (let i = 0; i < options.break; i++) {
                this.root.splice(1, 0, new Break());
            }
        }
    }
}
//# sourceMappingURL=deleted-text-run.js.map