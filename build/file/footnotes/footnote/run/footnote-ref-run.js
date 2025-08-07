import { Run } from "@file/paragraph";
import { FootnoteRef } from "./footnote-ref";
export class FootnoteRefRun extends Run {
    constructor() {
        super({
            style: "FootnoteReference",
        });
        this.root.push(new FootnoteRef());
    }
}
//# sourceMappingURL=footnote-ref-run.js.map