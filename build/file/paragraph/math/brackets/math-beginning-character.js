import { BuilderElement } from "@file/xml-components";
export const createMathBeginningCharacter = ({ character }) => new BuilderElement({
    name: "m:begChr",
    attributes: {
        character: { key: "m:val", value: character },
    },
});
//# sourceMappingURL=math-beginning-character.js.map