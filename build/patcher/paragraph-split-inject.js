import { createTextElementContents, patchSpaceAttribute } from "./util";
export const findRunElementIndexWithToken = (paragraphElement, token) => {
    var _a, _b, _c, _d;
    for (let i = 0; i < ((_a = paragraphElement.elements) !== null && _a !== void 0 ? _a : []).length; i++) {
        const element = paragraphElement.elements[i];
        if (element.type === "element" && element.name === "hp:run") {
            const textElement = ((_b = element.elements) !== null && _b !== void 0 ? _b : []).filter((e) => e.type === "element" && e.name === "hp:t");
            for (const text of textElement) {
                if (!((_c = text.elements) === null || _c === void 0 ? void 0 : _c[0])) {
                    continue;
                }
                if ((_d = text.elements[0].text) === null || _d === void 0 ? void 0 : _d.includes(token)) {
                    return i;
                }
            }
        }
    }
    throw new Error("Token not found");
};
export const splitRunElement = (runElement, token) => {
    var _a, _b;
    let splitIndex = 0;
    const splitElements = (_b = (_a = runElement.elements) === null || _a === void 0 ? void 0 : _a.map((e, i) => {
        var _a, _b, _c;
        if (e.type === "element" && e.name === "hp:t") {
            const text = (_c = (_b = (_a = e.elements) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.text) !== null && _c !== void 0 ? _c : "";
            const splitText = text.split(token);
            const newElements = splitText.map((t) => (Object.assign(Object.assign(Object.assign({}, e), patchSpaceAttribute(e)), { elements: createTextElementContents(t) })));
            splitIndex = i;
            return newElements;
        }
        else {
            return e;
        }
    }).flat()) !== null && _b !== void 0 ? _b : [];
    const leftRunElement = Object.assign(Object.assign({}, JSON.parse(JSON.stringify(runElement))), { elements: splitElements.slice(0, splitIndex + 1) });
    const rightRunElement = Object.assign(Object.assign({}, JSON.parse(JSON.stringify(runElement))), { elements: splitElements.slice(splitIndex + 1) });
    return { left: leftRunElement, right: rightRunElement };
};
//# sourceMappingURL=paragraph-split-inject.js.map