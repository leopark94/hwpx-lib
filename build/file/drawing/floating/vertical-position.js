import { BuilderElement } from "@file/xml-components";
import { createAlign } from "./align";
import { VerticalPositionRelativeFrom } from "./floating-position";
import { createPositionOffset } from "./position-offset";
export const createVerticalPosition = ({ relative, align, offset }) => new BuilderElement({
    name: "wp:positionV",
    attributes: {
        relativeFrom: { key: "relativeFrom", value: relative !== null && relative !== void 0 ? relative : VerticalPositionRelativeFrom.PAGE },
    },
    children: [
        (() => {
            if (align) {
                return createAlign(align);
            }
            else if (offset !== undefined) {
                return createPositionOffset(offset);
            }
            else {
                throw new Error("There is no configuration provided for floating position (Align or offset)");
            }
        })(),
    ],
});
//# sourceMappingURL=vertical-position.js.map