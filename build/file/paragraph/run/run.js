import { XmlComponent } from "@file/xml-components";
import { Break } from "./break";
import { Begin, End, Separate } from "./field";
import { CurrentSection, NumberOfPages, NumberOfPagesSection, Page } from "./page-number";
import { RunProperties } from "./properties";
import { Text } from "./run-components/text";
export const PageNumber = {
    CURRENT: "CURRENT",
    TOTAL_PAGES: "TOTAL_PAGES",
    TOTAL_PAGES_IN_SECTION: "TOTAL_PAGES_IN_SECTION",
    CURRENT_SECTION: "SECTION",
};
export class Run extends XmlComponent {
    constructor(options) {
        super("hp:run");
        Object.defineProperty(this, "properties", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.properties = new RunProperties(options);
        this.root.push(this.properties);
        if (options.break) {
            for (let i = 0; i < options.break; i++) {
                this.root.push(new Break());
            }
        }
        if (options.children) {
            for (const child of options.children) {
                if (typeof child === "string") {
                    switch (child) {
                        case PageNumber.CURRENT:
                            this.root.push(new Begin());
                            this.root.push(new Page());
                            this.root.push(new Separate());
                            this.root.push(new End());
                            break;
                        case PageNumber.TOTAL_PAGES:
                            this.root.push(new Begin());
                            this.root.push(new NumberOfPages());
                            this.root.push(new Separate());
                            this.root.push(new End());
                            break;
                        case PageNumber.TOTAL_PAGES_IN_SECTION:
                            this.root.push(new Begin());
                            this.root.push(new NumberOfPagesSection());
                            this.root.push(new Separate());
                            this.root.push(new End());
                            break;
                        case PageNumber.CURRENT_SECTION:
                            this.root.push(new Begin());
                            this.root.push(new CurrentSection());
                            this.root.push(new Separate());
                            this.root.push(new End());
                            break;
                        default:
                            this.root.push(new Text(child));
                            break;
                    }
                    continue;
                }
                this.root.push(child);
            }
        }
        else if (options.text !== undefined) {
            this.root.push(new Text(options.text));
        }
    }
}
//# sourceMappingURL=run.js.map