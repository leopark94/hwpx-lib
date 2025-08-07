import { BuilderElement } from "@file/xml-components";
export const createMathBarPos = ({ val }) => new BuilderElement({
    name: "m:pos",
    attributes: {
        val: { key: "hp:val", value: val },
    },
});
//# sourceMappingURL=math-bar-pos.js.map