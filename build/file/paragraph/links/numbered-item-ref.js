import { SimpleField } from "../run";
export var NumberedItemReferenceFormat;
(function (NumberedItemReferenceFormat) {
    NumberedItemReferenceFormat["NONE"] = "none";
    NumberedItemReferenceFormat["RELATIVE"] = "relative";
    NumberedItemReferenceFormat["NO_CONTEXT"] = "no_context";
    NumberedItemReferenceFormat["FULL_CONTEXT"] = "full_context";
})(NumberedItemReferenceFormat || (NumberedItemReferenceFormat = {}));
const SWITCH_MAP = {
    [NumberedItemReferenceFormat.RELATIVE]: "\\r",
    [NumberedItemReferenceFormat.NO_CONTEXT]: "\\n",
    [NumberedItemReferenceFormat.FULL_CONTEXT]: "\\w",
    [NumberedItemReferenceFormat.NONE]: undefined,
};
export class NumberedItemReference extends SimpleField {
    constructor(bookmarkId, cachedValue, options = {}) {
        const { hyperlink = true, referenceFormat = NumberedItemReferenceFormat.FULL_CONTEXT } = options;
        const baseInstruction = `REF ${bookmarkId}`;
        const switches = [...(hyperlink ? ["\\h"] : []), ...[SWITCH_MAP[referenceFormat]].filter((a) => !!a)];
        const instruction = `${baseInstruction} ${switches.join(" ")}`;
        super(instruction, cachedValue);
    }
}
//# sourceMappingURL=numbered-item-ref.js.map