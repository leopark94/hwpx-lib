export const renderParagraphNode = (node) => {
    if (node.element.name !== "hp:p" && node.element.name !== "hp:p") {
        throw new Error(`Invalid node type: ${node.element.name}`);
    }
    if (!node.element.elements) {
        return {
            text: "",
            runs: [],
            index: -1,
            pathToParagraph: [],
        };
    }
    let currentRunStringLength = 0;
    const runs = node.element.elements
        .map((element, i) => ({ element, i }))
        .filter(({ element }) => element.name === "hp:run")
        .map(({ element, i }) => {
        const renderedRunNode = renderRunNode(element, i, currentRunStringLength);
        currentRunStringLength += renderedRunNode.text.length;
        return renderedRunNode;
    })
        .filter((e) => !!e);
    const text = runs.reduce((acc, curr) => acc + curr.text, "");
    return {
        text,
        runs,
        index: node.index,
        pathToParagraph: buildNodePath(node),
    };
};
const renderRunNode = (node, index, currentRunStringIndex) => {
    if (!node.elements) {
        return {
            text: "",
            parts: [],
            index: -1,
            start: currentRunStringIndex,
            end: currentRunStringIndex,
        };
    }
    let currentTextStringIndex = currentRunStringIndex;
    const parts = node.elements
        .map((element, i) => {
        var _a, _b;
        return element.name === "hp:t" && element.elements && element.elements.length > 0
            ? {
                text: (_b = (_a = element.elements[0].text) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "",
                index: i,
                start: currentTextStringIndex,
                end: (() => {
                    var _a, _b;
                    currentTextStringIndex += ((_b = (_a = element.elements[0].text) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "").length - 1;
                    return currentTextStringIndex;
                })(),
            }
            : undefined;
    })
        .filter((e) => !!e)
        .map((e) => e);
    const text = parts.reduce((acc, curr) => acc + curr.text, "");
    return {
        text,
        parts,
        index,
        start: currentRunStringIndex,
        end: currentTextStringIndex,
    };
};
const buildNodePath = (node) => node.parent ? [...buildNodePath(node.parent), node.index] : [node.index];
//# sourceMappingURL=run-renderer.js.map