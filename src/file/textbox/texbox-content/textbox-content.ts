import { ParagraphChild } from "@file/paragraph";
import { BuilderElement, XmlComponent } from "@file/xml-components";

export const createTextboxContent = ({ children = [] }: { readonly children?: readonly ParagraphChild[] }): XmlComponent =>
    new BuilderElement<{ readonly style?: string }>({
        name: "hp:txbxContent",
        children: children as readonly XmlComponent[],
    });
