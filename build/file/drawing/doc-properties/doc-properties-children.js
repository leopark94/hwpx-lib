import { BuilderElement } from "@file/xml-components";
export const createHyperlinkClick = (linkId, hasXmlNs) => new BuilderElement({
    name: "a:hlinkClick",
    attributes: Object.assign(Object.assign({}, (hasXmlNs
        ? {
            xmlns: {
                key: "xmlns:a",
                value: "http://schemas.openxmlformats.org/drawingml/2006/main",
            },
        }
        : {})), { id: {
            key: "r:id",
            value: `rId${linkId}`,
        } }),
});
export const createHyperlinkHover = (linkId, hasXmlNs) => new BuilderElement({
    name: "a:hlinkHover",
    attributes: Object.assign(Object.assign({}, (hasXmlNs
        ? {
            xmlns: {
                key: "xmlns:a",
                value: "http://schemas.openxmlformats.org/drawingml/2006/main",
            },
        }
        : {})), { id: {
            key: "r:id",
            value: `rId${linkId}`,
        } }),
});
//# sourceMappingURL=doc-properties-children.js.map