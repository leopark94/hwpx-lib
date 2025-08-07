import { BuilderElement } from "@file/xml-components";
export const createMathAccentCharacter = ({ accent }) => new BuilderElement({
    name: "m:chr",
    attributes: {
        accent: { key: "m:val", value: accent },
    },
});
//# sourceMappingURL=math-accent-character.js.map