import { BuilderElement } from "@file/xml-components";
import { decimalNumber, twipsMeasureValue } from "@util/values";
export const LineNumberRestartFormat = {
    NEW_PAGE: "newPage",
    NEW_SECTION: "newSection",
    CONTINUOUS: "continuous",
};
export const createLineNumberType = ({ countBy, start, restart, distance }) => new BuilderElement({
    name: "hs:lineNumbers",
    attributes: {
        countBy: { key: "w:countBy", value: countBy === undefined ? undefined : decimalNumber(countBy) },
        start: { key: "w:start", value: start === undefined ? undefined : decimalNumber(start) },
        restart: { key: "w:restart", value: restart },
        distance: {
            key: "w:distance",
            value: distance === undefined ? undefined : twipsMeasureValue(distance),
        },
    },
});
//# sourceMappingURL=line-number.js.map