import { BuilderElement } from "@file/xml-components";
import { createVmlTextbox } from "../vml-textbox/vml-texbox";
const SHAPE_TYPE = "#_x0000_t202";
const styleToKeyMap = {
    flip: "flip",
    height: "height",
    left: "left",
    marginBottom: "margin-bottom",
    marginLeft: "margin-left",
    marginRight: "margin-right",
    marginTop: "margin-top",
    positionHorizontal: "mso-position-horizontal",
    positionHorizontalRelative: "mso-position-horizontal-relative",
    positionVertical: "mso-position-vertical",
    positionVerticalRelative: "mso-position-vertical-relative",
    wrapDistanceBottom: "mso-wrap-distance-bottom",
    wrapDistanceLeft: "mso-wrap-distance-left",
    wrapDistanceRight: "mso-wrap-distance-right",
    wrapDistanceTop: "mso-wrap-distance-top",
    wrapEdited: "mso-wrap-edited",
    wrapStyle: "mso-wrap-style",
    position: "position",
    rotation: "rotation",
    top: "top",
    visibility: "visibility",
    width: "width",
    zIndex: "z-index",
};
const formatShapeStyle = (style) => style
    ? Object.entries(style)
        .map(([key, value]) => `${styleToKeyMap[key]}:${value}`)
        .join(";")
    : undefined;
export const createShape = ({ id, children, type = SHAPE_TYPE, style }) => new BuilderElement({
    name: "v:shape",
    attributes: {
        id: {
            key: "id",
            value: id,
        },
        type: {
            key: "type",
            value: type,
        },
        style: {
            key: "style",
            value: formatShapeStyle(style),
        },
    },
    children: [createVmlTextbox({ style: "mso-fit-shape-to-text:t;", children })],
});
//# sourceMappingURL=shape.js.map