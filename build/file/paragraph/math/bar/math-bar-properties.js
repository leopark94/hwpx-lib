import { BuilderElement } from "@file/xml-components";
import { createMathBarPos } from "./math-bar-pos";
export const createMathBarProperties = ({ type }) => new BuilderElement({
    name: "m:barPr",
    children: [createMathBarPos({ val: type })],
});
//# sourceMappingURL=math-bar-properties.js.map