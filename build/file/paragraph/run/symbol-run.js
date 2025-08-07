import { Run } from "./run";
import { Symbol } from "./run-components/symbol";
export class SymbolRun extends Run {
    constructor(options) {
        if (typeof options === "string") {
            super({});
            this.root.push(new Symbol(options));
            return this;
        }
        super(options);
        this.root.push(new Symbol(options.char, options.symbolfont));
    }
}
//# sourceMappingURL=symbol-run.js.map