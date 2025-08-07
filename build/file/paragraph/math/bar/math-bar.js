import { BuilderElement } from "@file/xml-components";
import { createMathBase } from "../n-ary";
import { createMathBarProperties } from "./math-bar-properties";
export const createMathBar = ({ type, children }) => new BuilderElement({
    name: "m:bar",
    children: [createMathBarProperties({ type }), createMathBase({ children })],
});
//# sourceMappingURL=math-bar.js.map