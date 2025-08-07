import { BuilderElement } from "@file/xml-components";
export const SchemeColor = {
    BG1: "bg1",
    TX1: "tx1",
    BG2: "bg2",
    TX2: "tx2",
    ACCENT1: "accent1",
    ACCENT2: "accent2",
    ACCENT3: "accent3",
    ACCENT4: "accent4",
    ACCENT5: "accent5",
    ACCENT6: "accent6",
    HLINK: "hlink",
    FOLHLINK: "folHlink",
    DK1: "dk1",
    LT1: "lt1",
    DK2: "dk2",
    LT2: "lt2",
    PHCLR: "phClr",
};
export const createSchemeColor = (options) => new BuilderElement({
    name: "a:schemeClr",
    attributes: {
        value: {
            key: "val",
            value: options.value,
        },
    },
});
//# sourceMappingURL=scheme-color.js.map