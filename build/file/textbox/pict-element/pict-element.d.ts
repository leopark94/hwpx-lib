import { XmlComponent } from "@file/xml-components";
export type IPictElement = {
    readonly shape: XmlComponent;
};
export declare const createPictElement: ({ shape }: IPictElement) => XmlComponent;
