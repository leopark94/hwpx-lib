import { XmlComponent } from "@file/xml-components";
export interface IPictElement {
    readonly shape: XmlComponent;
}
export declare const createPictElement: ({ shape }: IPictElement) => XmlComponent;
