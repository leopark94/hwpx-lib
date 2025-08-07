import { BuilderElement } from "@file/xml-components";
export const createSolidRgbColor = (options) => new BuilderElement({
    name: "a:srgbClr",
    attributes: {
        value: {
            key: "val",
            value: options.value,
        },
    },
});
//# sourceMappingURL=rgb-color.js.map