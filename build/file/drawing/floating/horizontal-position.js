import { BuilderElement } from "@file/xml-components";
import { createAlign } from "./align";
import { HorizontalPositionRelativeFrom } from "./floating-position";
import { createPositionOffset } from "./position-offset";
export const createHorizontalPosition = ({ relative, align, offset }) => new BuilderElement({
    name: "wp:positionH",
    attributes: {
        relativeFrom: { key: "relativeFrom", value: relative !== null && relative !== void 0 ? relative : HorizontalPositionRelativeFrom.PAGE },
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
//# sourceMappingURL=horizontal-position.js.map