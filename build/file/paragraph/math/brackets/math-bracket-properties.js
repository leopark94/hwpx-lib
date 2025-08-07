import { BuilderElement } from "@file/xml-components";
import { createMathBeginningCharacter } from "./math-beginning-character";
import { createMathEndingCharacter } from "./math-ending-char";
export const createMathBracketProperties = ({ characters }) => new BuilderElement({
    name: "m:dPr",
    children: !!characters
        ? [
            createMathBeginningCharacter({ character: characters.beginningCharacter }),
            createMathEndingCharacter({ character: characters.endingCharacter }),
        ]
        : [],
});
//# sourceMappingURL=math-bracket-properties.js.map