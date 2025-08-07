import { BuilderElement } from "@file/xml-components";
export const createExtent = ({ x, y }) => new BuilderElement({
    name: "wp:extent",
    attributes: {
        x: { key: "cx", value: x },
        y: { key: "cy", value: y },
    },
});
//# sourceMappingURL=extent.js.map