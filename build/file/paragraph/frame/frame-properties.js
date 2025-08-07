import { BuilderElement } from "@file/xml-components";
export const DropCapType = {
    NONE: "none",
    DROP: "drop",
    MARGIN: "margin",
};
export const FrameAnchorType = {
    MARGIN: "margin",
    PAGE: "page",
    TEXT: "text",
};
export const FrameWrap = {
    AROUND: "around",
    AUTO: "auto",
    NONE: "none",
    NOT_BESIDE: "notBeside",
    THROUGH: "through",
    TIGHT: "tight",
};
export const createFrameProperties = (options) => {
    var _a, _b;
    return new BuilderElement({
        name: "w:framePr",
        attributes: {
            anchorLock: {
                key: "w:anchorLock",
                value: options.anchorLock,
            },
            dropCap: {
                key: "w:dropCap",
                value: options.dropCap,
            },
            width: {
                key: "hp:w",
                value: options.width,
            },
            height: {
                key: "hp:h",
                value: options.height,
            },
            x: {
                key: "hp:x",
                value: options.position ? options.position.x : undefined,
            },
            y: {
                key: "w:y",
                value: options.position ? options.position.y : undefined,
            },
            anchorHorizontal: {
                key: "w:hAnchor",
                value: options.anchor.horizontal,
            },
            anchorVertical: {
                key: "w:vAnchor",
                value: options.anchor.vertical,
            },
            spaceHorizontal: {
                key: "w:hSpace",
                value: (_a = options.space) === null || _a === void 0 ? void 0 : _a.horizontal,
            },
            spaceVertical: {
                key: "w:vSpace",
                value: (_b = options.space) === null || _b === void 0 ? void 0 : _b.vertical,
            },
            rule: {
                key: "w:hRule",
                value: options.rule,
            },
            alignmentX: {
                key: "w:xAlign",
                value: options.alignment ? options.alignment.x : undefined,
            },
            alignmentY: {
                key: "w:yAlign",
                value: options.alignment ? options.alignment.y : undefined,
            },
            lines: {
                key: "w:lines",
                value: options.lines,
            },
            wrap: {
                key: "w:wrap",
                value: options.wrap,
            },
        },
    });
};
//# sourceMappingURL=frame-properties.js.map