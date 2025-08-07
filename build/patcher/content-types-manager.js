import { getFirstLevelElements } from "./util";
export const appendContentType = (element, contentType, extension) => {
    const relationshipElements = getFirstLevelElements(element, "Types");
    const exist = relationshipElements.some((el) => {
        var _a, _b;
        return el.type === "element" &&
            el.name === "Default" &&
            ((_a = el === null || el === void 0 ? void 0 : el.attributes) === null || _a === void 0 ? void 0 : _a.ContentType) === contentType &&
            ((_b = el === null || el === void 0 ? void 0 : el.attributes) === null || _b === void 0 ? void 0 : _b.Extension) === extension;
    });
    if (exist) {
        return;
    }
    relationshipElements.push({
        attributes: {
            ContentType: contentType,
            Extension: extension,
        },
        name: "Default",
        type: "element",
    });
};
//# sourceMappingURL=content-types-manager.js.map