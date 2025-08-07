import { BuilderElement } from "@file/xml-components";
export const createPositionOffset = (offsetValue) => new BuilderElement({
    name: "wp:posOffset",
    children: [offsetValue.toString()],
});
//# sourceMappingURL=position-offset.js.map