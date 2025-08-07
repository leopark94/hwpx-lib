import { BuilderElement } from "@file/xml-components";
import { createNoFill } from "./no-fill";
import { createSolidFill } from "./solid-fill";
export const LineCap = {
    ROUND: "rnd",
    SQUARE: "sq",
    FLAT: "flat",
};
export const CompoundLine = {
    SINGLE: "sng",
    DOUBLE: "dbl",
    THICK_THIN: "thickThin",
    THIN_THICK: "thinThick",
    TRI: "tri",
};
export const PenAlignment = {
    CENTER: "ctr",
    INSET: "in",
};
export const createOutline = (options) => new BuilderElement({
    name: "a:ln",
    attributes: {
        width: {
            key: "w",
            value: options.width,
        },
        cap: {
            key: "cap",
            value: options.cap,
        },
        compoundLine: {
            key: "cmpd",
            value: options.compoundLine,
        },
        align: {
            key: "algn",
            value: options.align,
        },
    },
    children: [
        options.type === "noFill"
            ? createNoFill()
            : options.solidFillType === "rgb"
                ? createSolidFill({
                    type: "rgb",
                    value: options.value,
                })
                : createSolidFill({
                    type: "scheme",
                    value: options.value,
                }),
    ],
});
//# sourceMappingURL=outline.js.map