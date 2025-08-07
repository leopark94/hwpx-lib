import xml from "xml";
import { Formatter } from "@export/formatter";
import { PatchType } from "./from-docx";
import { findRunElementIndexWithToken, splitRunElement } from "./paragraph-split-inject";
import { replaceTokenInParagraphElement } from "./paragraph-token-replacer";
import { findLocationOfText } from "./traverser";
import { toJson } from "./util";
const formatter = new Formatter();
const SPLIT_TOKEN = "ɵ";
export const replacer = ({ json, patch, patchText, context, keepOriginalStyles = true, }) => {
    const renderedParagraphs = findLocationOfText(json, patchText);
    if (renderedParagraphs.length === 0) {
        return { element: json, didFindOccurrence: false };
    }
    for (const renderedParagraph of renderedParagraphs) {
        const textJson = patch.children.map((c) => toJson(xml(formatter.format(c, context)))).map((c) => c.elements[0]);
        switch (patch.type) {
            case PatchType.DOCUMENT: {
                const parentElement = goToParentElementFromPath(json, renderedParagraph.pathToParagraph);
                const elementIndex = getLastElementIndexFromPath(renderedParagraph.pathToParagraph);
                parentElement.elements.splice(elementIndex, 1, ...textJson);
                break;
            }
            case PatchType.PARAGRAPH:
            default: {
                const paragraphElement = goToElementFromPath(json, renderedParagraph.pathToParagraph);
                replaceTokenInParagraphElement({
                    paragraphElement,
                    renderedParagraph,
                    originalText: patchText,
                    replacementText: SPLIT_TOKEN,
                });
                const index = findRunElementIndexWithToken(paragraphElement, SPLIT_TOKEN);
                const runElementToBeReplaced = paragraphElement.elements[index];
                const { left, right } = splitRunElement(runElementToBeReplaced, SPLIT_TOKEN);
                let newRunElements = textJson;
                let patchedRightElement = right;
                if (keepOriginalStyles) {
                    const runElementNonTextualElements = runElementToBeReplaced.elements.filter((e) => e.type === "element" && e.name === "hp:charPr");
                    newRunElements = textJson.map((e) => {
                        var _a;
                        return (Object.assign(Object.assign({}, e), { elements: [...runElementNonTextualElements, ...((_a = e.elements) !== null && _a !== void 0 ? _a : [])] }));
                    });
                    patchedRightElement = Object.assign(Object.assign({}, right), { elements: [...runElementNonTextualElements, ...right.elements] });
                }
                paragraphElement.elements.splice(index, 1, left, ...newRunElements, patchedRightElement);
                break;
            }
        }
    }
    return { element: json, didFindOccurrence: true };
};
const goToElementFromPath = (json, path) => {
    let element = json;
    for (let i = 1; i < path.length; i++) {
        const index = path[i];
        const nextElements = element.elements;
        element = nextElements[index];
    }
    return element;
};
const goToParentElementFromPath = (json, path) => goToElementFromPath(json, path.slice(0, path.length - 1));
const getLastElementIndexFromPath = (path) => path[path.length - 1];
//# sourceMappingURL=replacer.js.map