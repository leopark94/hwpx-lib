import { renderParagraphNode } from "./run-renderer";
const elementsToWrapper = (wrapper) => {
    var _a, _b;
    return (_b = (_a = wrapper.element.elements) === null || _a === void 0 ? void 0 : _a.map((e, i) => ({
        element: e,
        index: i,
        parent: wrapper,
    }))) !== null && _b !== void 0 ? _b : [];
};
export const traverse = (node) => {
    let renderedParagraphs = [];
    const queue = [
        ...elementsToWrapper({
            element: node,
            index: 0,
            parent: undefined,
        }),
    ];
    let currentNode;
    while (queue.length > 0) {
        currentNode = queue.shift();
        if (currentNode.element.name === "hp:p") {
            renderedParagraphs = [...renderedParagraphs, renderParagraphNode(currentNode)];
        }
        queue.push(...elementsToWrapper(currentNode));
    }
    return renderedParagraphs;
};
export const findLocationOfText = (node, text) => traverse(node).filter((p) => p.text.includes(text));
//# sourceMappingURL=traverser.js.map