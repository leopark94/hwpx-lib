import { BuilderElement } from "@file/xml-components";
export const createSimplePos = () => new BuilderElement({
    name: "wp:simplePos",
    attributes: {
        x: { key: "x", value: 0 },
        y: { key: "y", value: 0 },
    },
});
//# sourceMappingURL=simple-pos.js.map