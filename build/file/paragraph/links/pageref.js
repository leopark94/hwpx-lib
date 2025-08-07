import { Begin, End } from "@file/paragraph/run/field";
import { Run } from "../run";
import { PageReferenceFieldInstruction } from "./pageref-field-instruction";
export class PageReference extends Run {
    constructor(bookmarkId, options = {}) {
        super({
            children: [new Begin(true), new PageReferenceFieldInstruction(bookmarkId, options), new End()],
        });
    }
}
//# sourceMappingURL=pageref.js.map