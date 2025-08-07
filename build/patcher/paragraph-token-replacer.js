import { createTextElementContents, patchSpaceAttribute } from "./util";
const ReplaceMode = {
    START: 0,
    MIDDLE: 1,
    END: 2,
};
export const replaceTokenInParagraphElement = ({ paragraphElement, renderedParagraph, originalText, replacementText, }) => {
    const startIndex = renderedParagraph.text.indexOf(originalText);
    const endIndex = startIndex + originalText.length - 1;
    let replaceMode = ReplaceMode.START;
    for (const run of renderedParagraph.runs) {
        for (const { text, index, start, end } of run.parts) {
            switch (replaceMode) {
                case ReplaceMode.START:
                    if (startIndex >= start) {
                        const offsetStartIndex = startIndex - start;
                        const offsetEndIndex = Math.min(endIndex, end) - start;
                        const partToReplace = run.text.substring(offsetStartIndex, offsetEndIndex + 1);
                        if (partToReplace === "") {
                            continue;
                        }
                        const firstPart = text.replace(partToReplace, replacementText);
                        patchTextElement(paragraphElement.elements[run.index].elements[index], firstPart);
                        replaceMode = ReplaceMode.MIDDLE;
                        continue;
                    }
                    break;
                case ReplaceMode.MIDDLE:
                    if (endIndex <= end) {
                        const lastPart = text.substring(endIndex - start + 1);
                        patchTextElement(paragraphElement.elements[run.index].elements[index], lastPart);
                        const currentElement = paragraphElement.elements[run.index].elements[index];
                        paragraphElement.elements[run.index].elements[index] = patchSpaceAttribute(currentElement);
                        replaceMode = ReplaceMode.END;
                    }
                    else {
                        patchTextElement(paragraphElement.elements[run.index].elements[index], "");
                    }
                    break;
                default:
            }
        }
    }
    return paragraphElement;
};
const patchTextElement = (element, text) => {
    element.elements = createTextElementContents(text);
    return element;
};
//# sourceMappingURL=paragraph-token-replacer.js.map