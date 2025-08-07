import { BuilderElement } from "@file/xml-components";
import { createMathAccentCharacter } from "./math-accent-character";
import { createMathLimitLocation } from "./math-limit-location";
import { createMathSubScriptHide } from "./math-sub-script-hide";
import { createMathSuperScriptHide } from "./math-super-script-hide";
export const createMathNAryProperties = ({ accent, hasSuperScript, hasSubScript, limitLocationVal, }) => new BuilderElement({
    name: "m:naryPr",
    children: [
        ...(!!accent ? [createMathAccentCharacter({ accent })] : []),
        createMathLimitLocation({ value: limitLocationVal }),
        ...(!hasSuperScript ? [createMathSuperScriptHide()] : []),
        ...(!hasSubScript ? [createMathSubScriptHide()] : []),
    ],
});
//# sourceMappingURL=math-n-ary-properties.js.map