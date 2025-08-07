import { BuilderElement } from "@file/xml-components";
export const createMathLimitLocation = ({ value }) => new BuilderElement({
    name: "m:limLoc",
    attributes: {
        value: { key: "m:val", value: value || "undOvr" },
    },
});
//# sourceMappingURL=math-limit-location.js.map