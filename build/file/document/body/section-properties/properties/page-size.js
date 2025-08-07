import { BuilderElement } from "@file/xml-components";
import { twipsMeasureValue } from "@util/values";
export const PageOrientation = {
    PORTRAIT: "portrait",
    LANDSCAPE: "landscape",
};
export const createPageSize = ({ width, height, orientation, code }) => {
    const widthTwips = twipsMeasureValue(width);
    const heightTwips = twipsMeasureValue(height);
    return new BuilderElement({
        name: "hs:pageSize",
        attributes: {
            width: { key: "width", value: orientation === PageOrientation.LANDSCAPE ? heightTwips : widthTwips },
            height: { key: "height", value: orientation === PageOrientation.LANDSCAPE ? widthTwips : heightTwips },
            orientation: { key: "orientation", value: orientation },
            code: { key: "code", value: code },
        },
    });
};
//# sourceMappingURL=page-size.js.map