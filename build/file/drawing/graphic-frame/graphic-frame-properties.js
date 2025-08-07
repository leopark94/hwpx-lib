import { BuilderElement } from "@file/xml-components";
import { GraphicFrameLocks } from "./graphic-frame-locks/graphic-frame-locks";
export const createGraphicFrameProperties = () => new BuilderElement({
    name: "wp:cNvGraphicFramePr",
    children: [new GraphicFrameLocks()],
});
//# sourceMappingURL=graphic-frame-properties.js.map