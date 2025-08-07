import { Run } from "./run";
export class TextRun extends Run {
    constructor(options) {
        super(typeof options === "string" ? { text: options } : options);
    }
}
//# sourceMappingURL=text-run.js.map