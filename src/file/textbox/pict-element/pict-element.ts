import { BuilderElement, XmlComponent } from "@file/xml-components";

export type IPictElement = {
    readonly shape: XmlComponent;
};

export const createPictElement = ({ shape }: IPictElement): XmlComponent =>
    new BuilderElement<{ readonly style?: string }>({
        name: "hp:ctrl",
        children: [shape],
    });
