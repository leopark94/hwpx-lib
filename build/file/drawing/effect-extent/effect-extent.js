import { BuilderElement } from "@file/xml-components";
export const createEffectExtent = ({ top, right, bottom, left }) => new BuilderElement({
    name: "wp:effectExtent",
    attributes: {
        top: {
            key: "t",
            value: top,
        },
        right: {
            key: "r",
            value: right,
        },
        bottom: {
            key: "b",
            value: bottom,
        },
        left: {
            key: "l",
            value: left,
        },
    },
});
//# sourceMappingURL=effect-extent.js.map