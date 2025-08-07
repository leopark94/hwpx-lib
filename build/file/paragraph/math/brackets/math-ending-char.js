import { BuilderElement } from "@file/xml-components";
export const createMathEndingCharacter = ({ character }) => new BuilderElement({
    name: "m:endChr",
    attributes: {
        character: { key: "m:val", value: character },
    },
});
//# sourceMappingURL=math-ending-char.js.map