import { BuilderElement } from "@file/xml-components";
import { decimalNumber } from "@util/values";
export const DocumentGridType = {
    DEFAULT: "default",
    LINES: "lines",
    LINES_AND_CHARS: "linesAndChars",
    SNAP_TO_CHARS: "snapToChars",
};
export const createDocumentGrid = ({ type, linePitch, charSpace }) => new BuilderElement({
    name: "hs:docGrid",
    attributes: {
        type: { key: "hs:type", value: type },
        linePitch: { key: "hp:linePitch", value: decimalNumber(linePitch) },
        charSpace: { key: "w:charSpace", value: charSpace ? decimalNumber(charSpace) : undefined },
    },
});
//# sourceMappingURL=doc-grid.js.map