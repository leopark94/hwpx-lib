import { getFirstLevelElements } from "./util";
const getIdFromRelationshipId = (relationshipId) => {
    const output = parseInt(relationshipId.substring(3), 10);
    return isNaN(output) ? 0 : output;
};
export const getNextRelationshipIndex = (relationships) => {
    const relationshipElements = getFirstLevelElements(relationships, "Relationships");
    return (relationshipElements
        .map((e) => { var _a, _b, _c; return getIdFromRelationshipId((_c = (_b = (_a = e.attributes) === null || _a === void 0 ? void 0 : _a.Id) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : ""); })
        .reduce((acc, curr) => Math.max(acc, curr), 0) + 1);
};
export const appendRelationship = (relationships, id, type, target, targetMode) => {
    const relationshipElements = getFirstLevelElements(relationships, "Relationships");
    relationshipElements.push({
        attributes: {
            Id: `rId${id}`,
            Type: type,
            Target: target,
            TargetMode: targetMode,
        },
        name: "Relationship",
        type: "element",
    });
    return relationshipElements;
};
//# sourceMappingURL=relationship-manager.js.map