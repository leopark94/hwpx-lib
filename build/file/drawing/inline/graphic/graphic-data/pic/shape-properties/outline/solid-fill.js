import { BuilderElement } from "@file/xml-components";
import { createSolidRgbColor } from "./rgb-color";
import { createSchemeColor } from "./scheme-color";
export const createSolidFill = (options) => new BuilderElement({
    name: "a:solidFill",
    children: [options.type === "rgb" ? createSolidRgbColor(options) : createSchemeColor(options)],
});
//# sourceMappingURL=solid-fill.js.map